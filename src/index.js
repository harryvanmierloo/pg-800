import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import WebMidi from "webmidi";
import Settings from './components/settings/settings.js';
import PanelJX8P from './components/panels/panel-jx8p.js';
import PanelMKS from './components/panels/panel-mks.js';
import PanelMKSVecoven4 from './components/panels/panel-mks-vecoven4.js';
import { SettingsContext, SettingsProvider } from './components/context/settingsContext.js';
import { PanelProvider } from './components/context/panelContext.js';
import styles from './index.module.scss';
import classNames from 'classnames';

function App() {
    
    const [settings] = useContext(SettingsContext);

    const [sidebarVisibility, setSidebarVisibility] = useState(true);

    const toggleSidebarVisibility = event => {
        setSidebarVisibility(!sidebarVisibility);
    };

    return (
        <React.Fragment>
            <div className={classNames(styles.sidebar, { [styles.collapsed]: !sidebarVisibility })}>
                <h1>PG-800 Online</h1>
                <p className={styles.subtitle}>v0.2 - Alpha</p>
                <Settings />

                <footer>
                    Made with <span>♥</span> in The Hague<br />by <a href="mailto:harry@vanmierloo.nl">Harry van Mierloo</a>
                </footer>
                <div onClick={toggleSidebarVisibility} className={styles.collapseButton}>
                    <div className={styles.icon}>&larr;</div>
                </div>
            </div>

            <main>
                {(settings.synth === "JX8P") &&
                    <PanelJX8P />
                }
                {(settings.synth === "JX10-VECOVEN3" || settings.synth === "MKS" || settings.synth === "MKS-VECOVEN3") &&
                    <PanelMKS />
                }
                {(settings.synth === "JX10-VECOVEN4" || settings.synth === "MKS-VECOVEN4") &&
                    <PanelMKSVecoven4 />
                }
            </main>
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
                <PanelProvider>
                    <SettingsProvider>
                        <App />
                    </SettingsProvider>
                </PanelProvider>,
                document.getElementById('root')
            );
            console.log ("App initialized!");
        }
    } 
  }, true); // Sysex flag enabled
