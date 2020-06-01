import React, {useCallback, useContext, useState, useEffect} from "react";
import { getPatches, addSysexBlob } from "../../firebase";
import { usePanelState } from '../context/panelContext';
import { UserContext } from "../context/userContext";
import Patch from "../patch/patch";
import { LibraryContext } from "../context/libraryContext";

interface IPatch {
    synth: string;
    name: string;
    values: number[];
}

interface IBank {
    name: string;
    patches: IPatch[];
}

const initialBankData = {
    name: "My Default Bank",
    patches: [
        { synth: 'JX8P', name: 'Patch 1', values: [] },
        { synth: 'JX8P', name: 'Patch 2', values: [] },
        { synth: 'MKS70', name: 'Patch 1', values: [] }
    ]
}

const Library = () => {
    const [patchList, setPatchList] = useState([]);

    const [bank, setBank] = useState<IBank | null>(initialBankData);

    const state = usePanelState();

    const user = useContext(UserContext);
    const { rating, setRating, price, setPrice, reset } = useContext(LibraryContext);

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

    const renderedLibrary = bank.patches.map((item, key) =>  
        <li key={key}>
            <span>{item.synth} | </span>
            <span>{item.name} | </span>
            <span>{item.values}</span>
        </li>
    );

    const renderedPatchList = patchList.map((item, key) =>  
        <Patch key={key} patch={item} />
    );

    const storeSysex = () => {
        let sysex = state.values;
        console.log(sysex);
        // Add blob to MKS-70 collection
        addSysexBlob("QJ3VyT1PhedsCY7CtjGW", sysex);
    };

    return (
        (patchList && user) ?

        <React.Fragment>

            <h3>{bank.name}</h3>
            <ul>
                {renderedLibrary}
            </ul>
            
            <h3>Received</h3>
            <ul>
                <li>Rating: {rating}</li>
                <li>Price: {price}</li>
            </ul>

            <h3>Firebase</h3>
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
export default Library;

// Generates a string with hex bytes from an array
// function toHexString(byteArray) {
//     return Array.from(byteArray, function(byte) {
//         return ('0' + (byte & 0xFF).toString(16)).slice(-2) + ' ';
//     }).join('')
// }