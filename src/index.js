import React, { useEffect, useCallback, useContext } from 'react';
import ReactDOM from 'react-dom';
import WebMidi from "webmidi";
import MKS from './components/MKS-70/MKS-70';
import Slider from './components/slider/slider.js';
import { Context, Provider } from './components/context/context.js';
import * as styles from './index.module.scss';
import update from 'immutability-helper';

var lsData = {
    synth: "MKS",
    midiIn: false,
    midiOut: false,
    midiChannelA: 1,
    midiChannelB: 1,
    midiControlChannel: 1
};

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
            lsData.midiIn = MKS.midiIn.name;
            // Add new listener
            MKS.midiIn.addListener("sysex", "all", sysexHandler);
            // NEEDS CLEAR LISTENER
        }
        if (name ==="midiOut") {
            MKS.midiOut = WebMidi.getOutputById(event.target.value);
            lsData.midiOut = MKS.midiOut.name;
        }
        if (name === "midiChannelA") {
            MKS.midiChannelA = parseInt(event.target.value);
            lsData.midiChannelA = MKS.midiChannelA;
        }
        if (name === "midiChannelB") {
            MKS.midiChannelB = parseInt(event.target.value);
            lsData.midiChannelB = MKS.midiChannelB;
        }
        if (name === "midiControlChannel") {
            MKS.midiControlChannel = parseInt(event.target.value);
            lsData.midiControlChannel = MKS.midiControlChannel;
        }
        if (name === "midiProgram") {
            if (event.target.value !== "-") {
                MKS.midiOut.sendProgramChange(parseInt(event.target.value), MKS.midiControlChannel);
            }
        }
        // Update local storage
        localStorage.setItem('PG-800', JSON.stringify(lsData));
    };

    const changeSynth = (event) => {
        let newSynth = event.target.value;
        setState(update(state, {synth: {$set: newSynth}}));
        // Update local storage
        lsData.synth = newSynth;
        localStorage.setItem('PG-800', JSON.stringify(lsData));
    }

    const playNote = useCallback((note, duration, velocity) => event => {
        MKS.midiOut.playNote(note, MKS.midiChannelA, {duration: duration, velocity: velocity });
        console.log(note, "played!");
    }, []);

    const createChannelOptions = useCallback(() => {
        let options = []
        for (let i = 1; i <= 16; i++) {
          options.push(<option key={i} value={i}>{i}</option>);
        }
        return options;
    }, []);

    const createProgramOptions = useCallback(() => {
        let options = [];
        options.push(<option key="program-none">-</option>);
        // Internal programs
        for (var c = 0; c <= 7; c++) {
            let char = String.fromCharCode(c+65);
            for (let i = 1; i <= 8; i++) {
                let program = 8 * c + i - 1;
                options.push(<option key={program} value={program}>Internal - {char}{i}</option>);
            }
        }
        // Cartridge programs
        for (var d = 0; d <= 7; d++) {
            let char = String.fromCharCode(c+65);
            for (let i = 1; i <= 8; i++) {
                let program = 63 + 8 * d + i;
                options.push(<option key={program} value={program}>Cartridge - {char}{i}</option>);
            }
        }
        return options;
    }, []);

    const sysexHandler = useCallback((event) => {
        let sysex = parseSysex(event.data);
        if (sysex && sysex.tone === "A") {
            setState(update(state, {values: {$set: sysex.values }}));

            console.log("Received TONE A parameter values: ", sysex.values);
        }
    }, [state, setState]);

    useEffect(() => {
        document.title = "PG-800 Virtual Programmer";
        console.log ("App initialized!");

        setState(update(state, {values: {$set: getDefaultParameterValues()}}));
        setState(update(state, {synth: {$set: lsData.synth}}));

        // Listen for incoming sysex
        MKS.midiIn.addListener("sysex", "all", sysexHandler);

    }, []);

    return (
        <React.Fragment>
            <div>
                <h1>PG-800 Virtual Programmer <span>v0.1 - Alpha</span></h1>
                <ul className={styles.midiOptions}>
                    <li>
                        <label htmlFor="select-synth">Connected synth</label>
                        <select id="select-synth" onChange={changeSynth} defaultValue={lsData.synth}>
                            <option key="synth-select1" value="MKS">Roland JX-10 / MKS-70 - Original firmware</option>
                            <option key="synth-select2" value="MKS-VECOVEN3" disabled>Roland JX-10 / MKS-70 - Vecoven firmware 3.x</option>
                            <option key="synth-select3" value="MKS-VECOVEN4" disabled>Roland JX-10 / MKS-70 - Vecoven firmware 4.x</option>
                            <option key="synth-select4" value="JX-8P">Roland JX-8P</option>
                        </select>
                    </li>
                    <li>
                        <label htmlFor="select-midi-in">Midi from synth</label>
                        <select id="select-midi-in" onChange={changeMidi('midiIn')} defaultValue={MKS.midiIn.id}>
                            {WebMidi.inputs.map((e, key) => {
                                return <option key={key} value={e.id}>{e.name}</option>;
                            })}
                        </select>
                    </li>
                    <li>
                        <label htmlFor="select-midi-out">Midi to synth</label>
                        <select id="select-midi-out" onChange={changeMidi('midiOut')} defaultValue={MKS.midiOut.id}>
                            {WebMidi.outputs.map((e, key) => {
                                return <option key={key} value={e.id}>{e.name}</option>;
                            })}
                        </select>
                    </li>
                    <li>
                        <label htmlFor="select-midi-channel-a">Channel A</label>
                        <select id="select-midi-channel-a" onChange={changeMidi('midiChannelA')} defaultValue={MKS.midiChannelA}>
                            {createChannelOptions()}
                        </select>
                    </li>
                    <li>
                        <label htmlFor="select-midi-channel-b">Channel B</label>
                        <select id="select-midi-channel-b" onChange={changeMidi('midiChannelB')} defaultValue={MKS.midiChannelB}>
                            {createChannelOptions()}
                        </select>
                    </li>
                    <li>
                        <label htmlFor="select-midi-control-channel">Control Channel</label>
                        <select id="select-midi-control-channel" onChange={changeMidi('midiControlChannel')} defaultValue={MKS.midiControlChannel}>
                            {createChannelOptions()}
                        </select>
                    </li>
                    <li>
                        <label htmlFor="select-midi-program">Patch</label>
                        <select id="select-midi-program" onChange={changeMidi('midiProgram')}>
                            {createProgramOptions()}
                        </select>
                    </li>
                    <li>
                        <label>Test</label>
                        <button onClick={playNote(["C5", "E5", "G5"], 1000, 0.5)}>
                            Play chord
                        </button>
                    </li>
                </ul>
            </div>

            {(state.synth === "MKS" || state.synth === "JX-8P" || state.synth === "MKS-VECOVEN3") &&
                <div className={styles.panel}>
                    <div className={styles.sectionGroup}>
                        <section>
                            <h2>DCO-1</h2>
                            <div className={styles.subSection}>
                                <Slider parameter="11" />
                                <Slider parameter="12" />
                            </div>
                            <div className={styles.subSection}>
                                <Slider parameter="13" />
                                <Slider parameter="14" />
                                <Slider parameter="15" />
                            </div>
                            <div className={styles.subSection}>
                                <Slider parameter="26" />
                                <Slider parameter="27" />
                            </div>
                        </section>

                        <section>
                            <h2>DCO-2</h2>
                            <div className={styles.subSection}>
                                <Slider parameter="16" />
                                <Slider parameter="17" />
                                <Slider parameter="18" />
                            </div>
                            <div className={styles.subSection}>
                                <Slider parameter="19" />
                                <Slider parameter="20" />
                                <Slider parameter="21" />
                                <Slider parameter="22" />
                            </div>
                        </section>

                        <section>
                            <h2>Mixer</h2>
                            <div className={styles.subSection}>
                                <Slider parameter="28" />
                                <Slider parameter="29" />
                                <Slider parameter="30" />
                            </div>
                            <div className={styles.subSection}>
                                <Slider parameter="31" />
                                <Slider parameter="32" />
                            </div>
                        </section>
                        
                        <section>
                            <h2>VCF</h2>
                            <div className={styles.subSection}>
                                <Slider parameter="33" />
                                <Slider parameter="34" />
                                <Slider parameter="35" />
                            </div>
                            <div className={styles.subSection}>
                                <Slider parameter="36" />
                                <Slider parameter="37" />
                                <Slider parameter="38" />
                            </div>
                            <div className={styles.subSection}>
                                <Slider parameter="39" />
                                <Slider parameter="40" />     
                            </div>
                        </section>

                        <section>
                            <h2>VCA</h2>
                            <div className={styles.subSection}>
                                <Slider parameter="41" />
                            </div>
                            <div className={styles.subSection}>
                                <Slider parameter="58" />
                            </div>
                            <div className={styles.subSection}>
                                <Slider parameter="42" />
                            </div>
                        </section>
                    </div>
                    <div className={styles.sectionGroup}>
                        <section>
                            <h2>LFO</h2>
                            <Slider parameter="44" />
                            <Slider parameter="45" />
                            <Slider parameter="46" />
                        </section>
                            
                        <section>
                            <h2>ENVELOPE-1</h2>
                            <Slider parameter="47" />
                            <Slider parameter="48" />
                            <Slider parameter="49" />
                            <Slider parameter="50" />
                            <Slider parameter="51" />
                        </section>

                        <section>
                            <h2>ENVELOPE-2</h2>
                            <Slider parameter="52" />
                            <Slider parameter="53" />
                            <Slider parameter="54" />
                            <Slider parameter="55" />
                            <Slider parameter="56" />
                        </section>

                        <section>
                            <h2>Chorus</h2>
                            <Slider parameter="43" />
                        </section>
                    </div>
                </div>
            } 
            {(state.synth === "MKS-VECOVEN4") &&
                <div className={styles.panel}>
                    Vecoven-panel coming soon!
                </div>
            }

            <footer>
                Made with <span>♥</span> in The Hague by <a href="https://www.ontwerper.com">Harry van Mierloo</a>.
            </footer>
        </React.Fragment>
    );
}

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

            // Retrieve the object from storage
            var retrievedData = JSON.parse(localStorage.getItem('PG-800'));
            
            if (retrievedData) {
                lsData.synth = retrievedData.synth;
                if (WebMidi.getInputByName(retrievedData.midiIn) !== false) {
                    MKS.midiIn = WebMidi.getInputByName(retrievedData.midiIn);   
                    lsData.midiIn = retrievedData.midiIn;
                } else {
                    lsData.midiIn = MKS.midiIn.name;
                }
                if (WebMidi.getInputByName(retrievedData.midiOut) !== false) {
                    MKS.midiOut = WebMidi.getOutputByName(retrievedData.midiOut);        
                    lsData.midiOut = retrievedData.midiOut;
                } else {
                    lsData.midiOut = MKS.midiOut.name;
                }
                lsData.midiChannelA = MKS.midiChannelA = retrievedData.midiChannelA;
                lsData.midiChannelB = MKS.midiChannelB = retrievedData.midiChannelB;
                lsData.midiControlChannel = MKS.midiControlChannel = retrievedData.midiControlChannel;
            }

            ReactDOM.render(
                <Provider>
                    <App />
                </Provider>,
                document.getElementById('root')
            );
        }
    }

}, true); // Sysex flag enabled
