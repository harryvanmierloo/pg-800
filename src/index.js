import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import WebMidi from "webmidi";
import Settings from './components/settings/settings.js';
import PanelMKS from './components/panels/panel-mks.js';
import { SettingsContext, SettingsProvider, StateProvider } from './components/context/context.js';
import * as styles from './index.module.scss';


function App() {
    
    const [settings] = useContext(SettingsContext);

    return (
        <React.Fragment>
            <h1>PG-800 Virtual Programmer <span>v0.1 - Alpha</span></h1>
      
            <Settings />

            {(settings.synth === "MKS" || settings.synth === "JX-8P" || settings.synth === "MKS-VECOVEN3") &&
                <PanelMKS />
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
            console.log ("App initialized!");
        }
    } 
  }, true); // Sysex flag enabled
