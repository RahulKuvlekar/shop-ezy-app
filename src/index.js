import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ContextProvider from "./Context/Context";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
