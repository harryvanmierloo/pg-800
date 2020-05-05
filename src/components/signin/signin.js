import React, {useState} from "react";
import { Link } from "@reach/router";
import { auth } from "../../firebase";
import * as styles from './signin.module.scss';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    
    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch(error => {
            setError("Error signing in with password and email!");
            console.error("Error signing in with password and email", error);
        });
    };

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;

        if (name === 'userEmail') {
            setEmail(value);
        }
        else if (name === 'userPassword'){
            setPassword(value);
        }
    };

  return (
    <div className={styles.signIn}>
        <h1>Sign In</h1>
        <div>
            {error !== null && <div className={styles.error}>{error}</div>}
            <form className="">
                <label htmlFor="userEmail" className="block">
                    Email:
                </label>
                <input
                    type="email"
                    name="userEmail"
                    value={email}
                    placeholder="E.g: faruq123@gmail.com"
                    id="userEmail"
                    onChange={(event) => onChangeHandler(event)}
                />
                <label htmlFor="userPassword" className="block">
                    Password:
                </label>
                <input
                    type="password"
                    name="userPassword"
                    value={password}
                    placeholder="Your Password"
                    id="userPassword"
                    onChange={(event) => onChangeHandler(event)}
                />
                <button onClick={(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
                    Sign in
                </button>
            </form>
            <p>
                Don't have an account?<br />
                <Link to="signUp">
                    Sign up here
                </Link>{" "}
                <br />{" "}
                <Link to="passwordReset">
                    Forgot Password?
                </Link>
            </p>
        </div>
    </div>
  );
};
export default SignIn;