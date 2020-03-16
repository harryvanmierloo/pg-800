import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {Button, Switch, Slider, FormControlLabel} from '@material-ui/core';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import WebMidi from "webmidi";
import parameters from './components/mks70/spec';

var mks = {
    midiIn: null,
    midiOut: null,
    midiChannelA: 15,
    midiChannelB: 15,
    midiControlChannelB: 15,
    parameters: parameters
}

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: "#afafaf",
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        width: "50%",
    },
    control: {
        padding: theme.spacing(2),
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

    const [value, setValue] = React.useState(30);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        mks.midiOut.sendSysex(
            0b01000001, // Roland ID
            [
                0b00110110, // Operation code = IPR (individual parameter)
                0b00001110, // Control Channel (15)
                0b00100100, // Format type (JX-10)
                0b00100000, // Level = 1
                0b00000001, // Group (01 = Tone A, 10 = Tone B)
                props.id, // Parameter (0-68) --> VCF cutoff = 34
                newValue, // Value (0-127)
            ]
        );
    };

    return (
        <div>
            <Typography gutterBottom>{mks.parameters[props.id].name}</Typography>
            <Slider 
                value={value}
                min={mks.parameters[props.id].min}
                max={mks.parameters[props.id].max}
                step={1}
                onChange={handleChange}
                aria-labelledby="control-slider"
                ValueLabelComponent={ValueLabelComponent}
            />
        </div>
    )
}

const App = () => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });
    const handleChange = name => event => {
        console.log('Clicked!');
        setState({ ...state, [name]: event.target.checked });
    };

    const playNote = (note, duration, velocity) => event => {
        mks.midiOut.playNote(note, mks.midiChannelA, {duration: duration, velocity: velocity });
        console.log(note, "played!");
    };

    return (
        <div>
            <Typography variant="h2" gutterBottom>
                Roland MKS-70 editor
            </Typography>
            <Grid container direction="column" className={classes.root} spacing={2}>
                <Grid item>
                    <Paper className={classes.paper}>
                        <Button variant="contained" color="primary" onClick={playNote(["C4", "E4", "G4"], 1000, 0.5)}>
                            Play chord
                        </Button>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <FormControlLabel
                            control={<Switch checked={state.checkedA} onChange={handleChange('checkedA')} />}
                            label="Test"
                        />
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>           
                        <ParameterSlider id="12" />
                        <ParameterSlider id="13" />
                        <ParameterSlider id="34" />
                        <ParameterSlider id="35" />
                    </Paper>
                </Grid> 
            </Grid>
        </div>
    );
};



WebMidi.enable(function (err) {
    if (err) {
        console.warn(err);
    } else {
        console.log("Sysex is enabled!");
    }
    mks.midiIn = WebMidi.getInputByName("ESI-M4U Port 3");
    mks.midiOut = WebMidi.getOutputByName("ESI-M4U Port 1");
}, true); // Sysex flag enabled


document.body.style = 'background: #efefef;';
ReactDOM.render(
    <App />,
    document.getElementById('root')
);