import React, { useContext, useCallback, useEffect } from 'react';
import update from 'immutability-helper';
import WebMidi from "webmidi";
import { SettingsContext } from '../context/settingsContext.js';
import { usePanelDispatch } from '../context/panelContext.js';
import * as styles from './settings.module.scss';

const Settings = (props) => {

    const [settings, setSettings] = useContext(SettingsContext);

    const dispatch = usePanelDispatch();

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
            let char = String.fromCharCode(d+65);
            for (let i = 1; i <= 8; i++) {
                let program = 63 + 8 * d + i;
                options.push(<option key={program} value={program}>Cartridge - {char}{i}</option>);
            }
        }
        return options;
    }, []);

    let sysexData = {
        valuesA: undefined,
        valuesB: undefined,
        patch: undefined
    }
    const sysexHandler = useCallback((event) => {
        let sysex = parseSysex(event.data);
        if (sysex) {
            if (sysex.target === "A") {
                sysexData.valuesA = sysex.values;
                // console.log("Received TONE A parameter values: ", sysex.values);
            }
            if (sysex.target === "B") {
                sysexData.valuesB = sysex.values;
                // console.log("Received TONE B parameter values: ", sysex.values);
            }
            if (sysex.target === "PATCH") {
                sysexData.patch = sysex.values;
                // console.log("Received PATCH parameter values: ", sysex.values);
            }
            dispatch({ type: 'setAll', target: sysex.target, values: sysex.values, name: sysex.name });
        }
    }, [sysexData, dispatch]);

    useEffect((event) => {
        // Listen for incoming sysex
        settings.midiIn.addListener("sysex", "all", sysexHandler);
    }, [sysexHandler, settings.midiIn]);

    return (
        <ul className={styles.settings}>
            <li>
                <label htmlFor="select-synth">Connected synth</label>
                <select id="select-synth" onChange={changeSettings('synth')} defaultValue={settings.synth}>
                    <option key="synth-select1" value="JX8P">Roland JX-8P</option>
                    <option key="synth-select2" value="MKS">Roland MKS-70 - Original firmware</option>
                    <option key="synth-select3" value="MKS-VECOVEN3">Roland MKS-70 - Vecoven firmware 3.x</option>
                    <option key="synth-select4" value="MKS-VECOVEN4" disabled>Roland MKS-70 - Vecoven firmware 4.x</option>
                    <option key="synth-select5" value="JX10-VECOVEN3">Roland JX-10 - Vecoven firmware 3.x</option>
                    <option key="synth-select6" value="JX10-VECOVEN4" disabled>Roland JX-10 - Vecoven firmware 3.x</option>
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
                <button onClick={playNote(["C5", "E5", "G5"], 1000, 0.5)}>
                    Play test chord
                </button>
            </li>
        </ul>
    )
}

export default React.memo(Settings);


const parseSysex = data => {
    let sysex = Array.from(data);

    let parameters = [];
    let name = "";

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
                for (let p = 7; p < (sysex.length - 1); p++) { // Start at 7th sysex byte for values
                    parameters.push(sysex[p]);
                    // Set patch name using first 18 bytes
                    if (p < (18 + 7)) {
                        name += String.fromCharCode(sysex[p]);
                    }
                }
                //console.log("All PATCH parameters (3.1.2)", parameters);
                return { target: "PATCH", values: parameters, name: name.trim() };
            } else if (sysex[5] === 0b00100000) {
                if (sysex[6] === 1) {
                    for (let p = 7; p < (sysex.length - 1); p++) {
                        parameters.push(sysex[p]);
                        // Set tone name using first 18 bytes
                        if (p < (10 + 7)) {
                            name += String.fromCharCode(sysex[p]);
                        }
                    }
                    //console.log("All TONE parameters for TONE A (3.3.2)", parameters);
                    return { target: "A", values: parameters, name: name.trim() };
                }
                else if (sysex[6] === 2) {
                    for (let p = 7; p < (sysex.length - 1); p++) {
                        parameters.push(sysex[p]);
                        // Set tone name using first 18 bytes
                        if (p < (10 + 7)) {
                            name += String.fromCharCode(sysex[p]);
                        }
                    }
                    //console.log("All TONE parameters for TONE B (3.3.2)", parameters);
                    return { target: "B", values: parameters, name: name.trim() };
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
