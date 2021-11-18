import "./PersonalInfo.css";
import React from "react";
import useCustomContext from "../../Hooks/UseCustomContext";
// import { auth } from "../../Config/Firebase-Init";
// import { updateProfile } from "@firebase/auth";
import Modal from "../UI/Modal/Modal";
import { useHistory } from "react-router";

const PersonalInfo = (props) => {
  const { user, userAddress, dispatchAddress } = useCustomContext();
  const [addressInput, setAddressInput] = React.useState("");
  const [addressModal, setAddressModal] = React.useState(false);
  const history = useHistory();
  console.log("Address Input => ", addressInput);

  const showAddressModal = () => {
    setAddressModal(true);
  };
  const hideAddressModal = () => {
    setAddressModal(false);
  };

  return (
    <>
      {addressModal && (
        <Modal onHideCart={hideAddressModal}>
          <div className="Address__Modal">
            {userAddress !== "" && (
              <div className="previous__address">
                <h6>Previous Address :- </h6>
                <hr />
                {userAddress}
              </div>
            )}
            <label htmlFor="input_address">Enter Address</label>
            <span
              style={{
                color: "rgba(0,0,0,0.5)",
              }}
            >
              *(Address should be atleast of 10 characters)
            </span>
            <textarea
              id="input_address"
              type="text"
              value={addressInput}
              onChange={(event) => {
                setAddressInput(event.target.value);
              }}
            />
            <div className="modal__btns">
              <button
                onClick={() => {
                  hideAddressModal();
                  setAddressInput("");
                }}
              >
                Cancel
              </button>
              <button
                disabled={addressInput?.trim().length <= 10 ? true : false}
                onClick={(event) => {
                  dispatchAddress({
                    type: "ADD_ADDRESS",
                    payload: addressInput.trim(),
                  });
                  setAddressInput("");
                  hideAddressModal();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
      <h2>Personal Info</h2>
      <section className="PersonalInfo__section">
        <h4>Name:- {user?.displayName}</h4>
        <h4>Email Id: {user?.email}</h4>
        <h4>
          Address:-
          {userAddress && <span>{userAddress}</span>}
        </h4>
        <div className="PersonalInfo__section__btns">
          <button onClick={showAddressModal}>
            {userAddress ? "Change Address" : "Add Address"}
          </button>
          {props.disabledOrderBtn && (
            <button
              onClick={() => {
                history.push("/order-history");
              }}
            >
              order history
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default PersonalInfo;
