import React, { createContext, useState, useReducer } from 'react';

const LibraryContext = createContext();

const initialBankSlots = [
    { type: 'INTERNAL', name: 'Internal', patches: [] },
    { type: 'CARTRIDGE', name: 'Cartridge', patches: [] },
];

const initialPatches = [
    { synth: 'JX8P', name: 'Patch 1', tones: [], data: [] },
    { synth: 'JX8P', name: 'Patch 2', tones: [], data: [] },
    { synth: 'MKS70', name: 'Patch 1', tones: [], data: [] }
]

const initialTones = [
    { synth: 'MKS70', name: 'Tone 1', data: [] },
    { synth: 'MKS70', name: 'Tone 2', data: [] },
    { synth: 'MKS70', name: 'Tone 2', data: [] }
]

// interface IPatch {
//     type: String;
//     name: String;
//     date: Date;
//     values: Uint8Array;
// }

// interface IBank {
//     name: String;
//     patches: IPatch[];
// }

const initialState = {
    rating: 3,
    price: 1
}

const actions = {
    SET_RATING: "SET_RATING",
    SET_PRICE: "SET_PRICE",
    RESET: "RESET"
}

function reducer(state, action) {
    switch (action.type) {
        case actions.SET_RATING:
            return { ...state, rating: action.value };
        case actions.SET_PRICE:
            return { ...state, price: action.value };
        case actions.RESET:
            return { ...state, ...initialState };
        default:
            return state;
    }
}

function LibraryProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState);

    const value = {
        rating: state.rating,
        price: state.price,
        setRating: value => {
            dispatch({ type: actions.SET_RATING, value });
        },
        setPrice: value => {
            dispatch({ type: actions.SET_PRICE, value });
        },
        reset: () => {
            dispatch({ type: actions.RESET });
        }
    };

    return (
        <LibraryContext.Provider value={value}>
            {children}
        </LibraryContext.Provider>
    );
}

export { LibraryContext, LibraryProvider };

