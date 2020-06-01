import React, { ReactNode, useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import Editor from "./components/editor/editor";
import SignIn from "./components/signin/signin";
import Library from "./components/library/library";
import Settings from './components/settings/settings';
import { SettingsContext } from './components/context/settingsContext';
import { UserContext } from "./components/context/userContext";
import useHandleSysex from "./helpers/sysex";
import Sidebar from './components/sidebar/sidebar';

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
    const { handleSysex } = useHandleSysex();

useEffect(() => {
        // Listen for incoming sysex
        console.log("Sysex listener enabled!");
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