import React, { useState } from 'react';
import * as styles from './panel.module.scss';
import PanelPG800 from './panel-pg800.js'
import PanelPatch from './panel-patch.js'
import Title from '../title/title.js';

const PanelMKS = (props) => {

    const [tab, setTab] = useState("PATCH");

    const changeTab = (name) => event => {
        if (tab !== name) {
            setTab(name);
        }
    };

    return (
        <div className={styles.panel}>
            <ul className={styles.tabs}>
                <li onClick={changeTab("PATCH")} className={tab === "PATCH" ? styles.active : null}>Patch</li>
                <li onClick={changeTab("A")} className={tab === "A" ? styles.active : null}>Channel A</li>
                <li onClick={changeTab("B")} className={tab === "B" ? styles.active : null}>Channel B</li>
                {/* <li onClick={changeTab("AB")} className={tab === "AB" ? styles.active : null}>Both</li> */}
            </ul>

            <div style={{ display: (tab === "PATCH") ? null : 'none' }}>
                <Title />
                <PanelPatch />
            </div>
            <div style={{ display: (tab === "A") ? null : 'none' }}>
                <Title tone="A" />
                <PanelPG800 tone="A" />
            </div>
            <div style={{ display: (tab === "B") ? null : 'none' }}>
                <Title tone="B" />
                <PanelPG800 tone="B" />
            </div>
            <div style={{ display: (tab === "AB") ? null : 'none' }}>
                <React.Fragment>
                    <div>
                        <h3>Channel A</h3>
                        <PanelPG800 tone="A" />
                    </div>
                    <div>
                        <h3>Channel B</h3>
                        <PanelPG800 tone="B" />
                    </div>
                </React.Fragment>
            </div>
        </div>
    )
}

export default React.memo(PanelMKS);
