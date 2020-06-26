import React, { useState, useEffect, useContext } from 'react';
import mks from '../synth/mks';
import mksVecoven4 from '../synth/mks-vecoven4.js';
import { SettingsContext } from '../context/settingsContext.js';
import { usePanelState } from '../context/panelContext.js';
import classNames from 'classnames';
import * as styles from './slider.module.scss';

const Slider = (props) => {

    const state = usePanelState();
    const [settings] = useContext(SettingsContext);

    // If Vecoven4-firmware then use the Vecoven4-spec, otherwise the normal Roland-spec
    const spec = (settings.synth === "MKS-VECOVEN4" || settings.synth === "JX10-VECOVEN4") ? mksVecoven4 : mks;

    const tone = props.tone;
    // If no tone defined, assume it's a patch slider instead of tone slider
    const type = (tone === undefined) ? "PATCH" : "TONE";

    const parameterId = parseInt(props.parameter);

    // Offset for parameterStateId --> Tone A: 0 / Tone B: 100 / Patch: 200
    let offset = 0;
    if (type === "TONE") {
        offset = (tone === "B") ? 200 : 0;
    }
    else if (type === "PATCH") {
        offset = 400;
    }
    const parameterStateId = parameterId + offset;

    // If tone slider, then use tone parameter spec, otherwise use patch parameter spec
    const parameter = (type === "TONE") ? spec.parameters[parameterId]: spec.patch[parameterId];
    const defaultValue = (parameter.defaultValue !== undefined) ? parameter.defaultValue : 0;
    
    const [value, setValue] = useState(defaultValue);

    const label = (parameter.label !== undefined) ? parameter.label : parameter.name,
          marks = parameter.marks,
          step = parameter.marks ? parameter.max / (parameter.marks.length-1) : 1,
          max = parameter.max,
          min = parameter.min;

    const changeHandler = (event) => {
        let newValue = event.target.value;

        if (value !== newValue) {

            // Set new value
            setValue(newValue);

            let formatType = 0b00100100; // JX-10
            if (settings.synth === "JX8P") {
                formatType = 0b00100001;
            }

            const operationCode = (settings.synth === "MKS-VECOVEN4" || settings.synth === "JX10-VECOVEN4") ? 0b00111001 : 0b00110110;
            const channel = (settings.synth === "JX8P") ? settings.midiChannelA-1 : settings.midiControlChannel-1;
            const formatLevel = (type === "TONE") ? 0b00100000 : 0b00110000;
            // Use different group byte for Tone B, otherwise use default for Tone A and Patch
            const formatGroup = (tone === "B") ? 0b00000010 : 0b00000001
            // If defined use the specific sysexId (needed for Vecoven4), otherwise use the default parameterId
            const sysexId = parameter.sysex ? parameter.sysex : parameterId;

            // Send sysex to synth
            settings.midiOut.sendSysex(
                0b01000001, // Roland ID
                [
                    operationCode, // Operation code = IPR (individual parameter)
                    channel, // Control Channel (Start at 0)
                    formatType, // Format type (JX-10 or JX-8P)
                    formatLevel, // Level = 1 Tone
                    formatGroup, // Group (01 = Tone A, 10 = Tone B)
                    sysexId, // Parameter (0 - 58 for Tone, 0 - 51 for Patch) 
                    newValue, // Value (0-127)
                ]
            );
        }
    };

    const inputLabel = "slider-" + parameterId;

    const getOutputLabel = () => {
        if (marks !== undefined) {
            // let mark = Math.floor(state.values[parameterId] / step);
            // return marks[mark].label;
        }
        else {
            return value;
        }
    };

    const getMarkLabels = () => {
        if (marks) {
            return marks.slice(0).reverse().map((mark, index) =>
                <div key={inputLabel + '-' + index} className={styles.markLabel}>{mark.label}</div>
            );
        }
    };

    useEffect(() => {
        setValue(state.values[parameterStateId]);
        //console.log('UseEffect: Value set from context: ', tone, parameterId, value);
    }, [state, parameterStateId]);

    return (
        <div className={classNames(styles.slider, { [styles.isToggle]: marks }, styles.soloslider ) } >
            <div className={classNames(styles.sliderSection, styles.markLabels)}>
                {getMarkLabels()}
            </div>
            <div className={styles.sliderSection}>
                <label htmlFor={inputLabel}>
                    {label}
                </label>
                <input type="range"
                    id={inputLabel}
                    orient="vertical"
                    min={min}
                    max={max}
                    step={step}
                    onChange={changeHandler}
                    value={value}
                    style={marks ? { // Calculate correct height, depending on amount of steps
                        width: 16 * marks.length + 8,
                        marginTop: 8 * marks.length - 4,
                        marginBottom: 8 * marks.length
                        } : {} }>
                </input>
                <output htmlFor={inputLabel}>{getOutputLabel()}</output>
            </div>
        </div>
    )
}

export default React.memo(Slider);
