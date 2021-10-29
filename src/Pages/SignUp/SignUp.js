import React, { useState } from "react";
import "./SignUp.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import useCustomContext from "../../Hooks/UseCustomContext";
import { updateProfile } from "@firebase/auth";

const SignUp = () => {
  const { signInWithGoogle, user, createNewAccount, signOutUser } =
    useCustomContext();
  const [error, setError] = useState({ state: false, message: null });
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const IS_INVALID = emailAddress === "" || password === "";
  const history = useHistory();

  const SignUpHandler = (event) => {
    event.preventDefault();
    // console.log(IS_INVALID, emailAddress, password, username, "Sign up wala");
    if (IS_INVALID) {
      setError({ state: true, message: "Check Input Values" });
      return;
    }
    setError({ state: false, message: "" });
    createNewAccount(emailAddress, password)
      .then((data) => {
        updateProfile(data.user, { displayName: username })
          .then(() => {
            console.log("username added Sucessfully");
          })
          .catch((error) => alert(error));
        console.log("Created New Account Sucessfully", data);
        signOutUser()
          .then(() => history.push("/login"))
          .catch((error) => alert(error));
        //fix: bug in f9 if we update/create user -> authState also changes
      })
      .catch((error) => alert(error));
    setEmailAddress("");
    setPassword("");
    setUsername("");
  };

  return (
    <>
      {user && <Redirect to="/" />}
      <div className="signup__section">
        <Card className="signupForm__card">
          <h1 className="signupForm__brandName">REGISTER</h1>
          <form className="signupForm" onSubmit={SignUpHandler}>
            <label htmlFor="name">UserName</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your Fullname"
              autoComplete="name"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="text"
              placeholder="Enter New Email-Id"
              autoComplete="email"
              value={emailAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
            />
            <label htmlFor="pass">Password</label>
            <input
              id="pass"
              type="password"
              placeholder="Enter New Password"
              autoComplete="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button type="submit"> Sign Up</button>
            <p>
              Already a member?
              <Link className="btn-redirect" to={"/login"}>
                Login
              </Link>
            </p>
            {error.state && <div className="errorMsg">{error.message}</div>}
          </form>
          <button
            className="btn-Google"
            onClick={() => {
              signInWithGoogle()
                .then(({ user }) => {
                  console.log("USER SIGN-In GOOGLE ", user);
                  // history.push("./cart-section");
                })
                .catch((error) => alert("ERROR => ", error));
            }}
          >
            <img src="/images/google-logo.svg" alt="google-logo" />
            Sign in with Google
          </button>
        </Card>
      </div>
    </>
  );
};

export default SignUp;
