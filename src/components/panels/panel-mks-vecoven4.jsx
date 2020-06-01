import React, { useState, useContext } from 'react';
import PanelVecoven4 from './panel-vecoven4'
import PanelPatch from './panel-patch'
import { SettingsContext } from '../context/settingsContext';
import Title from '../title/title';
import * as styles from './panel.module.scss';

const PanelMKSVecoven4 = (props) => {

    const [tab, setTab] = useState("A");
    const [settings] = useContext(SettingsContext);

    const changeTab = (name) => event => {
        if (tab !== name) {
            setTab(name);
        }
    };

    // Use correct naming for lower/upper parts, depending on synth model
    let aName = "Upper";
    let bName = "Lower";
    if (settings.synth === "MKS" || settings.synth === "MKS-VECOVEN3" || settings.synth === "MKS-VECOVEN4") {
        aName = "Tone A";
        bName = "Tone B";
    }

    return (
        <div className={styles.panel}>
            <ul className={styles.tabs}>
                <li onClick={changeTab("PATCH")} className={tab === "PATCH" ? styles.active : null}>Patch</li>
                <li onClick={changeTab("A")} className={tab === "A" ? styles.active : null}>{aName}</li>
                <li onClick={changeTab("B")} className={tab === "B" ? styles.active : null}>{bName}</li>
                <li onClick={changeTab("ALL")} className={tab === "ALL" ? styles.active : null}>All</li>
            </ul>

            <div style={{ display: (tab === "PATCH") ? null : 'none' }}>
                <Title />
                <PanelPatch />
            </div>
            <div style={{ display: (tab === "A") ? null : 'none' }}>
                <Title tone="A" />
                <PanelVecoven4 tone="A" />
            </div>
            <div style={{ display: (tab === "B") ? null : 'none' }}>
                <Title tone="B" />
                <PanelVecoven4 tone="B" />
            </div>
            <div style={{ display: (tab === "ALL") ? null : 'none' }}>
                <React.Fragment>
                    <div>
                        <h3>Patch settings</h3>
                        <Title />
                        <PanelPatch />
                    </div>
                    <div>
                        <h3>{aName}</h3>
                        <Title tone="A" />
                        <PanelVecoven4 tone="A" />
                    </div>
                    <div>
                        <h3>{bName}</h3>
                        <Title tone="B" />
                        <PanelVecoven4 tone="B" />
                    </div>
                </React.Fragment>
            </div>
        </div>
    )
}

export default React.memo(PanelMKSVecoven4);
