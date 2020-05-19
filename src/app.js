import React, { useContext, useCallback, useEffect } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import Editor from "./components/editor/editor.js";
import SignIn from "./components/signin/signin.js";
import Library from "./components/library/library.js";
import Settings from './components/settings/settings.js';
import { SettingsContext } from './components/context/settingsContext.js';
import { UserContext } from "./components/context/userContext.js";
import { usePanelDispatch } from './components/context/panelContext.js';
import useHandleSysex, { parseSysex } from "./helpers/sysex.js";
import Sidebar from './components/sidebar/sidebar.js';

const PrivateRoute = ({children, ...rest}) => {
    const user = useContext(UserContext);

    return (
        <Route {...rest} render={(props) => (
            user
                ? children
                : <Redirect to={{
                    pathname: "/signin",
                    state: { from: props.location }
                }} />
        )} />
    );
};

const App = (props) => {

    const [settings] = useContext(SettingsContext);
    const { sysexValues, handleSysex } = useHandleSysex();

    useEffect((event) => {
        // Listen for incoming sysex
        settings.midiIn.addListener("sysex", "all", handleSysex);
    }, [handleSysex, settings.midiIn]);

    return (
        <BrowserRouter>
            <React.Fragment>
                
                <Sidebar />

                <main>
                    <Switch>
                        <Route path="/signin">
                            <SignIn />
                        </Route>
                        <Route path="/editor">
                            <Editor />
                        </Route>
                        <Route path="/settings">
                            <Settings />
                        </Route>
                        <PrivateRoute path="/library">
                            <Library />
                        </PrivateRoute>
                    </Switch>
                </main>
            </React.Fragment>
        
        </BrowserRouter>
    );
}

export default App;