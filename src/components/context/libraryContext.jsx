import React, { createContext, useReducer } from 'react';

const LibraryContext = createContext();

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

