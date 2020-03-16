import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper, Button } from '@material-ui/core';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import WebMidi from "webmidi";
import MKS from './components/MKS-70/MKS-70';
import ParameterSlider from './components/ParameterSlider/ParameterSlider'

const useStyles = makeStyles(theme => ({
    container: {
    },
    paper: {
        //padding: theme.spacing(4),
        boxSizing: "border-box",
        padding: "2rem",
        height: "100%"
    },
}));

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
        MKS.midiOut.playNote(note, MKS.midiChannelA, {duration: duration, velocity: velocity });
        console.log(note, "played!");
    };

    return (
        <div>
            <Grid container className={classes.container} spacing={1}>
                <Grid item xs={5}>
                    <Paper className={classes.paper}>
                        <Typography variant="h3">Roland MKS-70 Programmer</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={7}>
                    <Paper className={classes.paper}>
                        <Button variant="contained" color="primary" onClick={playNote(["C5", "E5", "G5"], 1000, 0.5)}>
                            Play chord
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container className={classes.root} spacing={1}>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" gutterBottom>
                            DCO-1
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={6}><ParameterSlider id="11" /></Grid>
                            <Grid item xs={6}><ParameterSlider id="12" /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={12}><ParameterSlider id="13" /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={6}><ParameterSlider id="14" /></Grid>
                            <Grid item xs={6}><ParameterSlider id="15" /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={6}><ParameterSlider id="26" /></Grid>
                            <Grid item xs={6}><ParameterSlider id="27" /></Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" gutterBottom>
                            DCO-2
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={4}><ParameterSlider id="16" /></Grid>
                            <Grid item xs={4}><ParameterSlider id="17" /></Grid>
                            <Grid item xs={4}><ParameterSlider id="18" /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={4}><ParameterSlider id="19" /></Grid>
                            <Grid item xs={4}><ParameterSlider id="20" /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={4}><ParameterSlider id="21" /></Grid>
                            <Grid item xs={2}><ParameterSlider id="22" /></Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" gutterBottom>
                            MIXER
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={6}><ParameterSlider id="28" /></Grid>
                            <Grid item xs={6}><ParameterSlider id="29" /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={12}><ParameterSlider id="30" /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={6}><ParameterSlider id="31" /></Grid>
                            <Grid item xs={6}><ParameterSlider id="32" /></Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" gutterBottom>
                            VCF
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={4}><ParameterSlider id="33" /></Grid>
                            <Grid item xs={4}><ParameterSlider id="34" /></Grid>
                            <Grid item xs={4}><ParameterSlider id="35" /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={4}><ParameterSlider id="36" /></Grid>
                            <Grid item xs={4}><ParameterSlider id="37" /></Grid>
                            <Grid item xs={4}><ParameterSlider id="38" /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={4}><ParameterSlider id="39" /></Grid>
                            <Grid item xs={8}><ParameterSlider id="40" /></Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" gutterBottom>
                            VCA
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12}><ParameterSlider id="41" /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={12}><ParameterSlider id="58" /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={12}><ParameterSlider id="42" /></Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} />
                </Grid>
            </Grid>
            <Grid container className={classes.root} spacing={1}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" gutterBottom>
                            LFO
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={4}><ParameterSlider id="44" /></Grid>
                            <Grid item xs={4}><ParameterSlider id="45" /></Grid>
                            <Grid item xs={4}><ParameterSlider id="46" /></Grid>
                        </Grid>
                    </Paper>
                </Grid> 
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" gutterBottom>
                            ENV-1
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={2}><ParameterSlider id="47" /></Grid>
                            <Grid item xs={2}><ParameterSlider id="48" /></Grid>
                            <Grid item xs={2}><ParameterSlider id="49" /></Grid>
                            <Grid item xs={2}><ParameterSlider id="50" /></Grid>
                            <Grid item xs={4}><ParameterSlider id="51" /></Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" gutterBottom>
                            ENV-2
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={2}><ParameterSlider id="52" /></Grid>
                            <Grid item xs={2}><ParameterSlider id="53" /></Grid>
                            <Grid item xs={2}><ParameterSlider id="54" /></Grid>
                            <Grid item xs={2}><ParameterSlider id="55" /></Grid>
                            <Grid item xs={4}><ParameterSlider id="56" /></Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" gutterBottom>
                            CHS
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12}><ParameterSlider id="43" /></Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};


document.title = "Roland MKS-70 Programmer";
WebMidi.enable(function (err) {
    if (err) {
        console.warn(err);
        alert("Unfortunately Web MIDI is not supported by your browser. Please use Chrome instead.");
    } else {
        console.log("Sysex is enabled!");

        MKS.midiIn = WebMidi.getInputByName("ESI-M4U Port 3");
        MKS.midiOut = WebMidi.getOutputByName("ESI-M4U Port 1");

        document.body.style = 'background: #efefef;';
        ReactDOM.render(
            <App />,
            document.getElementById('root')
        );
    }

}, true); // Sysex flag enabled
