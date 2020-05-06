import React, {useState, useEffect} from "react";
import { getPatches, addSysexPatch } from "../../firebase";
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
                receivedPatchList.push(patch.data().name);
            })    
            setPatchList(receivedPatchList);
        });
    }, [setPatchList]);

    const renderedPatchList = patchList.map((item, key) =>
        <li key={key}>{item}</li>
    );

    const storeSysex = () => {
        addSysexPatch("QJ3VyT1PhedsCY7CtjGW", state.values);
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