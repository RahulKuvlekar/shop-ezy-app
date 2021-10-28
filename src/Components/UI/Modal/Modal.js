import cssClasses from "./Modal.module.css";
import ReactDOM from "react-dom";
import React from "react";
 
const Backdrop = (props) => {
  return (
    <div className={cssClasses.backdrop} onClick={props.onClick}>
      {props.children}
    </div>
  );
};
const Overlay = (props) => {
  return (
    <div className={cssClasses.overlay}>
      <div className={cssClasses.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onHideCart} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <Overlay>{props.children}</Overlay>,
        document.getElementById("overlay")
      )}
    </React.Fragment>
  );
};

export default Modal;
