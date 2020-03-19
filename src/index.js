import React, { component } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper, Button, Select, MenuItem, InputLabel } from '@material-ui/core';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import WebMidi from "webmidi";
import MKS from './components/MKS-70/MKS-70';
import ParameterSlider from './components/ParameterSlider/ParameterSlider';

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
/*
const App = () => {

    const classes = useStyles();

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const [mks, setMks] = React.useState({
        param34: 32 
    });

    setMks({ param34: 127 });
    console.log(mks.param34);

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
*/
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
                //console.log("PATCH program number (3.1.1)", sysex);
            } else if (sysex[5] === 0b00100000) {
                //console.log("TONE program number (3.3.1)", sysex);
            }
        }

        // All Patch Parameters (APR) - 00110101 - 53
        if (sysex[2] === 0b00110101) {
            if (sysex[5] === 0b00110000) {
                //console.log("All PATCH parameters (3.1.2)", sysex);
            } else if (sysex[5] === 0b00100000) {
                if (sysex[6] === 1) {
                    for (let p = 7; p < (sysex.length - 1); p++) {
                        parameters.push(sysex[p]);
                    }
                    //console.log("All TONE parameters for TONE A (3.3.2)", parameters);
                    return { tone: "A", values: parameters };
                }
                else if (sysex[6] === 2) {
                    for (let p = 7; p < (sysex.length - 1); p++) {
                        parameters.push(sysex[p]);
                    }
                    //console.log("All TONE parameters for TONE B (3.3.2)", parameters);
                    return { tone: "B", values: parameters };
                }
            }
        }
        // Individual Patch Parameter (IPR) - 00110110 - 54
        if (sysex[2] === 0b00110110) {
            if (sysex[5] === 0b00110000) {
                //console.log("Individual PATCH Parameter (3.2)", sysex);
            } else if (sysex[5] === 0b00100000) {
                //console.log("Individual TONE Parameter (3.4)", sysex);
            }
        }
    }

    return;
}

const createSliders = () => {
    let sliders = []
    for (let i = 1; i <= 16; i++) {
      sliders.push(<option key={i} value={i}>{i}</option>)
    }
    return sliders
}

class App extends React.Component {
    constructor(props) {
        super(props);

        // Extract default values from MKS spec
        const defaultParameterValues = [];
        for (let p = 0; p < 59; p++) {
            let defaultValue = MKS.parameters[p].defaultValue ? MKS.parameters[p].defaultValue : 0;
            defaultParameterValues.push(defaultValue);
        }

        this.state = {
            parameterValues: defaultParameterValues
        };

        // This binding is necessary to make `this` work in the callback
        this.updateParameter = this.updateParameter.bind(this);
    }

    componentDidMount() {
        console.log ("App initialized!");
        let app = this;
        MKS.midiIn.addListener("sysex", "all", function (e) {
            let sysex = parseSysex(e.data);
            if (sysex && sysex.tone === "A") {
                app.setState({ parameterValues: sysex.values });
                console.log("Tone A values: " + sysex.values);
            }
        });
        MKS.midiOut.sendProgramChange(0, 15);
    }

    updateParameter(parameter, newValue) {
        if (this.state.parameterValues[parameter] !== newValue) {
            // Make copy of array
            let pvalues = this.state.parameterValues;
            // Store new value
            pvalues[parameter] = newValue;
            // Set copied array as new array
            this.setState({ parameterValues: pvalues });
        }
    }

    render() {
        const styles = {
            paper: {
                //padding: theme.spacing(4),
                boxSizing: "border-box",
                padding: "2rem",
                height: "100%"
            },
        }
        return (
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Paper style={styles.paper}>
                            <Typography variant="h3">Roland MKS-70 Programmer</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper>
                            {/* <Button variant="contained" color="primary" onClick={playNote(["C5", "E5", "G5"], 1000, 0.5)}>
                                Play chord
                            </Button> */}
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <Paper style={styles.paper}>
                            <Typography variant="h4" gutterBottom>
                                DCO-1
                            </Typography>
                            <Grid container spacing={4}>
                                <Grid item xs={6}><ParameterSlider parameter="11" value={this.state.parameterValues[11]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={6}><ParameterSlider parameter="12" value={this.state.parameterValues[12]} onChange={this.updateParameter} /></Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={12}><ParameterSlider parameter="13" value={this.state.parameterValues[13]} onChange={this.updateParameter} /></Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={6}><ParameterSlider parameter="14" value={this.state.parameterValues[14]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={6}><ParameterSlider parameter="15" value={this.state.parameterValues[15]} onChange={this.updateParameter} /></Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={6}><ParameterSlider parameter="26" value={this.state.parameterValues[26]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={6}><ParameterSlider parameter="27" value={this.state.parameterValues[27]} onChange={this.updateParameter} /></Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper style={styles.paper}>
                            <Typography variant="h4" gutterBottom>
                                DCO-2
                            </Typography>
                            <Grid container spacing={4}>
                                <Grid item xs={4}><ParameterSlider parameter="16" value={this.state.parameterValues[16]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={4}><ParameterSlider parameter="17" value={this.state.parameterValues[17]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={4}><ParameterSlider parameter="18" value={this.state.parameterValues[18]} onChange={this.updateParameter} /></Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={4}><ParameterSlider parameter="19" value={this.state.parameterValues[19]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={4}><ParameterSlider parameter="20" value={this.state.parameterValues[20]} onChange={this.updateParameter} /></Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={4}><ParameterSlider parameter="21" value={this.state.parameterValues[21]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={2}><ParameterSlider parameter="22" value={this.state.parameterValues[22]} onChange={this.updateParameter} /></Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper style={styles.paper}>
                            <Typography variant="h4" gutterBottom>
                                MIXER
                            </Typography>
                            <Grid container spacing={4}>
                                <Grid item xs={6}><ParameterSlider parameter="28" value={this.state.parameterValues[28]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={6}><ParameterSlider parameter="29" value={this.state.parameterValues[29]} onChange={this.updateParameter} /></Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={12}><ParameterSlider parameter="30" value={this.state.parameterValues[30]} onChange={this.updateParameter} /></Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={6}><ParameterSlider parameter="31" value={this.state.parameterValues[31]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={6}><ParameterSlider parameter="32" value={this.state.parameterValues[32]} onChange={this.updateParameter} /></Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper style={styles.paper}>
                            <Typography variant="h4" gutterBottom>
                                VCF
                            </Typography>
                            <Grid container spacing={4}>
                                <Grid item xs={4}><ParameterSlider parameter="33" value={this.state.parameterValues[33]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={4}><ParameterSlider parameter="34" value={this.state.parameterValues[34]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={4}><ParameterSlider parameter="35" value={this.state.parameterValues[35]} onChange={this.updateParameter} /></Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={4}><ParameterSlider parameter="36" value={this.state.parameterValues[36]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={4}><ParameterSlider parameter="37" value={this.state.parameterValues[37]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={4}><ParameterSlider parameter="38" value={this.state.parameterValues[38]} onChange={this.updateParameter} /></Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={4}><ParameterSlider parameter="39" value={this.state.parameterValues[39]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={8}><ParameterSlider parameter="40" value={this.state.parameterValues[40]} onChange={this.updateParameter} /></Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={1}>
                        <Paper style={styles.paper}>
                            <Typography variant="h4" gutterBottom>
                                VCA
                            </Typography>
                            <Grid container spacing={4}>
                                <Grid item xs={12}><ParameterSlider parameter="41" value={this.state.parameterValues[41]} onChange={this.updateParameter} /></Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={12}><ParameterSlider parameter="58" value={this.state.parameterValues[58]} onChange={this.updateParameter} /></Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={12}><ParameterSlider parameter="42" value={this.state.parameterValues[42]} onChange={this.updateParameter} /></Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={1}>
                        <Paper />
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <Paper style={styles.paper}>
                            <Typography variant="h4" gutterBottom>
                                LFO
                            </Typography>
                            <Grid container spacing={4}>
                                <Grid item xs={4}><ParameterSlider parameter="44" value={this.state.parameterValues[44]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={4}><ParameterSlider parameter="45" value={this.state.parameterValues[45]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={4}><ParameterSlider parameter="46" value={this.state.parameterValues[46]} onChange={this.updateParameter} /></Grid>
                            </Grid>
                        </Paper>
                    </Grid> 
                    <Grid item xs={4}>
                        <Paper style={styles.paper}>
                            <Typography variant="h4" gutterBottom>
                                ENV-1
                            </Typography>
                            <Grid container spacing={4}>
                                <Grid item xs={2}><ParameterSlider parameter="47" value={this.state.parameterValues[47]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={2}><ParameterSlider parameter="48" value={this.state.parameterValues[48]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={2}><ParameterSlider parameter="49" value={this.state.parameterValues[49]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={2}><ParameterSlider parameter="50" value={this.state.parameterValues[50]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={4}><ParameterSlider parameter="51" value={this.state.parameterValues[51]} onChange={this.updateParameter} /></Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper style={styles.paper}>
                            <Typography variant="h4" gutterBottom>
                                ENV-2
                            </Typography>
                            <Grid container spacing={4}>
                                <Grid item xs={2}><ParameterSlider parameter="52" value={this.state.parameterValues[52]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={2}><ParameterSlider parameter="53" value={this.state.parameterValues[53]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={2}><ParameterSlider parameter="54" value={this.state.parameterValues[54]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={2}><ParameterSlider parameter="55" value={this.state.parameterValues[55]} onChange={this.updateParameter} /></Grid>
                                <Grid item xs={4}><ParameterSlider parameter="56" value={this.state.parameterValues[56]} onChange={this.updateParameter} /></Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={1}>
                        <Paper style={styles.paper}>
                            <Typography variant="h4" gutterBottom>
                                CHS
                            </Typography>
                            <Grid container spacing={4}>
                                <Grid item xs={12}><ParameterSlider parameter="43" value={this.state.parameterValues[43]} onChange={this.updateParameter} /></Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

document.title = "Roland MKS-70 Programmer";
WebMidi.enable(function (err) {
    if (err) {
        console.warn(err);
        alert("Unfortunately Web MIDI is not supported by your browser. Please use Chrome instead.");
    } else {
        console.log("Sysex enabled!");

        if (!WebMidi.inputs.length || !WebMidi.outputs.length) {
            alert("We couldn't detect any MIDI devices on your system. Please connect a MIDI device and refresh this page.");
        }
        else {

            MKS.midiIn = WebMidi.inputs[0];
            MKS.midiOut = WebMidi.outputs[0];

            MKS.midiIn = WebMidi.getInputByName("ESI-M4U Port 3");
            MKS.midiOut = WebMidi.getOutputByName("ESI-M4U Port 1");

            document.body.style = 'background: #efefef;';

            ReactDOM.render(
                <App />,
            document.getElementById('root'));

            // ReactDOM.render(
            //     <App />,
            //     document.getElementById('root')
            // );
        }
    }

}, true); // Sysex flag enabled
