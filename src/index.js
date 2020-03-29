import React, { useEffect, useCallback, useContext } from 'react';
import ReactDOM from 'react-dom';
import WebMidi from "webmidi";
import Slider from './components/slider/slider.js';
import { StateContext, StateProvider, SettingsContext, SettingsProvider } from './components/context/context.js';
import * as styles from './index.module.scss';
import update from 'immutability-helper';

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
    
    const [state, setState] = useContext(StateContext);
    const [settings, setSettings] = useContext(SettingsContext);

    const changeSettings = (name) => event => {
        // Update local storage
        let lsData = {
            synth: settings.synth,
            midiIn: settings.midiIn.name,
            midiOut: settings.midiOut.name,
            midiChannelA: settings.midiChannelA,
            midiChannelB: settings.midiChannelB,
            midiControlChannel: settings.midiControlChannel,
        };

        if (name === "synth") {
            let newSynth = event.target.value;
            setSettings(update(settings, {synth: {$set: newSynth}}));
            lsData.synth = newSynth;
        }
        if (name === "midiIn") {
            // Clear existing listener
            if (settings.midiIn.hasListener) {
                settings.midiIn.removeListener("sysex","all");
            }
            // Set new midiIn port
            let newMidiIn = WebMidi.getInputById(event.target.value);
            setSettings(update(settings, {midiIn: {$set: newMidiIn}}));
            lsData.midiIn = newMidiIn.name; // Use name instead of object ref
            // Add new listener
            newMidiIn.addListener("sysex", "all", sysexHandler);
        }
        if (name ==="midiOut") {
            let newMidiOut = WebMidi.getOutputById(event.target.value);
            setSettings(update(settings, {midiOut: {$set: newMidiOut}}));
            lsData.midiOut = newMidiOut.name; // Use name instead of object ref
        }
        if (name === "midiChannelA") {
            let newMidiChannelA = parseInt(event.target.value);
            setSettings(update(settings, {midiChannelA: {$set: newMidiChannelA}}));
            lsData.midiChannelA = newMidiChannelA;
        }
        if (name === "midiChannelB") {
            let newMidiChannelB = parseInt(event.target.value);
            setSettings(update(settings, {midiChannelB: {$set: newMidiChannelB}}));
            lsData.midiChannelB = newMidiChannelB;
        }
        if (name === "midiControlChannel") {
            let newMidiControlChannel = parseInt(event.target.value);
            setSettings(update(settings, {midiControlChannel: {$set: newMidiControlChannel}}));
            lsData.midiControlChannel = newMidiControlChannel;
        }
        if (name === "midiProgram") {
            if (event.target.value !== "-") {
                settings.midiOut.sendProgramChange(parseInt(event.target.value), settings.midiControlChannel);
            }
        }

        localStorage.setItem('PG-800', JSON.stringify(lsData));

        console.log("Updated local storage:", lsData);  
    };

    const playNote = useCallback((note, duration, velocity) => event => {
        settings.midiOut.playNote(note, settings.midiChannelA, {duration: duration, velocity: velocity });
        console.log(note, "played!");
    }, [settings.midiOut, settings.midiChannelA]);

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
        // Listen for incoming sysex
        settings.midiIn.addListener("sysex", "all", sysexHandler);
        console.log ("App initialized!");
    }, []);

    return (
        <React.Fragment>
            <div>
                <h1>PG-800 Virtual Programmer <span>v0.1 - Alpha</span></h1>
                <ul className={styles.midiOptions}>
                    <li>
                        <label htmlFor="select-synth">Connected synth</label>
                        <select id="select-synth" onChange={changeSettings('synth')} defaultValue={settings.synth}>
                            <option key="synth-select1" value="MKS">Roland JX-10 / MKS-70 - Original firmware</option>
                            <option key="synth-select2" value="MKS-VECOVEN3" disabled>Roland JX-10 / MKS-70 - Vecoven firmware 3.x</option>
                            <option key="synth-select3" value="MKS-VECOVEN4" disabled>Roland JX-10 / MKS-70 - Vecoven firmware 4.x</option>
                            <option key="synth-select4" value="JX-8P">Roland JX-8P</option>
                        </select>
                    </li>
                    <li>
                        <label htmlFor="select-midi-in">Midi from synth</label>
                        <select id="select-midi-in" onChange={changeSettings('midiIn')} defaultValue={settings.midiIn.id}>
                            {WebMidi.inputs.map((e, key) => {
                                return <option key={key} value={e.id}>{e.name}</option>;
                            })}
                        </select>
                    </li>
                    <li>
                        <label htmlFor="select-midi-out">Midi to synth</label>
                        <select id="select-midi-out" onChange={changeSettings('midiOut')} defaultValue={settings.midiOut.id}>
                            {WebMidi.outputs.map((e, key) => {
                                return <option key={key} value={e.id}>{e.name}</option>;
                            })}
                        </select>
                    </li>
                    <li>
                        <label htmlFor="select-midi-channel-a">Channel A</label>
                        <select id="select-midi-channel-a" onChange={changeSettings('midiChannelA')} defaultValue={settings.midiChannelA}>
                            {createChannelOptions()}
                        </select>
                    </li>
                    <li>
                        <label htmlFor="select-midi-channel-b">Channel B</label>
                        <select id="select-midi-channel-b" onChange={changeSettings('midiChannelB')} defaultValue={settings.midiChannelB}>
                            {createChannelOptions()}
                        </select>
                    </li>
                    <li>
                        <label htmlFor="select-midi-control-channel">Control Channel</label>
                        <select id="select-midi-control-channel" onChange={changeSettings('midiControlChannel')} defaultValue={settings.midiControlChannel}>
                            {createChannelOptions()}
                        </select>
                    </li>
                    <li>
                        <label htmlFor="select-midi-program">Patch</label>
                        <select id="select-midi-program" onChange={changeSettings('midiProgram')}>
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

            {(settings.synth === "MKS" || settings.synth === "JX-8P" || settings.synth === "MKS-VECOVEN3") &&
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
            {(settings.synth === "MKS-VECOVEN4") &&
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
            ReactDOM.render(
                <SettingsProvider>
                    <StateProvider>
                        <App />
                    </StateProvider>
                </SettingsProvider>,
                document.getElementById('root')
            );
        }
    } 
  }, true); // Sysex flag enabled
