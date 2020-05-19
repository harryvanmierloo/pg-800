import React, {useState} from 'react';
import { getPatches, addSysexBlob, decodeBlob } from "../../firebase";

const types = {
    PATCH: 'PATCH',
    TONE: 'TONE,'
}

const Patch = (data) => {

    const patch = data.patch;

    const type = patch.type ? patch.type : types.PATCH;
    const name = patch.name;
    const date = patch.date ? new Date(patch.date).toLocaleDateString() : null;
    const values = patch.values ? decodeBlob(patch.values) : null;

    return (
        <tr>
            <td>{name}</td>
            <td>{date}</td>
            <td>{values}</td>
        </tr>
    )

};

export default Patch;