import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Slider, Tooltip} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MKS from '../MKS-70/MKS-70';
import { render } from '@testing-library/react';

const useStyles = makeStyles({
    container: {
        height: 60,
        marginTop: ".5rem",
    },
});

//const classes = useStyles();

function ValueLabelComponent(props) {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
}

ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};

function ParameterSlider(props) {

    const parameterId = props.parameter;
    const parameter = MKS.parameters[parameterId];
    const label = (parameter.label !== undefined) ? parameter.label : parameter.name,
          marks = parameter.marks,
          step = parameter.marks ? null : 1,
          max = (parameter.marks !== undefined) ? parameter.marks[parameter.marks.length-1].value : parameter.max,
          min = parameter.min,
          defaultValue = parameter.defaultValue ? parameter.defaultValue : 0;

    const [value, setValue] = useState(props.value);

    const changeHandler = (event, newValue) => {
        if (newValue !== props.value) {
            //setValue(newValue);
            props.onChange(parameterId, newValue);
            
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
            render();
        }
    }

    const container = {
        height: 60,
        marginTop: ".5rem",
    }

    return (
        <React.Fragment>
            <Typography variant="caption" gutterBottom>{label}</Typography>
            <div style={container}>
                <Slider
                    defaultValue={defaultValue}
                    value={props.value}
                    min={min}
                    max={max}
                    marks={marks}
                    step={step}
                    orientation="vertical"
                    ValueLabelComponent={ValueLabelComponent}
                    onChange={changeHandler}
                />
            </div>
        </React.Fragment>
    )
}

export default ParameterSlider;
