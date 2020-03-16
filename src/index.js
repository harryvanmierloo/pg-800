import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Switch, FormControlLabel} from '@material-ui/core';
import 'typeface-roboto';


const App = () => {
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });
    const handleChange = name => event => {
        console.log('Clicked!');
        setState({ ...state, [name]: event.target.checked });
    };

    return (
        <div className="main">
            <Button variant="contained" color="primary">
                Hello World
            </Button>
            <FormControlLabel
                control={<Switch checked={state.checkedA} onChange={handleChange('checkedA')} />}
                label="Test"
            />
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);