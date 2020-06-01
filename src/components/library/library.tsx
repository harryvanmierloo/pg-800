import React, {useContext, useState, useEffect} from "react";
import { getPatches, addSysexBlob } from "../../firebase";
import { usePanelState } from '../context/panelContext';
import { UserContext } from "../context/userContext";
import { LibraryContext } from "../context/libraryContext";
import { decodeBlob } from "../../firebase";
import Patch, { PatchRow } from "../patch/patch";

interface Bank {
    name: string;
    patches: Patch[];
}

const initialBank:Bank = {
    name: "Initial bank",
    patches: []
}

const Library = () => {

    const bankId = "QJ3VyT1PhedsCY7CtjGW"; // hard-coded for now.

    const [bank, setBank] = useState<Bank | null>(initialBank);

    const state = usePanelState();

    const user = useContext(UserContext);
    const { rating, setRating, price, setPrice, reset } = useContext(LibraryContext);

    const renderedPatchList = bank.patches.map((item, key) =>  
        <PatchRow key={key} synth={item.synth} name={item.name} date={item.date} values={item.values} />
    );

    const storeSysex = () => {
        let sysex = state.values;
        console.log(sysex);
        // Add blob to MKS-70 collection
        addSysexBlob("QJ3VyT1PhedsCY7CtjGW", sysex);
    };

    // Use an effect to authenticate and load the patch list from the database
    useEffect(() => {
        getPatches(bankId).then(patches => {
            let receivedPatches = [];
            patches.forEach(patch => {
                //console.log(patch.data());
                receivedPatches.push({
                    synth: 'MKS70',
                    name: patch.data().name,
                    date: new Date(patch.data().date).toLocaleString(),
                    values: decodeBlob(patch.data().values)
                });
            });
            console.log(receivedPatches);
            setBank({
                name: bankId,
                patches: receivedPatches
            });
        });
    }, [setBank]);

    return (
        (bank && user) ?

        <React.Fragment>

            <h3>From synth:</h3>
            <ul>
                <li>Rating: {rating}</li>
                <li>Price: {price}</li>
            </ul>

            <h3>Firebase: {bank.name}</h3>
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