import React from 'react';
import * as styles from './panel.module.scss';
import PanelPG800 from './panel-pg800.js';

const PanelJX8P = (props) => {
    return (
        <div className={styles.panel}>
            <PanelPG800 />
        </div>
    )
}

export default React.memo(PanelJX8P);
