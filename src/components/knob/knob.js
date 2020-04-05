import React, { useState, useEffect, useContext } from 'react';
import MKS from '../synth/mks';
import { Knob } from 'react-rotary-knob'
import { SettingsContext } from '../context/settingsContext.js';
import { usePanelState } from '../context/panelContext.js';
import * as styles from './knob.module.scss';

const KnobControl = (props) => {

    const tone = props.tone;
    const parameterId = parseInt(props.parameter);
    const parameterStateId = (tone === "B") ? parameterId + 100 : parameterId; // Offset for Tone B parameters in state

    const state = usePanelState();
    const [settings] = useContext(SettingsContext);
    const [value, setValue] = useState(0);
    let loadValue = undefined;

    const parameter = MKS.parameters[parameterId];
    const label = (parameter.label !== undefined) ? parameter.label : parameter.name,
          marks = parameter.marks;

    const changeHandler = (event) => {
        let newValue = event;

        if (value !== newValue) {

            // Set new value
            loadValue = newValue;
            setValue(newValue);

            let formatType = 0b00100100; // JX-10
            if (settings.synth === "JX8P") {
                formatType = 0b00100001;
            }

            // If slider is linked to Tone B (MKS/JX-10) then use a different group byte
            let group = 0b00000001;
            if (tone === "B") {
                group = 0b00000010;
            }

            // Send sysex to synth
            settings.midiOut.sendSysex(
                0b01000001, // Roland ID
                [
                    0b00110110, // Operation code = IPR (individual parameter)
                    settings.midiControlChannel-1, // Control Channel (Start at 0)
                    formatType, // Format type (JX-10 or JX-8P)
                    0b00100000, // Level = 1
                    group, // Group (01 = Tone A, 10 = Tone B)
                    parameterId, // Parameter (0-68)
                    newValue, // Value (0-127)
                ]
            );
        }
    };

    const getOutputLabel = () => {
        if (marks !== undefined) {
            // let mark = Math.floor(state.values[parameterId] / step);
            // return marks[mark].label;
        }
        else {
            return parseInt(value);
        }
    };

    const inputLabel = "knob-" + parameterId;

    useEffect(() => {
        setValue(loadValue);
        setValue(state.values[parameterStateId]);
        //console.log('UseEffect: Value set from context: ', tone, parameterId, value);
    }, [loadValue, state, parameterStateId]);

    return (
        <div className={styles.knob}>
            <label htmlFor={inputLabel}>
                {label}
            </label>
            <Knob
                preciseMode={false}
                unlockDistance={25}
                clampMin={30}
                clampMax={330}
                rotateDegrees={180}
                min={0}
                max={127}
                value={value}
                onChange={value => changeHandler(value)}
                className={styles.knobControl}
                >
            </Knob>
            <output htmlFor={inputLabel}>{getOutputLabel()}</output>
        </div>
    )
}

export default React.memo(KnobControl);
