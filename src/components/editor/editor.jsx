import React, { useContext } from 'react';
import PanelJX8P from '../panels/panel-jx8p';
import PanelMKS from '../panels/panel-mks';
import PanelMKSVecoven4 from '../panels/panel-mks-vecoven4';
import { SettingsContext } from '../context/settingsContext';

const Editor = (props) => {
    
    const [settings] = useContext(SettingsContext);

    return (
        <React.Fragment>
            {(settings.synth === "JX8P") &&
                <PanelJX8P />
            }
            {(settings.synth === "JX10-VECOVEN3" || settings.synth === "MKS" || settings.synth === "MKS-VECOVEN3") &&
                <PanelMKS/>
            }
            {(settings.synth === "JX10-VECOVEN4" || settings.synth === "MKS-VECOVEN4") &&
                <PanelMKSVecoven4 />
            }
        </React.Fragment>
    );
}

export default Editor;