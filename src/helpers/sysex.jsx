import {useState, useCallback} from 'react';
import { addSysexBlob } from "../firebase";
import { usePanelDispatch } from '../components/context/panelContext';

let sysexData = {
    valuesA: undefined,
    valuesB: undefined,
    patch: undefined
}

// Custom hook for handling incoming sysex
const useHandleSysex = () => {
    const dispatch = usePanelDispatch();

    const [sysexValues, setSysexValues] = useState({});

    const handleSysex = useCallback((event) => {
        let sysex = parseSysex(event.data);
        console.log(sysex);
        if (sysex) {
            if (sysex.target === "A") {
                sysexData.valuesA = sysex.values;
                // console.log("Received TONE A parameter values: ", sysex.values);
            }
            if (sysex.target === "B") {
                sysexData.valuesB = sysex.values;
                // console.log("Received TONE B parameter values: ", sysex.values);
            }
            if (sysex.target === "PATCH") {
                sysexData.patch = sysex.values;
                // console.log("Received PATCH parameter values: ", sysex.values);
            }
            dispatch({ type: 'setAll', target: sysex.target, values: sysex.values, name: sysex.name });
            storeSysex(sysex.target, sysex.name, sysex.values);
        }
        setSysexValues(sysex);
    }, [dispatch]);

    return { sysexValues, handleSysex };
};


const parseSysex = data => {
    let sysex = Array.from(data);

    let parameters = [];
    let name = "";

    if (sysex[0] === 240 && sysex[1] === 65) { // Filter for Roland sysex

        // DERIVED FROM SYSEX SPEC IN ROLAND MKS-70 MANUAL

        // Program Number (PGR) - 00110100 - 52
        if (sysex[2] === 0b00110100) {
            if (sysex[5] === 0b00110000) {
                //console.log("PATCH program number (3.1.1)", sysex);
            } else if (sysex[5] === 0b00100000) {
                //console.log("TONE program number (3.3.1)", sysex);
            }
        }

        // All Patch Parameters (APR) - 00110101 - 53
        if (sysex[2] === 0b00110101) {
            if (sysex[5] === 0b00110000) {
                for (let p = 7; p < (sysex.length - 1); p++) { // Start at 7th sysex byte for values
                    parameters.push(sysex[p]);
                    // Set patch name using first 18 bytes
                    if (p < (18 + 7)) {
                        name += String.fromCharCode(sysex[p]);
                    }
                }
                //console.log("All PATCH parameters (3.1.2)", parameters);
                return { target: "PATCH", values: parameters, name: name.trim() };
            } else if (sysex[5] === 0b00100000) {
                if (sysex[6] === 1) {
                    for (let p = 7; p < (sysex.length - 1); p++) {
                        parameters.push(sysex[p]);
                        // Set tone name using first 18 bytes
                        if (p < (10 + 7)) {
                            name += String.fromCharCode(sysex[p]);
                        }
                    }
                    console.log("All TONE parameters for TONE A (3.3.2)", parameters);
                    return { target: "A", values: parameters, name: name.trim() };
                }
                else if (sysex[6] === 2) {
                    for (let p = 7; p < (sysex.length - 1); p++) {
                        parameters.push(sysex[p]);
                        // Set tone name using first 18 bytes
                        if (p < (10 + 7)) {
                            name += String.fromCharCode(sysex[p]);
                        }
                    }
                    //console.log("All TONE parameters for TONE B (3.3.2)", parameters);
                    return { target: "B", values: parameters, name: name.trim() };
                }
            }
        }
        // Individual Patch Parameter (IPR) - 00110110 - 54
        if (sysex[2] === 0b00110110) {
            if (sysex[5] === 0b00110000) {
                //console.log("Individual PATCH Parameter (3.2)", sysex);
            } else if (sysex[5] === 0b00100000) {
                //console.log("Individual TONE Parameter (3.4)", sysex);
            }
        }
    }
    return;
}

const storeSysex = (target, name, values) => {
    let type = target;
    if (target === "A" || type === "B") {
        type = "TONE";
    }
    // Add blob to MKS-70 collection
    addSysexBlob("QJ3VyT1PhedsCY7CtjGW", type, name, values);
};


export default useHandleSysex;
export { parseSysex, storeSysex };
