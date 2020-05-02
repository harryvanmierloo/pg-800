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
                    <div>
                        <Slider parameter="11" tone={tone} />
                        <Slider parameter="12" tone={tone} />
                        <KnobControl parameter="13" tone={tone} />
                        <Slider parameter="31" tone={tone} />
                        <Slider parameter="14" tone={tone} />
                        <Slider parameter="15" tone={tone} />
                        <Slider parameter="16" tone={tone} />
                        <Slider parameter="17" tone={tone} />
                        <Slider parameter="18" tone={tone} />
                    </div>
                </section>
                <section>
                    <h2>PWM DCO-1</h2>
                    <div>
                        <Slider parameter="41" tone={tone} />
                        <Slider parameter="42" tone={tone} />
                        <Slider parameter="43" tone={tone} />
                        <Slider parameter="44" tone={tone} />
                        <Slider parameter="45" tone={tone} />
                        <Slider parameter="46" tone={tone} />
                    </div>
                </section>
                <section>
                    <div>
                        <h2>LFO-1</h2>
                        <Slider parameter="91" tone={tone} />
                        <Slider parameter="92" tone={tone} />
                        <Slider parameter="93" tone={tone} />
                        <Slider parameter="94" tone={tone} />
                        <Slider parameter="95" tone={tone} />
                    </div>
                </section>
            </div>
            <div className={styles.sectionGroup}>
                <section>
                    <h2>DCO-2</h2>
                    <div>
                        <Slider parameter="21" tone={tone} />
                        <Slider parameter="22" tone={tone} />
                        <KnobControl parameter="23" tone={tone} />
                        <KnobControl parameter="32" tone={tone} />
                        <Slider parameter="24" tone={tone} />
                        <Slider parameter="25" tone={tone} />
                        <Slider parameter="26" tone={tone} />
                        <Slider parameter="27" tone={tone} />
                        <Slider parameter="28" tone={tone} />
                    </div>
                </section>
                <section>
                    <h2>PWM DCO-2</h2>
                    <div>
                        <Slider parameter="51" tone={tone} />
                        <Slider parameter="52" tone={tone} />
                        <Slider parameter="53" tone={tone} />
                        <Slider parameter="54" tone={tone} />
                        <Slider parameter="55" tone={tone} />
                        <Slider parameter="56" tone={tone} />
                    </div>
                </section>
                <section>
                    <div>
                        <h2>LFO-2</h2>
                        <Slider parameter="101" tone={tone} />
                        <Slider parameter="102" tone={tone} />
                        <Slider parameter="103" tone={tone} />
                        <Slider parameter="104" tone={tone} />
                        <Slider parameter="105" tone={tone} />
                    </div>
                </section>
            </div>
            <div className={styles.sectionGroup}>
                <section>
                    <h2>Mixer</h2>
                    <div>
                        <Slider parameter="61" tone={tone} />
                        <Slider parameter="62" tone={tone} />
                        <Slider parameter="63" tone={tone} />
                        <Slider parameter="64" tone={tone} />
                        <Slider parameter="65" tone={tone} />
                    </div>
                </section>
                <section>
                    <h2>VCF</h2>
                    <div>
                        <Slider parameter="71" tone={tone} />
                        <Slider parameter="72" tone={tone} />
                        <Slider parameter="73" tone={tone} />
                        <Slider parameter="74" tone={tone} />
                        <Slider parameter="75" tone={tone} />
                        <Slider parameter="76" tone={tone} />
                        <Slider parameter="77" tone={tone} />
                        <Slider parameter="78" tone={tone} />
                    </div>
                </section>
                <section>
                    <h2>VCA</h2>
                    <div>
                        <Slider parameter="81" tone={tone} />
                        <Slider parameter="82" tone={tone} />
                        <Slider parameter="83" tone={tone} />
                    </div>
                </section>
                <section>
                    <div>
                        <h2>Chorus</h2>
                        <Slider parameter="34" tone={tone} />
                    </div>
                </section>
            </div>
            <div className={styles.sectionGroup}>
                <section>
                    <div>
                        <h2>ENVELOPE-1</h2>
                        <Slider parameter="111" tone={tone} />
                        <Slider parameter="112" tone={tone} />
                        <Slider parameter="113" tone={tone} />
                        <Slider parameter="114" tone={tone} />
                        <Slider parameter="115" tone={tone} />
                        <Slider parameter="116" tone={tone} />
                        <Slider parameter="117" tone={tone} />
                        <Slider parameter="118" tone={tone} />
                    </div>
                </section>
                <section>
                    <div>
                        <h2>ENVELOPE-2</h2>
                        <Slider parameter="121" tone={tone} />
                        <Slider parameter="122" tone={tone} />
                        <Slider parameter="123" tone={tone} />
                        <Slider parameter="124" tone={tone} />
                        <Slider parameter="125" tone={tone} />
                        <Slider parameter="126" tone={tone} />
                        <Slider parameter="127" tone={tone} />
                        <Slider parameter="128" tone={tone} />
                    </div>
                </section>
                <section>
                    <div>
                        <h2>ENVELOPE-3</h2>
                        <Slider parameter="131" tone={tone} />
                        <Slider parameter="132" tone={tone} />
                        <Slider parameter="133" tone={tone} />
                        <Slider parameter="134" tone={tone} />
                        <Slider parameter="135" tone={tone} />
                    </div>
                </section>
                <section>
                    <div>
                        <h2>ENVELOPE-4</h2>
                        <Slider parameter="141" tone={tone} />
                        <Slider parameter="142" tone={tone} />
                        <Slider parameter="143" tone={tone} />
                        <Slider parameter="144" tone={tone} />
                        <Slider parameter="145" tone={tone} />
                    </div>
                </section>

            </div>
        </React.Fragment>
    )
}

export default React.memo(PanelVecoven4);
