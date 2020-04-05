import React, { useState, useEffect, useContext } from 'react';
import MKS from '../synth/mks';
import { SettingsContext } from '../context/settingsContext.js';
import { usePanelState } from '../context/panelContext.js';
import classNames from 'classnames';
import * as styles from './slider.module.scss';

const Slider = (props) => {

    const tone = props.tone;
    const parameterId = parseInt(props.parameter);
    const parameterStateId = (tone === "B") ? parameterId + 100 : parameterId; // Offset for Tone B parameters in state

    const state = usePanelState();
    const [settings] = useContext(SettingsContext);
    const [value, setValue] = useState(0);
    

    const parameter = MKS.parameters[parameterId];
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
    }

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
