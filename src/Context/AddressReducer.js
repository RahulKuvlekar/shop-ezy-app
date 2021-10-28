const AddressReducer = (prevState, action) => {
  switch (action.type) {
    case "ADD_ADDRESS":
    //   console.log("reducer ", prevState, " Payload => ");
      return {
        ...prevState,
        userAddress: action.payload,
      };
    case "CLEAR_ADDRESS":
      // console.log("reducer ", prevState, " Payload => ");
      return {
        ...prevState,
        userAddress: "",
      };

    default:
      return prevState;
  }
};

export default AddressReducer;
