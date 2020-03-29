import React, { useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import WebMidi from "webmidi";
import Settings from './components/settings/settings.js';
import Slider from './components/slider/slider.js';
import { SettingsContext, SettingsProvider, StateProvider } from './components/context/context.js';
import * as styles from './index.module.scss';


function App() {
    
    const [settings] = useContext(SettingsContext);

    useEffect(() => {
        console.log ("App initialized!");
    }, []);

    return (
        <React.Fragment>
            <h1>PG-800 Virtual Programmer <span>v0.1 - Alpha</span></h1>

            <Settings />

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
