import React from 'react'
import MKS from '../synth/mks';

const PanelStateContext = React.createContext()
const PanelDispatchContext = React.createContext()

const initialState = () => {
    let defaultParameterValues = [];
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
    return { values: defaultParameterValues };
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
        case 'set': {
            let newValues = state.values;
            let arrayPosition = parseInt(action.parameter) + offset;

            newValues[arrayPosition] = parseInt(action.value);
            //console.log("Set: ", action.target, action.parameter, newValues[arrayPosition]);
            
            return { values: newValues };
        }
        case 'setAll': {
            let newValues = state.values;
            newValues.splice(offset, action.values.length, ...action.values);
            //console.log("SetAll: ", action.target, newValues);
        
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
