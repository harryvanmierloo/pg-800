import React, {useCallback, useContext, useState, useEffect} from "react";
import { getPatches, addSysexBlob, decodeBlob } from "../../firebase";
import { usePanelState } from '../context/panelContext.js';
import { UserContext } from "../context/userContext.js";
import Patch from "../patch/patch.js";

const SignIn = () => {
    const [patchList, setPatchList] = useState([]);
    const state = usePanelState();

    const user = useContext(UserContext);

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

    const renderedPatchList = useCallback(patchList.map((item, key) =>  
        <Patch key={key} patch={item} />
    ));

    const storeSysex = () => {
        let sysex = state.values;
        console.log(sysex);
        // Add blob to MKS-70 collection
        addSysexBlob("QJ3VyT1PhedsCY7CtjGW", sysex);
    };

    return (
        (patchList && user) ?

        <React.Fragment>

            <h1>Received</h1>

            <h1>Firebase</h1>
            <table>
                <tbody>
                    {renderedPatchList}
                </tbody>
            </table>
            <hr />
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