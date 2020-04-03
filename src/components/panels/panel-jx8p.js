import React from 'react';
import Slider from '../slider/slider.js';
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
