import React, { useContext, useCallback } from 'react';
import { SettingsContext } from '../context/settingsContext.js';
import { usePanelDispatch } from '../context/panelContext.js';
import Slider from '../slider/slider.js';
import KnobControl from '../knob/knob.js';
import * as styles from './panel.module.scss';

const PanelVecoven4 = (props) => {
    const tone = (props.tone !== undefined) ? props.tone : "A";

    const [settings] = useContext(SettingsContext);
    const dispatch = usePanelDispatch();

    const initTone = useCallback((tone) => event => {
        dispatch({ type: 'initToneSysex', target: tone, settings: settings });
    }, [dispatch, settings]);

    const randomizeTone = useCallback((tone) => event => {
        dispatch({ type: 'randomizeToneSysex', target: tone, settings: settings });
    }, [dispatch, settings]);

    return (
        <React.Fragment>
            <div className={styles.actions}>
                <button onClick={initTone(tone)}>Initialize</button>
                <button onClick={randomizeTone(tone)}>Randomize</button>
            </div>
            <div className={styles.sectionGroup}>
                <section>
                    <h2>DCO-1</h2>
                    <div className={styles.subSection}>
                        <Slider parameter="11" tone={tone} />
                        <Slider parameter="12" tone={tone} />
                    </div>
                    <div className={styles.subSection}>
                        <KnobControl parameter="13" tone={tone} />
                    </div>
                    <div className={styles.subSectionFull}>
                        <Slider parameter="14" tone={tone} />
                        <Slider parameter="15" tone={tone} />
                    </div>
                    <div className={styles.subSection}>
                        <Slider parameter="26" tone={tone} />
                        <Slider parameter="27" tone={tone} />
                    </div>
                </section>

                <section>
                    <h2>DCO-2</h2>
                    <div className={styles.subSection}>
                        <Slider parameter="16" tone={tone} />
                        <Slider parameter="17" tone={tone} />
                        <Slider parameter="18" tone={tone} />
                    </div>
                    <div className={styles.subSection}>
                        <KnobControl parameter="19" tone={tone} />
                        <KnobControl parameter="20" tone={tone} />
                    </div>
                    <div className={styles.subSectionExtra}>
                        <Slider parameter="21" tone={tone} />
                        <Slider parameter="22" tone={tone} />
                    </div>
                </section>

                <section>
                    <h2>Mixer</h2>
                    <div className={styles.subSectionFull}>
                        <Slider parameter="28" tone={tone} />
                        <Slider parameter="29" tone={tone} />
                    </div>
                    <div className={styles.subSectionFull}>
                        <Slider parameter="30" tone={tone} />
                    </div>
                    <div className={styles.subSection}>
                        <Slider parameter="31" tone={tone} />
                        <Slider parameter="32" tone={tone} />
                    </div>
                </section>
                
                <section>
                    <h2>VCF</h2>
                    <div className={styles.subSectionFull}>
                        <Slider parameter="33" tone={tone} />
                        <Slider parameter="34" tone={tone} />
                        <Slider parameter="35" tone={tone} />
                    </div>
                    <div className={styles.subSectionFull}>
                        <Slider parameter="36" tone={tone} />
                        <Slider parameter="37" tone={tone} />
                        <Slider parameter="38" tone={tone} />
                    </div>
                    <div className={styles.subSection}>
                        <Slider parameter="39" tone={tone} />
                        <Slider parameter="40" tone={tone} />     
                    </div>
                </section>

                <section>
                    <h2>VCA</h2>
                    <div className={styles.subSectionFull}>
                        <Slider parameter="41" tone={tone} />
                    </div>
                    <div className={styles.subSectionFull}>
                        <Slider parameter="58" tone={tone} />
                    </div>
                    <div className={styles.subSection}>
                        <Slider parameter="42" tone={tone} />
                    </div>
                </section>
            </div>
            <div className={styles.sectionGroup}>
                <section>
                    <div className={styles.subSectionFull}>
                        <h2>LFO</h2>
                        <Slider parameter="44" tone={tone} />
                        <Slider parameter="45" tone={tone} />
                        <Slider parameter="46" tone={tone} />
                    </div>
                </section>
                <section>
                    <div className={styles.subSectionFull}>
                        <h2>ENVELOPE-1</h2>
                        <Slider parameter="47" tone={tone} />
                        <Slider parameter="48" tone={tone} />
                        <Slider parameter="49" tone={tone} />
                        <Slider parameter="50" tone={tone} />
                        <Slider parameter="51" tone={tone} />
                    </div>
                </section>
                <section>
                    <div className={styles.subSectionFull}>
                        <h2>ENVELOPE-2</h2>
                        <Slider parameter="52" tone={tone} />
                        <Slider parameter="53" tone={tone} />
                        <Slider parameter="54" tone={tone} />
                        <Slider parameter="55" tone={tone} />
                        <Slider parameter="56" tone={tone} />
                    </div>
                </section>
                <section>
                    <div className={styles.subSectionFull}>
                        <h2>Chorus</h2>
                        <Slider parameter="43" tone={tone} />
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}

export default React.memo(PanelVecoven4);
