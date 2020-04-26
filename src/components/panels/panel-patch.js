import React from 'react';
import Slider from '../slider/slider.js';
import KnobControl from '../knob/knob.js';
import * as styles from './panel.module.scss';

const PanelPatch = (props) => {
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
            </div>
        </React.Fragment>
    )
}

export default React.memo(PanelPatch);
