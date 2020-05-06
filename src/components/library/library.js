import React, {useState, useContext, useEffect} from "react";
import UserContext from "../context/userContext.js";
import { getLibrary, getPatches } from "../../firebase";

const SignIn = () => {
    const user = useContext(UserContext);
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