import React, { useState } from 'react';
import PanelPG800 from './panel-pg800.js'
import PanelPatch from './panel-patch.js'
import Title from '../title/title.js';
import * as styles from './panel.module.scss';

const PanelJX10 = (props) => {

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
                <li onClick={changeTab("A")} className={tab === "A" ? styles.active : null}>Upper</li>
                <li onClick={changeTab("B")} className={tab === "B" ? styles.active : null}>Lower</li>
                <li onClick={changeTab("ALL")} className={tab === "ALL" ? styles.active : null}>All</li>
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
            <div style={{ display: (tab === "ALL") ? null : 'none' }}>
                <React.Fragment>
                    <div>
                        <h3>Patch settings</h3>
                        <Title />
                        <PanelPatch />
                    </div>
                    <div>
                        <h3>Upper</h3>
                        <Title tone="A" />
                        <PanelPG800 tone="A" />
                    </div>
                    <div>
                        <h3>Lower</h3>
                        <Title tone="B" />
                        <PanelPG800 tone="B" />
                    </div>
                </React.Fragment>
            </div>
        </div>
    )
}

export default React.memo(PanelJX10);
