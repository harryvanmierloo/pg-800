import React from 'react';
import ReactDOM from 'react-dom';
import WebMidi from "webmidi";
import App from "./app.js";
import { SettingsProvider } from './components/context/settingsContext.js';
import UserProvider from "./components/context/userContext.js";
import { PanelProvider } from './components/context/panelContext.js';
import * as styles from './index.module.scss';

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
                <UserProvider>
                    <PanelProvider>
                        <SettingsProvider>
                            <App />
                        </SettingsProvider>
                    </PanelProvider>
                </UserProvider>,
                document.getElementById('root')
            );
            console.log ("App initialized!");
        }
    } 
  }, true); // Sysex flag enabled
