import React from 'react'
import MKS from '../synth/mks';

const PanelStateContext = React.createContext();
const PanelDispatchContext = React.createContext();

const initialState = (type) => {
    let defaultParameterValues = [];
    if (!type) {
        for (let p = 0; p < 100; p++) {
            // Use defined default parameter value, otherwise 0 - Fill tone A parameters
            let defaultValue = (MKS.parameters[p] && MKS.parameters[p].defaultValue) ? MKS.parameters[p].defaultValue : 0;
            defaultParameterValues.push(defaultValue);
        }
        for (let q = 0; q < 100; q++) {
            // Use defined default parameter value, otherwise 0 - Fill tone B parameters
            let defaultValue = (MKS.parameters[q] && MKS.parameters[q].defaultValue) ? MKS.parameters[q].defaultValue : 0;
            defaultParameterValues.push(defaultValue);
        }
        for (let r = 0; r < 100; r++) {
            // Use defined default parameter value, otherwise 0 - Fill patch parameters
            let defaultValue = (MKS.patch[r] && MKS.patch[r].defaultValue) ? MKS.patch[r].defaultValue : 0;
            defaultParameterValues.push(defaultValue);
        }
    }
    else if (type === "TONE") {
        for (let t = 0; t < 59; t++) {
            // Use defined default parameter value, otherwise 0 - Fill tone A parameters
            let defaultValue = (MKS.parameters[t] && MKS.parameters[t].defaultValue) ? MKS.parameters[t].defaultValue : 0;
            defaultParameterValues.push(defaultValue);
        }
    }
    
    return { values: defaultParameterValues };
}

const randomState = () => {
    let randomValues = [];
    for (let i = 0; i < 59; i++) {
        // Generate random parameter value, within limits of parameter
        let randomValue = 0;
        if (MKS.parameters[i].marks) {
            let marks = MKS.parameters[i].marks;
            let roll = Math.floor(Math.random() * marks.length);
            randomValue = marks[roll].value;
        } else {
            randomValue = MKS.parameters[i].max ? Math.floor(Math.random() * MKS.parameters[i].max) : 0;
        }
        randomValues.push(randomValue);
    }
    return { values: randomValues };
}

function panelReducer(state, action) {

    let offset = 0;
    switch (action.target) {
        case 'B': {
            offset = 100;
            break;
        }
        case 'PATCH': {
            offset = 200;
            break;
        }
        default: {
            offset = 0;
            break;
        }
    }

    switch (action.type) {
        case 'set': { // Set specific parameter
            let newValues = state.values;
            let arrayPosition = parseInt(action.parameter) + offset;

            newValues[arrayPosition] = parseInt(action.value);
            //console.log("Set: ", action.target, action.parameter, newValues[arrayPosition]);
            
            return { values: newValues };
        }
        case 'setAll': { // Sets all parameters
            let newValues = state.values;
            newValues.splice(offset, action.values.length, ...action.values);
            //console.log("SetAll: ", action.target, newValues);
        
            return { values: newValues };
        }
        case 'initToneSysex': { // Initializes all parameters and send out sysex
            let newValues = state.values;
            let initialValues = initialState("TONE").values;

            newValues.splice(offset, initialValues.length, ...initialValues);
            //console.log("InitToneSysex: ", action.target, newValues);

            let formatType = 0b00100100; // JX-10
            if (action.settings.synth === "JX8P") {
                formatType = 0b00100001;
            }

            // Use different group byte for Tone B, otherwise use default for Tone A and Patch
            const formatGroup = (action.target === "B") ? 0b00000010 : 0b00000001

            // Send sysex to synth
            action.settings.midiOut.sendSysex(
                0b01000001, // b - Roland ID
                [
                    0b00110101, // c - Operation code = APR (all parameters)
                    action.settings.midiControlChannel-1, // d - Control Channel (Start at 0)
                    formatType, // e - Format type (JX-10 or JX-8P)
                    0b00100000, // f - Level = 1
                    formatGroup, // g - Group (01 = Tone A, 10 = Tone B)
                    initialValues, // h - Sequence of values (0-127)
                ].flat()
            );
        
            return { values: newValues };
        }
        case 'randomizeToneSysex': { // Initializes all parameters and send out sysex
            let newValues = state.values;
            let randomValues = randomState().values;

            newValues.splice(offset, randomValues.length, ...randomValues);
            //console.log("RandomToneSysex: ", action.target, newValues);

            let formatType = 0b00100100; // JX-10
            if (action.settings.synth === "JX8P") {
                formatType = 0b00100001;
            }

            // Use different group byte for Tone B, otherwise use default for Tone A and Patch
            const formatGroup = (action.target === "B") ? 0b00000010 : 0b00000001

            // Send sysex to synth
            action.settings.midiOut.sendSysex(
                0b01000001, // b - Roland ID
                [
                    0b00110101, // c - Operation code = APR (all parameters)
                    action.settings.midiControlChannel-1, // d - Control Channel (Start at 0)
                    formatType, // e - Format type (JX-10 or JX-8P)
                    0b00100000, // f - Level = 1
                    formatGroup, // g - Group (01 = Tone A, 10 = Tone B)
                    randomValues, // h - Sequence of values (0-127)
                ].flat()
            );
        
            return { values: newValues };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function PanelProvider({children}) {
    const [state, dispatch] = React.useReducer(panelReducer, initialState() );
    return (
        <PanelStateContext.Provider value={state}>
            <PanelDispatchContext.Provider value={dispatch}>
                {children}
            </PanelDispatchContext.Provider>
        </PanelStateContext.Provider>
    )
}

function usePanelState() {
    const context = React.useContext(PanelStateContext)
    if (context === undefined) {
        throw new Error('usePanelState must be used within a PanelProvider')
    }
    return context
}

function usePanelDispatch() {
    const context = React.useContext(PanelDispatchContext)
    if (context === undefined) {
        throw new Error('usePanelDispatch must be used within a PanelProvider')
    }
    return context
}

export {PanelProvider, usePanelState, usePanelDispatch}
