import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import { Paper, Button, Select, InputLabel } from '@material-ui/core';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import WebMidi from "webmidi";
import MKS from './components/MKS-70/MKS-70';
import ParameterSlider from './components/ParameterSlider/ParameterSlider';

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

function App() {

    // Extract default values from MKS spec
    function getDefaultParameterValues() {
        let defaultParameterValues = [];
        for (let p = 0; p < 59; p++) {
            let defaultValue = MKS.parameters[p].defaultValue ? MKS.parameters[p].defaultValue : 0;
            defaultParameterValues.push(defaultValue);
        }
        return defaultParameterValues;
    }
    
    const [parameterValues, setParameterValues] = useState([
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0
    ]);
    const [param34, setParam34] = useState(50);
    const [test, setTest] = useState(50);

    const handleChange = name => event => {
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

    useEffect(() => {
        console.log ("App initialized!");

        setParameterValues(getDefaultParameterValues());

        MKS.midiIn.addListener("sysex", "all", sysexHandler);
        MKS.midiOut.sendProgramChange(0, 15);
    }, []);

    const playNote = (note, duration, velocity) => event => {
        MKS.midiOut.playNote(note, MKS.midiChannelA, {duration: duration, velocity: velocity });
        console.log(note, "played!");
    };

    const createChannelOptions = () => {
        let options = []
        for (let i = 1; i <= 16; i++) {
          options.push(<option key={i} value={i}>{i}</option>)
        }
        return options;
    }

    function sysexHandler(e) {
        let sysex = parseSysex(e.data);
        if (sysex && sysex.tone === "A") {
            setParameterValues(sysex.values);
            
            console.log("Tone A parameter values: ", sysex.values);
        }
    };
    
    function updateParameter(parameter, newValue) {
        setTest(newValue); // THIS SEEMS TO DO SOMETHING!!!
        if (parameterValues[parameter] !== newValue) {
            // Make copy of array
            let pvalues = parameterValues;
            // Store new value
            pvalues[parameter] = newValue;
            // Set copied array as new array
            setParameterValues(pvalues);
            //console.log(parameterValues);
        }
    }

    function updateParam34(parameter, newValue) {
        setParam34(newValue);
    }

    const styles = {
        paper: {
            boxSizing: "border-box",
            padding: "2rem",
            height: "100%"
        },
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={5}>
                    <Paper style={styles.paper}>
                        <Typography variant="h3">Roland MKS-70 Programmer</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Paper style={styles.paper}>
                        <Grid container spacing={4}>
                            <Grid item xs={3}>
                                <InputLabel htmlFor="select-midi-out">To synth</InputLabel>
                                <Select
                                    native
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
                    <Paper style={styles.paper}>
                        <Button variant="contained" color="primary" onClick={playNote(["C5", "E5", "G5"], 1000, 0.5)}>
                            Play chord
                        </Button>
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
                            <Grid item xs={6}><ParameterSlider parameter="11" value={parameterValues[11]} onChange={updateParameter} /></Grid>
                            <Grid item xs={6}><ParameterSlider parameter="12" value={parameterValues[12]} onChange={updateParameter} /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={12}><ParameterSlider parameter="13" value={parameterValues[13]} onChange={updateParameter} /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={6}><ParameterSlider parameter="14" value={parameterValues[14]} onChange={updateParameter} /></Grid>
                            <Grid item xs={6}><ParameterSlider parameter="15" value={parameterValues[15]} onChange={updateParameter} /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={6}><ParameterSlider parameter="26" value={parameterValues[26]} onChange={updateParameter} /></Grid>
                            <Grid item xs={6}><ParameterSlider parameter="27" value={parameterValues[27]} onChange={updateParameter} /></Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper style={styles.paper}>
                        <Typography variant="h4" gutterBottom>
                            DCO-2
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={4}><ParameterSlider parameter="16" value={parameterValues[16]} onChange={updateParameter} /></Grid>
                            <Grid item xs={4}><ParameterSlider parameter="17" value={parameterValues[17]} onChange={updateParameter} /></Grid>
                            <Grid item xs={4}><ParameterSlider parameter="18" value={parameterValues[18]} onChange={updateParameter} /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={4}><ParameterSlider parameter="19" value={parameterValues[19]} onChange={updateParameter} /></Grid>
                            <Grid item xs={4}><ParameterSlider parameter="20" value={parameterValues[20]} onChange={updateParameter} /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={4}><ParameterSlider parameter="21" value={parameterValues[21]} onChange={updateParameter} /></Grid>
                            <Grid item xs={2}><ParameterSlider parameter="22" value={parameterValues[22]} onChange={updateParameter} /></Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper style={styles.paper}>
                        <Typography variant="h4" gutterBottom>
                            MIXER
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={6}><ParameterSlider parameter="28" value={parameterValues[28]} onChange={updateParameter} /></Grid>
                            <Grid item xs={6}><ParameterSlider parameter="29" value={parameterValues[29]} onChange={updateParameter} /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={12}><ParameterSlider parameter="30" value={parameterValues[30]} onChange={updateParameter} /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={6}><ParameterSlider parameter="31" value={parameterValues[31]} onChange={updateParameter} /></Grid>
                            <Grid item xs={6}><ParameterSlider parameter="32" value={parameterValues[32]} onChange={updateParameter} /></Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper style={styles.paper}>
                        <Typography variant="h4" gutterBottom>
                            VCF
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={4}><ParameterSlider parameter="33" value={parameterValues[33]} onChange={updateParameter} /></Grid>
                            <Grid item xs={4}><ParameterSlider parameter="34" value={parameterValues[34]} onChange={updateParameter} /></Grid>
                            <Grid item xs={4}><ParameterSlider parameter="35" value={parameterValues[35]} onChange={updateParameter} /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={4}><ParameterSlider parameter="36" value={parameterValues[36]} onChange={updateParameter} /></Grid>
                            <Grid item xs={4}><ParameterSlider parameter="37" value={parameterValues[37]} onChange={updateParameter} /></Grid>
                            <Grid item xs={4}><ParameterSlider parameter="38" value={parameterValues[38]} onChange={updateParameter} /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={4}><ParameterSlider parameter="39" value={parameterValues[39]} onChange={updateParameter} /></Grid>
                            <Grid item xs={8}><ParameterSlider parameter="40" value={parameterValues[40]} onChange={updateParameter} /></Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper style={styles.paper}>
                        <Typography variant="h4" gutterBottom>
                            VCA
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12}><ParameterSlider parameter="41" value={parameterValues[41]} onChange={updateParameter} /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={12}><ParameterSlider parameter="58" value={parameterValues[58]} onChange={updateParameter} /></Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={12}><ParameterSlider parameter="42" value={parameterValues[42]} onChange={updateParameter} /></Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper style={styles.paper} />
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Paper style={styles.paper}>
                        <Typography variant="h4" gutterBottom>
                            LFO
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={4}><ParameterSlider parameter="44" value={parameterValues[44]} onChange={updateParameter} /></Grid>
                            <Grid item xs={4}><ParameterSlider parameter="45" value={parameterValues[45]} onChange={updateParameter} /></Grid>
                            <Grid item xs={4}><ParameterSlider parameter="46" value={parameterValues[46]} onChange={updateParameter} /></Grid>
                        </Grid>
                    </Paper>
                </Grid> 
                <Grid item xs={4}>
                    <Paper style={styles.paper}>
                        <Typography variant="h4" gutterBottom>
                            ENV-1
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={2}><ParameterSlider parameter="47" value={parameterValues[47]} onChange={updateParameter} /></Grid>
                            <Grid item xs={2}><ParameterSlider parameter="48" value={parameterValues[48]} onChange={updateParameter} /></Grid>
                            <Grid item xs={2}><ParameterSlider parameter="49" value={parameterValues[49]} onChange={updateParameter} /></Grid>
                            <Grid item xs={2}><ParameterSlider parameter="50" value={parameterValues[50]} onChange={updateParameter} /></Grid>
                            <Grid item xs={4}><ParameterSlider parameter="51" value={parameterValues[51]} onChange={updateParameter} /></Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper style={styles.paper}>
                        <Typography variant="h4" gutterBottom>
                            ENV-2
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={2}><ParameterSlider parameter="52" value={parameterValues[52]} onChange={updateParameter} /></Grid>
                            <Grid item xs={2}><ParameterSlider parameter="53" value={parameterValues[53]} onChange={updateParameter} /></Grid>
                            <Grid item xs={2}><ParameterSlider parameter="54" value={parameterValues[54]} onChange={updateParameter} /></Grid>
                            <Grid item xs={2}><ParameterSlider parameter="55" value={parameterValues[55]} onChange={updateParameter} /></Grid>
                            <Grid item xs={4}><ParameterSlider parameter="56" value={parameterValues[56]} onChange={updateParameter} /></Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper style={styles.paper}>
                        <Typography variant="h4" gutterBottom>
                            CHS
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12}><ParameterSlider parameter="43" value={parameterValues[43]} onChange={updateParameter} /></Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
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
                document.getElementById('root')
            );
        }
    }

}, true); // Sysex flag enabled
