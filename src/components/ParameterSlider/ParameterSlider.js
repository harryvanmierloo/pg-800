import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Slider, Tooltip} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MKS from '../MKS-70/MKS-70';

const useStyles = makeStyles(theme => ({
    container: {
        height: 60,
        marginTop: ".5rem",
    },
}));

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

const ParameterSlider = props => {
    const classes = useStyles();
    
    const param = MKS.parameters[props.id];

    const [value, setValue] = React.useState(30);

    const defaultValue = param.defaultValue ? param.defaultValue : 64;
    
    const label = (param.label !== undefined) ? param.label : param.name;
    const marks = param.marks;
    const step = param.marks ? null : 1;
    const max = (param.marks !== undefined) ? param.marks[param.marks.length-1].value : param.max;

    const handleChange = (event, newValue) => {
        if (newValue !== value) {
            setValue(newValue);
            MKS.midiOut.sendSysex(
                0b01000001, // Roland ID
                [
                    0b00110110, // Operation code = IPR (individual parameter)
                    MKS.midiControlChannel, // Control Channel (1)
                    0b00100100, // Format type (JX-10)
                    0b00100000, // Level = 1
                    0b00000001, // Group (01 = Tone A, 10 = Tone B)
                    props.id, // Parameter (0-68)
                    newValue, // Value (0-127)
                ]
            );
        }
    };

    return (
        <React.Fragment>
            <Typography variant="caption" gutterBottom>{label}</Typography>
            <div className={classes.container}>
                <Slider
                    defaultValue={defaultValue}
                    min={param.min}
                    max={max}
                    step={step}
                    marks={marks}
                    onChange={handleChange}
                    orientation="vertical"
                    ValueLabelComponent={ValueLabelComponent}
                />
            </div>
        </React.Fragment>
    )
}

export default ParameterSlider;