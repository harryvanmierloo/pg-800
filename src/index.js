import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {Button, Switch, Slider, FormControlLabel, FormLabel} from '@material-ui/core';
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
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(4),
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
    
    const param = mks.parameters[props.id];

    const [value, setValue] = React.useState(30);

    const defaultValue = param.defaultValue ? param.defaultValue : 64;
    
    const marks = param.marks;
    const step = param.marks ? null : 1;
    const max = (param.marks !== undefined) ? param.marks[param.marks.length-1].value : param.max;

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
            <FormLabel>{param.name}</FormLabel>
            <Slider 
                defaultValue={defaultValue}
                min={param.min}
                max={max}
                step={step}
                marks={marks}
                onChange={handleChange}
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
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Button variant="contained" color="primary" onClick={playNote(["C4", "E4", "G4"], 1000, 0.5)}>
                            Play chord
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <FormControlLabel
                            control={<Switch checked={state.checkedA} onChange={handleChange('checkedA')} />}
                            label="Test"
                        />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="h3" gutterBottom>
                            DCO-1
                        </Typography>
                        <ParameterSlider id="11" />
                        <ParameterSlider id="12" />
                        <ParameterSlider id="13" />
                        <ParameterSlider id="14" />
                        <ParameterSlider id="15" />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="h3" gutterBottom>
                            DCO-2
                        </Typography>
                        <ParameterSlider id="16" />
                        <ParameterSlider id="17" />
                        <ParameterSlider id="18" />
                        <ParameterSlider id="19" />
                        <ParameterSlider id="20" />
                        <ParameterSlider id="21" />
                        <ParameterSlider id="22" />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="h3" gutterBottom>
                            DCO & MIXER
                        </Typography>
                        <ParameterSlider id="26" />
                        <ParameterSlider id="27" />
                        <ParameterSlider id="28" />
                        <ParameterSlider id="29" />
                        <ParameterSlider id="30" />
                        <ParameterSlider id="31" />
                        <ParameterSlider id="32" />
                    </Paper>
                </Grid> 
            </Grid>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="h3" gutterBottom>
                            VCF
                        </Typography>
                        <ParameterSlider id="33" />
                        <ParameterSlider id="34" />
                        <ParameterSlider id="35" />
                        <ParameterSlider id="36" />
                        <ParameterSlider id="38" />
                        <ParameterSlider id="39" />
                        <ParameterSlider id="40" />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="h3" gutterBottom>
                            VCA
                        </Typography>
                        <ParameterSlider id="41" />
                        <ParameterSlider id="42" />
                        <ParameterSlider id="43" />
                        <ParameterSlider id="58" />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="h3" gutterBottom>
                            LFO
                        </Typography>
                        <ParameterSlider id="44" />
                        <ParameterSlider id="45" />
                        <ParameterSlider id="46" />
                    </Paper>
                </Grid> 
            </Grid>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="h3" gutterBottom>
                            ENV-1
                        </Typography>
                        <ParameterSlider id="47" />
                        <ParameterSlider id="48" />
                        <ParameterSlider id="49" />
                        <ParameterSlider id="50" />
                        <ParameterSlider id="51" />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="h3" gutterBottom>
                            ENV-2
                        </Typography>
                        <ParameterSlider id="52" />
                        <ParameterSlider id="53" />
                        <ParameterSlider id="54" />
                        <ParameterSlider id="55" />
                        <ParameterSlider id="56" />
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