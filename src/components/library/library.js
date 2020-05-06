import React, {useState, useEffect} from "react";
import { getPatches } from "../../firebase";

const SignIn = () => {
    const [patchList, setPatchList] = useState([]);

    // Use an effect to authenticate and load the grocery list from the database
    useEffect(() => {
        getPatches("QJ3VyT1PhedsCY7CtjGW").then(patches => {
            let receivedPatchList = [];
            patches.forEach(patch => {
                console.log(patch.data().name);
                receivedPatchList.push(patch.data().name);
            })    
            setPatchList(receivedPatchList);
        });
    }, [setPatchList]);

    const renderedPatchList = patchList.map((item) =>
        <li>{item}</li>
    );

    return (
        patchList ?

        <ul>
            {renderedPatchList}
        </ul>

        :

        null
    );
};
export default SignIn;