import React from 'react';
import Slider from '../slider/slider.js';
import * as styles from './panel.module.scss';

const PanelPG800 = (props) => {
    const tone = (props.tone !== undefined) ? props.tone : "A";

    return (
        <React.Fragment>
            <div className={styles.sectionGroup}>
                <section>
                    <h2>DCO-1</h2>
                    <div className={styles.subSection}>
                        <Slider parameter="11" tone={tone} />
                        <Slider parameter="12" tone={tone} />
                    </div>
                    <div className={styles.subSection}>
                        <Slider parameter="13" tone={tone} />
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
                        <Slider parameter="19" tone={tone} />
                        <Slider parameter="20" tone={tone} />
                        <Slider parameter="21" tone={tone} />
                        <Slider parameter="22" tone={tone} />
                    </div>
                </section>

                <section>
                    <h2>Mixer</h2>
                    <div className={styles.subSection}>
                        <Slider parameter="28" tone={tone} />
                        <Slider parameter="29" tone={tone} />
                        <Slider parameter="30" tone={tone} />
                    </div>
                    <div className={styles.subSection}>
                        <Slider parameter="31" tone={tone} />
                        <Slider parameter="32" tone={tone} />
                    </div>
                </section>
                
                <section>
                    <h2>VCF</h2>
                    <div className={styles.subSection}>
                        <Slider parameter="33" tone={tone} />
                        <Slider parameter="34" tone={tone} />
                        <Slider parameter="35" tone={tone} />
                    </div>
                    <div className={styles.subSection}>
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
                    <div className={styles.subSection}>
                        <Slider parameter="41" tone={tone} />
                    </div>
                    <div className={styles.subSection}>
                        <Slider parameter="58" tone={tone} />
                    </div>
                    <div className={styles.subSection}>
                        <Slider parameter="42" tone={tone} />
                    </div>
                </section>
            </div>
            <div className={styles.sectionGroup}>
                <section>
                    <h2>LFO</h2>
                    <Slider parameter="44" tone={tone} />
                    <Slider parameter="45" tone={tone} />
                    <Slider parameter="46" tone={tone} />
                </section>
                    
                <section>
                    <h2>ENVELOPE-1</h2>
                    <Slider parameter="47" tone={tone} />
                    <Slider parameter="48" tone={tone} />
                    <Slider parameter="49" tone={tone} />
                    <Slider parameter="50" tone={tone} />
                    <Slider parameter="51" tone={tone} />
                </section>

                <section>
                    <h2>ENVELOPE-2</h2>
                    <Slider parameter="52" tone={tone} />
                    <Slider parameter="53" tone={tone} />
                    <Slider parameter="54" tone={tone} />
                    <Slider parameter="55" tone={tone} />
                    <Slider parameter="56" tone={tone} />
                </section>

                <section>
                    <h2>Chorus</h2>
                    <Slider parameter="43" tone={tone} />
                </section>
            </div>
        </React.Fragment>
    )
}

export default React.memo(PanelPG800);
