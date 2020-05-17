import React, {useState, useEffect} from "react";
import { getPatches, addSysexBlob, decodeBlob } from "../../firebase";
import { usePanelState } from '../context/panelContext.js';

const SignIn = () => {
    const [patchList, setPatchList] = useState([]);
    const state = usePanelState();

    // Use an effect to authenticate and load the grocery list from the database
    useEffect(() => {
        getPatches("QJ3VyT1PhedsCY7CtjGW").then(patches => {
            let receivedPatchList = [];
            patches.forEach(patch => {
                // console.log(patch.data().name);
                receivedPatchList.push(patch.data());
            });
            setPatchList(receivedPatchList);
        });
    }, [setPatchList]);

    const renderedPatchList = patchList.map((item, key) =>
        <li key={key}>
            <strong>{item.name}</strong><br />
            {item.values ? decodeBlob(item.values)[12] : null}
        </li>
    );

    const storeSysex = () => {
        let sysex = state.values;
        console.log(sysex);
        // Add blob to MKS-70 collection
        addSysexBlob("QJ3VyT1PhedsCY7CtjGW", sysex);
    };

    return (
        patchList ?

        <React.Fragment>
            <ul>
                {renderedPatchList}
            </ul>

            <button onClick={storeSysex}>Store sysex</button>
        </React.Fragment>

        :

        null
    );
};
export default SignIn;

// Generates a string with hex bytes from an array
function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2) + ' ';
    }).join('')
}