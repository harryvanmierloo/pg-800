import React, { useState, useEffect, useCallback, useContext } from 'react';
import ReactDOM from 'react-dom';
import WebMidi from "webmidi";
import MKS from './components/MKS-70/MKS-70';
import Slider from './components/slider/slider';
import { Context, Provider } from './components/context/context.js';
import * as styles from './index.module.scss';
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

    const changeMidi = (name) => event => {
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

    const playNote = useCallback((note, duration, velocity) => event => {
        MKS.midiOut.playNote(note, MKS.midiChannelA, {duration: duration, velocity: velocity });
        console.log(note, "played!");
    }, []);

    const createChannelOptions = useCallback(() => {
        let options = []
        for (let i = 1; i <= 16; i++) {
          options.push(<option key={i} value={i}>{i}</option>)
        }
        return options;
    }, []);

    const sysexHandler = (e) => {
        let sysex = parseSysex(e.data);
        if (sysex && sysex.tone === "A") {
            setState({ values: sysex.values });

            console.log("Received TONE A parameter values: ", sysex.values);
        }
    };

    return (
        <React.Fragment>
            <div>
                <h1>Roland MKS-70 Programmer</h1>
                <ul className={styles.midiOptions}>
                    <li>
                        <label htmlFor="select-midi-out">To synth</label>
                        <select id="select-midi-out" onChange={changeMidi('midiOut')}>
                            {WebMidi.outputs.map((e, key) => {
                                return <option key={key} value={e.id}>{e.name}</option>;
                            })}
                        </select>
                    </li>
                    <li>
                        <label htmlFor="select-midi-in">From synth</label>
                        <select id="select-midi-in" onChange={changeMidi('midiIn')}>
                            {WebMidi.inputs.map((e, key) => {
                                return <option key={key} value={e.id}>{e.name}</option>;
                            })}
                        </select>
                    </li>
                    <li>
                        <label htmlFor="select-midi-channel-a">Channel A</label>
                        <select id="select-midi-channel-a" onChange={changeMidi('midiChannelA')}>
                            {createChannelOptions()}
                        </select>
                    </li>
                    <li>
                        <label htmlFor="select-midi-channel-b">Channel B</label>
                        <select id="select-midi-channel-b" onChange={changeMidi('midiChannelB')}>
                            {createChannelOptions()}
                        </select>
                    </li>
                    <li>
                        <label htmlFor="select-midi-control-channel">Control Channel</label>
                        <select id="select-midi-control-channel" onChange={changeMidi('midiControlChannel')}>
                            {createChannelOptions()}
                        </select>
                    </li>
                </ul>
                        
                <button onClick={playNote(["C5", "E5", "G5"], 1000, 0.5)}>
                    Play chord
                </button>
            </div>

            
            <fieldset>
                <legend>DCO-1</legend>
                <Slider parameter="11" />
                <Slider parameter="12" />
                <Slider parameter="13" />
                <Slider parameter="14" />
                <Slider parameter="15" />
                <Slider parameter="26" />
                <Slider parameter="27" />
            </fieldset>

            <fieldset>
                <legend>DCO-2</legend>
                <Slider parameter="16" />
                <Slider parameter="17" />
                <Slider parameter="18" />
                <Slider parameter="19" />
                <Slider parameter="20" />
                <Slider parameter="21" />
                <Slider parameter="22" />
            </fieldset>

            <fieldset>
                <legend>Mixer</legend>
                <Slider parameter="28" />
                <Slider parameter="29" />
                <Slider parameter="30" />
                <Slider parameter="31" />
                <Slider parameter="32" />
            </fieldset>
            
            <fieldset>
                <legend>VCF</legend>
                <Slider parameter="33" />
                <Slider parameter="34" />
                <Slider parameter="35" />
                <Slider parameter="36" />
                <Slider parameter="37" />
                <Slider parameter="38" />
                <Slider parameter="39" />
                <Slider parameter="40" />     
            </fieldset>

            <fieldset>
                <legend>VCA</legend>
                <Slider parameter="41" />
                <Slider parameter="58" />
                <Slider parameter="42" />
            </fieldset>
        
            <fieldset>
                <legend>LFO</legend>
                <Slider parameter="44" />
                <Slider parameter="45" />
                <Slider parameter="46" />
            </fieldset>
                
            <fieldset>
                <legend>ENV-1</legend>
                <Slider parameter="47" />
                <Slider parameter="48" />
                <Slider parameter="49" />
                <Slider parameter="50" />
                <Slider parameter="51" />
            </fieldset>

            <fieldset>
                <legend>ENV-2</legend>
                <Slider parameter="52" />
                <Slider parameter="53" />
                <Slider parameter="54" />
                <Slider parameter="55" />
                <Slider parameter="56" />
            </fieldset>

            <fieldset>
                <legend>Chorus</legend>
                <Slider parameter="43" />
            </fieldset>
        </React.Fragment>
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
