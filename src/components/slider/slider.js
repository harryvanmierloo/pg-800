import React, { useContext } from 'react';
import update from 'immutability-helper';
import MKS from '../MKS-70/MKS-70';
import { Context } from '../context/context.js';
import classNames from 'classnames';
import * as styles from './slider.module.scss';

const Slider = (props) => {

    const [state, setState] = useContext(Context);

    const parameterId = props.parameter;
    const parameter = MKS.parameters[parameterId];
    const label = (parameter.label !== undefined) ? parameter.label : parameter.name,
          marks = parameter.marks,
          step = parameter.marks ? parameter.max / (parameter.marks.length-1) : 1,
          max = parameter.max,
          min = parameter.min;

    const changeHandler = (event) => {
        let newValue = event.target.value;
        if (state.values[parameterId] !== newValue) {

            // Set new value in context
            setState(update(state, {values: {[parameterId]: {$set: parseInt(newValue) }}}));
   
            // Send sysex to synth
            MKS.midiOut.sendSysex(
                0b01000001, // Roland ID
                [
                    0b00110110, // Operation code = IPR (individual parameter)
                    MKS.midiControlChannel-1, // Control Channel (Start at 0)
                    0b00100100, // Format type (JX-10)
                    0b00100000, // Level = 1
                    0b00000001, // Group (01 = Tone A, 10 = Tone B)
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
            return state.values[parameterId];
        }
    };

    const getMarkLabels = () => {
        if (marks) {
            let markLabels = [];
            marks.slice(0).reverse().map((mark, index) => {
                markLabels.push(
                    <div className={styles.markLabel}>{mark.label}</div>
                )
            });
            return markLabels;
        }
    }

    return (
        <div className={classNames(styles.slider, { [styles.isToggle]: marks } ) } >
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
                    value={state.values[parameterId]}
                    onChange={changeHandler}
                    style={marks ? { // Calculate correct height, depending on amount of steps
                        width: 16 * marks.length,
                        marginTop: 8 * marks.length - 8,
                        marginBottom: 8 * marks.length
                        } : {} }>
                </input>
                <output htmlFor={inputLabel}>{getOutputLabel()}</output>
            </div>
        </div>
    )
}

export default React.memo(Slider);
