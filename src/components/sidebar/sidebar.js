import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../context/userContext.js";
import * as styles from './sidebar.module.scss';
import classNames from 'classnames';
import { auth } from "firebase/app";


const Sidebar = (props) => {

    const user = useContext(UserContext);

    // Ugly hack to get current page
    const currentPage = window.location.pathname.toUpperCase().substr(1);
    
    const [sidebarVisibility, setSidebarVisibility] = useState(true);
    const [tab, setTab] = useState(currentPage);

    console.log(currentPage);

    const changeTab = (name) => event => {
        if (tab !== name) {
            setTab(name);
        }
    };

    const toggleSidebarVisibility = event => {
        setSidebarVisibility(!sidebarVisibility);
    };

    return (
        <React.Fragment>
            <div className={classNames(styles.sidebar, { [styles.collapsed]: !sidebarVisibility })}>
                <h1>PG-800 Online</h1>
                <p className={styles.subtitle}>v0.3 - Alpha</p>

                <div className={styles.tabs}>
                    <Link onClick={changeTab("LIBRARY")} className={tab === "LIBRARY" ? styles.active : null} to="/library">Library</Link>
                    <Link onClick={changeTab("EDITOR")} className={tab === "EDITOR" ? styles.active : null} to="/editor">Editor</Link>
                    <Link onClick={changeTab("SETTINGS")} className={tab === "SETTINGS" ? styles.active : null} to="/settings">Settings</Link>
                </div>

                <footer>
                    {(user) &&
                        <React.Fragment>
                            <p>
                                Welcome back, {user.displayName}!
                            </p>
                            <p>
                                You are logged in using<br />{user.email}<br />
                                <Link to="/signin" onClick={() => {auth().signOut()}}>Sign out</Link>
                            </p>
                            <p>
                                UUID: {user.uid}
                            </p>
                        </React.Fragment>
                    }
                    <p>Made with <span>♥</span> in The Hague<br />by <a href="mailto:harry@vanmierloo.nl">Harry van Mierloo</a></p>
                </footer>
                <div onClick={toggleSidebarVisibility} className={styles.collapseButton}>
                    <div className={styles.icon}>&larr;</div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Sidebar;