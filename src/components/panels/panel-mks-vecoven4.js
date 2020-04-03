import React, { useState } from 'react';
import * as styles from './panel.module.scss';
import PanelPG800 from './panel-pg800.js'

const PanelMKSVecoven3 = (props) => {

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
                {/* <li onClick={changeTab("Patch")} className={tab === "Patch" ? styles.active : null}>Patch Settings</li> */}
            </ul>
            {(tab === "A") &&
                <PanelPG800 tone="A" />
            }
            {(tab === "B") &&
                <PanelPG800 tone="B" />
            }
            {(tab === "Patch") &&
                <h2>Patch settings</h2>
            }
        </div>
    )
}

export default React.memo(PanelMKSVecoven3);
