import React, { useState } from 'react';
import * as styles from './panel.module.scss';
import PanelPG800 from './panel-pg800.js'
import PanelPatch from './panel-patch.js'

const PanelMKS = (props) => {

    const [tab, setTab] = useState("A");

    const changeTab = (name) => event => {
        if (tab !== name) {
            setTab(name);
        }
    };

    return (
        <div className={styles.panel}>
            <ul className={styles.tabs}>
                <li onClick={changeTab("A")} className={tab === "A" ? styles.active : null}>Channel A</li>
                <li onClick={changeTab("B")} className={tab === "B" ? styles.active : null}>Channel B</li>
                {/* <li onClick={changeTab("AB")} className={tab === "AB" ? styles.active : null}>Both</li> */}
                <li onClick={changeTab("PATCH")} className={tab === "PATCH" ? styles.active : null}>Patch Settings</li>
            </ul>

            {/* Need style hide/show to prevent that state is lost in hidden (unmounted) tabs */}
            <div style={{ display: (tab === "A") ? null : 'none' }}>
                <PanelPG800 tone="A" />
            </div>
            <div style={{ display: (tab === "B") ? null : 'none' }}>
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
            <div style={{ display: (tab === "PATCH") ? null : 'none' }}>
                <PanelPatch />
            </div>
        </div>
    )
}

export default React.memo(PanelMKS);
