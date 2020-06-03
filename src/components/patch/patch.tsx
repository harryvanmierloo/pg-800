import React, { useContext, useCallback } from 'react';
import { usePanelDispatch } from '../context/panelContext';
import { SettingsContext } from '../context/settingsContext';
import './patch.scss';

export default interface Patch {
    synth: string;
    name: string;
    date: Date;
    type?: string;
    values: number[];
}

export const PatchRow = (props:Patch) => {

    const [settings] = useContext(SettingsContext);
    const dispatch = usePanelDispatch();

    const setTone = useCallback((type) => event => {

        // If type is Tone, then assign to Channel A (for now). If type is Patch, then assign to Patch data.
        let receivedType = "PATCH" ? type : "A";

        // Convert Uint8Array to normal array
        let newValues = Array.from(props.values);
        dispatch({ type: 'setToneSysex', target: receivedType, values: newValues, settings: settings });
    }, [settings, dispatch, props.values]);

    return (
        <tr className='patch' onClick={setTone(props.type)}>
            <td>{props.type}</td>
            <td>{props.name}</td>
            <td>{props.date}</td>
            <td className="patch__values">{props.values}</td>
        </tr>
    )
};
