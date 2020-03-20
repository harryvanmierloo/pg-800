import React, { useState, useEffect, useCallback, useContext } from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import { Paper, Button, Select, InputLabel, ServerStyleSheets } from '@material-ui/core';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import WebMidi from "webmidi";
import MKS from './components/MKS-70/MKS-70';
import ParameterSlider from './components/ParameterSlider/ParameterSlider';
import { Context, Provider } from './store.js';
import update from 'immutability-helper';

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
    
    const [state, setState] = useContext(Context);

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

        setState(state => ({ ...state, values: getDefaultParameterValues() }));

        // TEST: Set context parameter directly
        // setState(update(state, {values: {34: {$set: 100 }}}));

        MKS.midiIn.addListener("sysex", "all", sysexHandler);
        MKS.midiOut.sendProgramChange(0, 15);
    }, []);

    const playNote = (note, duration, velocity) => event => {
        MKS.midiOut.playNote(note, MKS.midiChannelA, {duration: duration, velocity: velocity });
        console.log(note, "played!");
    };

    const createChannelOptions = useCallback(() => {
        let options = []
        for (let i = 1; i <= 16; i++) {
          options.push(<option key={i} value={i}>{i}</option>)
        }
        return options;
    }, []);

    const sysexHandler = useCallback((e) => {
        let sysex = parseSysex(e.data);
        if (sysex && sysex.tone === "A") {
            setState({ values: sysex.values });

            console.log("Received TONE A parameter values: ", sysex.values);
        }
    });

    const styles = {
        paper: {
            boxSizing: "border-box",
            padding: "2rem",
            height: "100%",
        },
        fieldset: {
            display: "inline-block",
            marginTop: "1rem",
            verticalAlign: "top",
            width: "auto",
        }
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
            
            <fieldset style={styles.fieldset}>
                <legend>DCO-1</legend>
                <ParameterSlider parameter="11" />
                <ParameterSlider parameter="12" />
                <ParameterSlider parameter="13" />
                <ParameterSlider parameter="14" />
                <ParameterSlider parameter="15" />
                <ParameterSlider parameter="26" />
                <ParameterSlider parameter="27" />
            </fieldset>

            <fieldset style={styles.fieldset}>
                <legend>DCO-2</legend>
                <ParameterSlider parameter="16" />
                <ParameterSlider parameter="17" />
                <ParameterSlider parameter="18" />
                <ParameterSlider parameter="19" />
                <ParameterSlider parameter="20" />
                <ParameterSlider parameter="21" />
                <ParameterSlider parameter="22" />
            </fieldset>

            <fieldset style={styles.fieldset}>
                <legend>Mixer</legend>
                <ParameterSlider parameter="28" />
                <ParameterSlider parameter="29" />
                <ParameterSlider parameter="30" />
                <ParameterSlider parameter="31" />
                <ParameterSlider parameter="32" />
            </fieldset>
            
            <fieldset style={styles.fieldset}>
                <legend>VCF</legend>
                <ParameterSlider parameter="33" />
                <ParameterSlider parameter="34" />
                <ParameterSlider parameter="35" />
                <ParameterSlider parameter="36" />
                <ParameterSlider parameter="37" />
                <ParameterSlider parameter="38" />
                <ParameterSlider parameter="39" />
                <ParameterSlider parameter="40" />     
            </fieldset>

            <fieldset style={styles.fieldset}>
                <legend>VCA</legend>
                <ParameterSlider parameter="41" />
                <ParameterSlider parameter="58" />
                <ParameterSlider parameter="42" />
            </fieldset>
        
            <fieldset style={styles.fieldset}>
                <legend>LFO</legend>
                <ParameterSlider parameter="44" />
                <ParameterSlider parameter="45" />
                <ParameterSlider parameter="46" />
            </fieldset>
                
            <fieldset style={styles.fieldset}>
                <legend>ENV-1</legend>
                <ParameterSlider parameter="47" />
                <ParameterSlider parameter="48" />
                <ParameterSlider parameter="49" />
                <ParameterSlider parameter="50" />
                <ParameterSlider parameter="51" />
            </fieldset>

            <fieldset style={styles.fieldset}>
                <legend>ENV-2</legend>
                <ParameterSlider parameter="52" />
                <ParameterSlider parameter="53" />
                <ParameterSlider parameter="54" />
                <ParameterSlider parameter="55" />
                <ParameterSlider parameter="56" />
            </fieldset>

            <fieldset style={styles.fieldset}>
                <legend>Chorus</legend>
                <ParameterSlider parameter="43" />
            </fieldset>
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
                <Provider>
                    <App />
                </Provider>,
                document.getElementById('root')
            );
        }
    }

}, true); // Sysex flag enabled
