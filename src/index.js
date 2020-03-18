import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper, Button, Select, MenuItem, InputLabel } from '@material-ui/core';
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

const midiPorts = {
    in: undefined,
    out: undefined
}

const App = () => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });
    const [midiIn, midiOut, setAge] = React.useState('');

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });

        if (name === "midiIn") {
            MKS.midiIn = WebMidi.getInputById(event.target.value);
        }
        if (name ==="midiOut") {
            MKS.midiOut = WebMidi.getOutputById(event.target.value);
        }
        if (name === "midiChannelA") {
            MKS.midiChannelA = parseInt(event.target.value);
        }
        if (name === "midiChannelB") {
            MKS.midiChannelB = parseInt(event.target.value);
        }
        if (name === "midiControlChannel") {
            MKS.midiControlChannel = parseInt(event.target.value);
        }

        console.log(MKS);
    };

    const playNote = (note, duration, velocity) => event => {
        MKS.midiOut.playNote(note, MKS.midiChannelA, {duration: duration, velocity: velocity });
        console.log(note, "played!");
    };

    const createChannelOptions = () => {
        let options = []
        for (let i = 1; i <= 16; i++) {
          options.push(<option key={i} value={i}>{i}</option>)
        }
        return options
    }

    return (
        <div>
            <Grid container className={classes.container} spacing={1}>
                <Grid item xs={5}>
                    <Paper className={classes.paper}>
                        <Typography variant="h3">Roland MKS-70 Programmer</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={4}>
                            <Grid item xs={3}>
                                <InputLabel htmlFor="select-midi-out">To synth</InputLabel>
                                <Select
                                    native
                                    value={state.midiOut}
                                    onChange={handleChange('midiOut')}
                                    inputProps={{
                                        name: 'midiOut',
                                        id: 'select-midi-out',
                                    }}
                                    >
                                    {WebMidi.outputs.map((e, key) => {
                                        return <option key={key} value={e.id}>{e.name}</option>;
                                    })}
                                </Select>
                            </Grid>
                            <Grid item xs={3}>
                                <InputLabel htmlFor="select-midi-in">From synth</InputLabel>
                                <Select
                                    native
                                    value={state.midiIn}
                                    onChange={handleChange('midiIn')}
                                    inputProps={{
                                        name: 'midiIn',
                                        id: 'select-midi-in',
                                    }}
                                    >
                                    {WebMidi.inputs.map((e, key) => {
                                        return <option key={key} value={e.id}>{e.name}</option>;
                                    })}
                                </Select>
                            </Grid>
                            <Grid item>
                                <InputLabel htmlFor="select-midi-channel-a">Chan A</InputLabel>
                                <Select
                                    native
                                    value={state.midiInChannel}
                                    onChange={handleChange('midiChannelA')}
                                    inputProps={{
                                        name: 'midiChannelA',
                                        id: 'select-midi-channel-a',
                                    }}
                                    >
                                    {createChannelOptions()};
                                    }
                                </Select>
                            </Grid>
                            <Grid item>
                                <InputLabel htmlFor="select-midi-channel-b">Chan B</InputLabel>
                                <Select
                                    native
                                    value={state.midiInChannel}
                                    onChange={handleChange('midiChannelB')}
                                    inputProps={{
                                        name: 'midiChannelB',
                                        id: 'select-midi-channel-b',
                                    }}
                                    >
                                    {createChannelOptions()};
                                    }
                                </Select>
                            </Grid>
                            <Grid item>
                                <InputLabel htmlFor="select-midi-control-channel">Control</InputLabel>
                                <Select
                                    native
                                    value={state.midiInChannel}
                                    onChange={handleChange('midiControlChannel')}
                                    inputProps={{
                                        name: 'midiControlChannel',
                                        id: 'select-midi-control-channel',
                                    }}
                                    >
                                    {createChannelOptions()};
                                    }
                                </Select>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
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

function dec2bin(dec){
    let bin = (dec >>> 0).toString(2);

    while (bin.length < 8) {
        bin = "0" + bin;
    }

    return bin;
}

const parseSysex = data => {
    let sysex = Array.from(data);

    let parameters = [];

    if (sysex[0] === 240 && sysex[1] === 65) { // Filter for Roland sysex

        // DERIVED FROM SYSEX SPEC IN ROLAND MKS-70 MANUAL

        // Program Number (PGR) - 00110100 - 52
        if (sysex[2] === 0b00110100) {
            if (sysex[5] === 0b00110000) {
                console.log("PATCH program number (3.1.1)", sysex);
            } else if (sysex[5] === 0b00100000) {
                console.log("TONE program number (3.3.1)", sysex);
            }
        }

        // All Patch Parameters (APR) - 00110101 - 53
        if (sysex[2] === 0b00110101) {
            if (sysex[5] === 0b00110000) {
                console.log("All PATCH parameters (3.1.2)", sysex);
            } else if (sysex[5] === 0b00100000) {
                if (sysex[6] === 1) {
                    for (let p = 7; p < (sysex.length - 1); p++) {
                        parameters.push(sysex[p]);
                        MKS.parameters[p-7].value = sysex[p];
                        if (MKS.parameters[p-7].slider) {
                            MKS.parameters[p-7].slider.handleChange(null, sysex[p]);
                        }
                    }
                    console.log("All TONE parameters for TONE A (3.3.2)", parameters);
                }
                else if (sysex[6] === 2) {
                    for (let p = 7; p < (sysex.length - 1); p++) {
                        parameters.push(sysex[p]);
                    }
                    console.log("All TONE parameters for TONE B (3.3.2)", parameters);
                }
            }
        }
        // Individual Patch Parameter (IPR) - 00110110 - 54
        if (sysex[2] === 0b00110110) {
            if (sysex[5] === 0b00110000) {
                console.log("Individual PATCH Parameter (3.2)", sysex);
            } else if (sysex[5] === 0b00100000) {
                console.log("Individual TONE Parameter (3.4)", sysex);
            }
        }
    }

    sysex.map(function(d) {
        //console.log(dec2bin(d), d);
    });
}

document.title = "Roland MKS-70 Programmer";
WebMidi.enable(function (err) {
    if (err) {
        console.warn(err);
        alert("Unfortunately Web MIDI is not supported by your browser. Please use Chrome instead.");
    } else {
        console.log("Sysex is enabled!");

        if (!WebMidi.inputs.length || !WebMidi.outputs.length) {
            alert("We couldn't detect any MIDI devices on your system. Please connect a MIDI device and refresh this page.");
        }
        else {

            MKS.midiIn = WebMidi.inputs[0];
            MKS.midiOut = WebMidi.outputs[0];

            MKS.midiIn = WebMidi.getInputByName("ESI-M4U Port 3");
            MKS.midiOut = WebMidi.getOutputByName("ESI-M4U Port 1");

            MKS.midiIn.addListener("sysex", "all", function (e) {
                parseSysex(e.data);
            });

            MKS.midiOut.sendProgramChange(0, 15);

            document.body.style = 'background: #efefef;';
            ReactDOM.render(
                <App />,
                document.getElementById('root')
            );
        }
    }

}, true); // Sysex flag enabled
