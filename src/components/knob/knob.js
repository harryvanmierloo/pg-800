import React, { useState, useEffect, useContext } from 'react';
import MKS from '../synth/mks';
import { Knob } from 'react-rotary-knob';
import { SettingsContext } from '../context/settingsContext.js';
import { usePanelState } from '../context/panelContext.js';
import knobSkin from './knobSkin';
import * as styles from './knob.module.scss';
import mks from '../synth/mks';

const KnobControl = (props) => {

    const tone = props.tone;
    // If no tone defined, assume it's a patch slider instead of tone slider
    const type = (tone === undefined) ? "PATCH" : "TONE";

    const parameterId = parseInt(props.parameter);

    // Offset for parameterStateId --> Tone A: 0 / Tone B: 100 / Patch: 200
    let offset = 0;
    if (type === "TONE") {
        offset = (tone === "B") ? 100 : 0;
    }
    else if (type === "PATCH") {
        offset = 200;
    }
    const parameterStateId = parameterId + offset;

    // If tone slider, then use tone parameter spec, otherwise use patch parameter spec
    const parameter = (type === "TONE") ? MKS.parameters[parameterId]: MKS.patch[parameterId];

    const state = usePanelState();
    const [settings] = useContext(SettingsContext);
    const [value, setValue] = useState(0);
    let loadValue = undefined;

    const label = (parameter.label !== undefined) ? parameter.label : parameter.name,
          marks = parameter.marks;

    const changeHandler = (event) => {
        let newValue = event;

        if (value !== newValue) {

            // Set new value
            setValue(newValue);

            // If inverted-flag is on, then use the inverted value for sysex
            if (parameter.inverted) {
                newValue = (parameter.max - parameter.min) - newValue;
            }

            let formatType = 0b00100100; // JX-10
            if (settings.synth === "JX8P") {
                formatType = 0b00100001;
            }

            const formatLevel = (type === "TONE") ? 0b00100000 : 0b00110000;
            // Use different group byte for Tone B, otherwise use default for Tone A and Patch
            const formatGroup = (tone === "B") ? 0b00000010 : 0b00000001

            // Send sysex to synth
            settings.midiOut.sendSysex(
                0b01000001, // Roland ID
                [
                    0b00110110, // Operation code = IPR (individual parameter)
                    settings.midiControlChannel-1, // Control Channel (Start at 0)
                    formatType, // Format type (JX-10 or JX-8P)
                    formatLevel, // Level = 1 Tone
                    formatGroup, // Group (01 = Tone A, 10 = Tone B)
                    parameterId, // Parameter (0 - 58 for Tone, 0 - 51 for Patch) 
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
            return parseInt(value - 64);
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
                skin={knobSkin}
            >
            </Knob>
            <output htmlFor={inputLabel}>{getOutputLabel()}</output>
        </div>
    )
}

export default React.memo(KnobControl);
