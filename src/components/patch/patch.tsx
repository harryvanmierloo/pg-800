import React from 'react';

const types = {
    PATCH: 'PATCH',
    TONE: 'TONE,'
}

export default interface Patch {
    synth: string;
    name: string;
    date: Date;
    type?: string;
    values: number[];
}

export const PatchRow = (props:Patch) => {

    console.log(props);

    //const parsedDate = props.date ? new Date(props.date).toLocaleDateString() : null;

    return (
        <tr>
            <td>{props.type}</td>
            <td>{props.name}</td>
            <td>{props.date}</td>
            <td>{props.values}</td>
        </tr>
    )
};
