import React, {useState} from 'react';

const initialState = {
    synth: "MKS",
    values: [ 
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0
    ]
};
const Context = React.createContext([{}, () => {}]);

const Provider = (props) => {
  const [state, setState] = useState(initialState);

  return (
    <Context.Provider value={[ state, setState ]}>
      { props.children }
    </Context.Provider>
  );
};

export { Context, Provider }