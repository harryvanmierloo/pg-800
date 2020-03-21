import React, { useContext } from 'react';
import update from 'immutability-helper';
import MKS from '../MKS-70/MKS-70';
import { Context } from '../context/context.js';
import classNames from 'classnames';
import * as styles from './multitoggle.module.scss';

const MultiToggle = (props) => {

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

    const inputLabel = "multitoggle-" + parameterId;

    const getOutputLabel = () => {
        if (marks !== undefined) {
            let mark = Math.floor(state.values[parameterId] / step);
            return marks[mark].label;
        }
        else {
            return state.values[parameterId];
        }
    };

    const getRadioButtons = () => {
        let radioButtons = [];
        marks.slice(0).reverse().map((mark, index) => {
            let key = inputLabel + "-" + index;
            radioButtons.push(
                <div className={styles.radioButton}>
                    <input
                        type="radio"
                        name={inputLabel}
                        id={key}
                        value={mark.value} // Use value from MKS spec
                        checked={state.values[parameterId] === mark.value}
                        onChange={changeHandler}
                    />
                    <label className={styles.label} htmlFor={key} key={key}>{mark.label}</label>
                </div>
            )
        });
        return radioButtons;
    }

    return (
        <div className={styles.multiToggle}>
            <label className={styles.title}>{label}</label>
            {getRadioButtons()}
        </div>
    )
}

export default React.memo(MultiToggle);
