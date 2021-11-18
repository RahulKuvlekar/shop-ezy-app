const toastReducer = (prevState, action) => {
  // console.log("previous wali state => ", prevState);
  switch (action.type) {
    case "ADD_NOTIFICATION":
      console.log("ADD_NOTIFICATION", prevState, action.payload);
      return [...prevState, action.payload];

    case "DELETE_NOTIFICATION":
      // console.log(prevState);
      // console.log("DELETE_NOTIFICATION", action.payload);
      if (prevState.length <= 0) {
        // console.log("DELETE_NOTIFICATION IF BLOCK");
        return prevState;
      }
      // console.log("DELETE_NOTIFICATION After IF BLOCK");
      return prevState.filter((toast) => toast.id !== action.payload);

    default:
      return prevState;
  }
};

export default toastReducer;
