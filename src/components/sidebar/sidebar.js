import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../context/userContext.js";
import * as styles from './sidebar.module.scss';
import classNames from 'classnames';
import { auth } from "firebase/app";


const Sidebar = (props) => {

    const user = useContext(UserContext);
    
    const [sidebarVisibility, setSidebarVisibility] = useState(true);

    const toggleSidebarVisibility = event => {
        setSidebarVisibility(!sidebarVisibility);
    };

    return (
        <React.Fragment>
            <div className={classNames(styles.sidebar, { [styles.collapsed]: !sidebarVisibility })}>
                <h1>PG-800 Online</h1>
                <p className={styles.subtitle}>v0.2 - Alpha</p>

                <ul>
                    <li>
                        <Link to="/library">Library</Link>
                    </li>
                    <li>
                        <Link to="/editor">Editor</Link>
                    </li>
                    <li>
                        <Link to="/settings">Settings</Link>
                    </li>
                </ul>

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