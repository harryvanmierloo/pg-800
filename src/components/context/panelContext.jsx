import React from 'react'
import mks from '../synth/mks';
import mksVecoven4 from '../synth/mks-vecoven4';

const PanelStateContext = React.createContext();
const PanelDispatchContext = React.createContext();

// Ugly hack to make sure init function is aware of current spec
const retrievedData = JSON.parse(localStorage.getItem('PG-800'));
// If Vecoven4-firmware then use the Vecoven4-spec, otherwise the normal Roland-spec
let spec = mks;
if (retrievedData) {
    spec = (retrievedData.synth === "JX10-VECOVEN4" || retrievedData.synth === "MKS-VECOVEN4") ? mksVecoven4 : mks;
}

function initialState(type) {

    let defaultParameterValues = [];

    if (!type) {
        for (let p = 0; p < 200; p++) {
            // Use defined default parameter value, otherwise 0 - Fill tone A parameters
            let defaultValue = (spec.parameters[p] && spec.parameters[p].defaultValue) ? spec.parameters[p].defaultValue : 0;
            defaultParameterValues.push(defaultValue);
        }
        for (let q = 0; q < 200; q++) {
            // Use defined default parameter value, otherwise 0 - Fill tone B parameters
            let defaultValue = (spec.parameters[q] && spec.parameters[q].defaultValue) ? spec.parameters[q].defaultValue : 0;
            defaultParameterValues.push(defaultValue);
        }
        for (let r = 0; r < 100; r++) {
            // Use defined default parameter value, otherwise 0 - Fill patch parameters
            let defaultValue = (spec.patch[r] && spec.patch[r].defaultValue) ? spec.patch[r].defaultValue : 0;
            defaultParameterValues.push(defaultValue);
        }
    }
    else if (type === "TONE") {
        for (let t = 0; t < 200; t++) {
            // Use defined default parameter value, otherwise 0 - Fill tone A parameters
            let defaultValue = (spec.parameters[t] && spec.parameters[t].defaultValue) ? spec.parameters[t].defaultValue : 0;
            defaultParameterValues.push(defaultValue);
        }
    }

    return { values: defaultParameterValues };
}

const randomState = () => {
    let randomValues = [];
    for (let i = 0; i < 200; i++) {
        // Generate random parameter value, within limits of parameter
        let randomValue = 0;
        if (spec.parameters[i] && spec.parameters[i].marks) {
            let marks = spec.parameters[i].marks;
            let roll = Math.floor(Math.random() * marks.length);
            randomValue = marks[roll].value;
        } else if (spec.parameters[i]) {
            randomValue = spec.parameters[i].max ? Math.floor(Math.random() * spec.parameters[i].max) : 0;
        }
        randomValues.push(randomValue);
    }
    return { values: randomValues };
}

function panelReducer(state, action) {

    let offset = 0;
    switch (action.target) {
        case 'B': {
            offset = 200;
            break;
        }
        case 'PATCH': {
            offset = 400;
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
            console.log("Set: ", action.target, action.parameter, newValues[arrayPosition]);
            
            return { values: newValues };
        }
        case 'setAll': { // Sets all parameters
            let newValues = state.values;
            newValues.splice(offset, action.values.length, ...action.values);
            //console.log("SetAll: ", action.target, newValues);
        
            return { values: newValues };
        }
        case 'init': {
            spec = (action.synth === "JX10-VECOVEN4" || action.synth === "MKS-VECOVEN4") ? mksVecoven4 : mks;
            return { values: initialState().values };
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
        case 'setToneSysex': { // Initializes all parameters and send out sysex

            console.log(action);
            let newValues = state.values;
            newValues.splice(offset, action.values.length, ...action.values);

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
                    newValues, // h - Sequence of values (0-127)
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
