import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
  //useHistory allows us to programmatically change the url.
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.replace("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      //so, if the user is created inside the db, only then return with "auth"
      .then((auth) => {
        //if here, then it means that new user successfully created with email and password.
        console.log(auth);
        if (auth) {
          //if the authentication comes back (successfull) then, use the history of the browser to re-render the home page.
          history.push("/");
        }
      })
      //if atall something went wrong, then catch that and ..
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div>
        <Link to="/">
          <img
            className="login__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
            alt="amazonlogo"
          />
        </Link>
      </div>
      <div className="login__container">
        <h1>Sign-in</h1>

        <form action="">
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login__signInButton" onClick={signIn}>
            Sign In
          </button>
        </form>
        <small>
          By Signing-in you agree to Amazon's Conditions of Use & Sale. Please
          see our Privacy Notice, out Cookies Notice and our Interest-Based Ads.
        </small>
        <button className="login__registerButton" onClick={register}>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
