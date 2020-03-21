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
    const label = (parameter.label !== undefined) ? parameter.label : parameter.name;

    const changeHandler = (event) => {
        let newValue = event.target.value;
        if (state.values[parameterId] !== newValue) {

            // Set new value in context
            setState(update(state, {values: {[parameterId]: {$set: newValue }}}));
   
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

    return (
        <React.Fragment>
            <label className={styles.sliderLabel} htmlFor={inputLabel}>{label}</label>
            <input type="range"
                   id={inputLabel}
                   className={styles.slider}
                   orient="vertical"
                   min="1"
                   max="127"
                   value={state.values[parameterId]}
                   onChange={changeHandler}>
            </input>
        </React.Fragment>
    )
}

export default React.memo(Slider);
