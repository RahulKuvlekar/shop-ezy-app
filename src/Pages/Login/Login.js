import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";
import useCustomContext from "../../Hooks/UseCustomContext";
import { v4 as uuidv4 } from "uuid";

const Login = () => {
  // console.log("Login Component => Intialised");
  const {
    signInWithGoogle,
    user,
    signInToAccount,
    dispatchToast,
    loginAsGuest,
  } = useCustomContext();
  // console.log("Context API", useCustomContext());
  const [error, setError] = useState({ state: false, message: null });
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const IS_INVALID = emailAddress === "" || password === "";

  const loginHandler = async (event) => {
    event.preventDefault();
    if (IS_INVALID) {
      setError({ state: true, message: "Check Input Values" });
      return;
    }
    setError({ state: false, message: "" });
    signInToAccount(emailAddress, password)
      .then(() => {
        console.log("SIGN IN to New Account Sucessfully", user);
        dispatchToast({
          type: "ADD_NOTIFICATION",
          payload: {
            id: uuidv4(),
            type: "SUCCESS",
            title: "Login Successfully",
            message: "You are been Logout.Thank You",
          },
        });
      })
      .catch((error) => alert(error));
    setEmailAddress("");
    setPassword("");
  };
  return (
    <>
      {user && <Redirect to="/" />}
      <div className="Login__section">
        <Card className="LoginForm__card">
          <h1 className="LoginForm__brandName">LOGIN</h1>
          <form className="LoginForm" onSubmit={loginHandler}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="text"
              placeholder="Enter Email-Id"
              autoComplete="email"
              value={emailAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
            />
            <label htmlFor="pass">Password</label>
            <input
              id="pass"
              type="password"
              placeholder="Enter Password"
              autoComplete="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {/* <Link to="/cart-section">LINK BTN</Link> */}
            <button type="submit"> Login</button>
            <p>
              Not a member?
              <Link className="btn-redirect" to={"/signup"}>
                Signup
              </Link>
            </p>
            {error.state && <div className="errorMsg">{error.message}</div>}
          </form>
          <button
            className="btn-Google"
            style={{ marginBottom: "1rem" }}
            onClick={() => {
              loginAsGuest();
              dispatchToast({
                type: "ADD_NOTIFICATION",
                payload: {
                  id: uuidv4(),
                  type: "SUCCESS",
                  title: "Login Successfully Guest",
                  message: "You are been Login.Thank You",
                },
              });
            }}
          >
            <img src="/images/user.svg" alt="user-logo" />
            Login as GuestUser
          </button>
          <button
            className="btn-Google"
            onClick={() => {
              signInWithGoogle()
                .then(({ user }) => {
                  console.log("USER SIGN-In GOOGLE ", user);
                  // history.push("./cart-section");
                  dispatchToast({
                    type: "ADD_NOTIFICATION",
                    payload: {
                      id: uuidv4(),
                      type: "SUCCESS",
                      title: "Login Successfully",
                      message: "You are been Login.Thank You",
                    },
                  });
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

export default Login;
