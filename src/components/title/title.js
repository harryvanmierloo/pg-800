import React, { useState, useEffect } from 'react';
import { usePanelState } from '../context/panelContext.js';

const Title = (props) => {

    const tone = props.tone;
    // If no tone defined, assume it's a patch slider instead of tone slider
    const type = (tone === undefined) ? "PATCH" : "TONE";

    // Offset for parameterStateId --> Tone A: 0 / Tone B: 100 / Patch: 200
    let offset = 0;
    if (type === "TONE") {
        offset = (tone === "B") ? 100 : 0;
    }
    else if (type === "PATCH") {
        offset = 200;
    }

    const state = usePanelState();
    
    const [title, setTitle] = useState(0);

    useEffect(() => {
        let _title = "";

        // Show tone number
        if (type === "TONE") {
            const toneNumber = (tone === "A") ? 229 : 238;
            if (state.values[toneNumber] !== 0) {
                _title += (state.values[toneNumber] + 1) + ": "; // Synth display number starts at 1
            }
        }

        // Tone: 10 characters / Patch: 18 characters
        const max = (type === "TONE") ? 10 : 18;

        // Convert stored parameter (from sysex) to ascii equivalent
        for (let i = 0; i < max; i++) {
            let asciiValue = state.values[offset + i];
            const char = String.fromCharCode(asciiValue);
            if (asciiValue) {
                _title += char;
            }
        }
        setTitle(_title);

        //console.log('UseEffect: Value set from context: ', tone, parameterId, value);
    }, [state, type, tone, offset, title, setTitle]);

    return (
        <React.Fragment>
            {(title) &&
                <h2>{title}</h2>
            }
        </React.Fragment>
    )
}

export default React.memo(Title);
