import React, { useContext } from 'react';
import { StateContext } from '../context/context.js';
import * as styles from './panel.module.scss';
import update from 'immutability-helper';
import PanelPG800 from './panel-pg800.js'

const PanelJX10 = (props) => {

    const [state, setState] = useContext(StateContext);

    const changeTab = (name) => event => {
        setState(update(state, {tab: {$set: name}}));
    }

    return (
        <div className={styles.panel}>
            <ul className={styles.tabs}>
                <li onClick={changeTab("A")} className={state.tab === "A" ? styles.active : null}>Upper</li>
                <li onClick={changeTab("B")} className={state.tab === "B" ? styles.active : null}>Lower</li>
                {/* <li onClick={changeTab("Patch")} className={state.tab === "Patch" ? styles.active : null}>Patch Settings</li> */}
            </ul>
            {(state.tab === "A") &&
                <PanelPG800 tone="A" />
            }
            {(state.tab === "B") &&
                <PanelPG800 tone="B" />
            }
            {(state.tab === "Patch") &&
                <h2>Patch settings</h2>
            }
        </div>
    )
}

export default React.memo(PanelJX10);
