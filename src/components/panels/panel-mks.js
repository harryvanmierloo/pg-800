import React, { useState } from 'react';
import * as styles from './panel.module.scss';
import PanelPG800 from './panel-pg800.js'

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
                {/* <li onClick={changeTab("Patch")} className={tab === "Patch" ? styles.active : null}>Patch Settings</li> */}
            </ul>
            {(tab === "A") &&
                <PanelPG800 tone="A" />
            }
            {(tab === "B") &&
                <PanelPG800 tone="B" />
            }
            {(tab === "AB") &&
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
            }
            {(tab === "Patch") &&
                <h2>Patch settings</h2>
            }
        </div>
    )
}

export default React.memo(PanelMKS);
