import "./PersonalInfo.css";
import React from "react";
import useCustomContext from "../../Hooks/UseCustomContext";
// import { auth } from "../../Config/Firebase-Init";
// import { updateProfile } from "@firebase/auth";
import Modal from "../UI/Modal/Modal";

const PersonalInfo = () => {
  const { user, userAddress, dispatchAddress } = useCustomContext();
  const addressInputRef = React.useRef();
  const [addressModal, setAddressModal] = React.useState(false);
  //   console.log(address);

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
            <textarea id="input_address" type="text" ref={addressInputRef} />
            <div className="buttons">
              <button
                onClick={() => {
                  hideAddressModal();
                  addressInputRef.current.value = "";
                }}
              >
                Cancel
              </button>

              <button
                onClick={(event) => {
                  dispatchAddress({
                    type: "ADD_ADDRESS",
                    payload: addressInputRef.current.value.trim(),
                  });
                  addressInputRef.current.value = "";
                  hideAddressModal();
                }}
              >
                confirm
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
        <button onClick={showAddressModal}>
          {userAddress ? "Change Address" : "Add Address"}
        </button>
        <button>order history</button>
      </section>
    </>
  );
};

export default PersonalInfo;
