import React from 'react';
import Slider from '../slider/slider.js';
import * as styles from './panel.module.scss';

const PanelPatch = (props) => {

    return (
        <React.Fragment>
            <div className={styles.sectionGroup}>
                <section>
                    <h2>General</h2>
                    <div className={styles.subSectionFull}>
                        <Slider parameter="18" />
                        <Slider parameter="19" />
                        <Slider parameter="20" />
                        <Slider parameter="21" />
                        <Slider parameter="22" />
                        <Slider parameter="23" />
                        <Slider parameter="24" />
                        <Slider parameter="25" />
                    </div>
                </section>
                <section>
                    <h2>After touch</h2>
                    <div className={styles.subSectionFull}>
                        <Slider parameter="26" />
                        <Slider parameter="27" />
                        <Slider parameter="28" />
                    </div>
                </section>
                <section>
                    <h2>Chase</h2>
                    <div className={styles.subSectionFull}>
                        <Slider parameter="47" />
                        <Slider parameter="48" />
                        <Slider parameter="49" />
                        <Slider parameter="50" />
                    </div>
                </section>
            </div>
            <div className={styles.sectionGroup}>
                <section>
                    <h2>Channel A</h2>
                    <div className={styles.subSectionFull}>
                        <Slider parameter="29" />
                        <Slider parameter="30" />
                        <Slider parameter="31" />
                        <Slider parameter="32" />
                        <Slider parameter="33" />
                        <Slider parameter="34" />
                        <Slider parameter="35" />
                        <Slider parameter="36" />
                    </div>
                </section>
                <section>
                    <h2>Channel B</h2>
                    <div className={styles.subSectionFull}>
                        <Slider parameter="38" />
                        <Slider parameter="39" />
                        <Slider parameter="40" />
                        <Slider parameter="41" />
                        <Slider parameter="42" />
                        <Slider parameter="43" />
                        <Slider parameter="44" />
                        <Slider parameter="45" />
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}

export default React.memo(PanelPatch);
