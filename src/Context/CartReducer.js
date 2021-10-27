const CartReducer = (prevState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // console.log("reducer ", prevState, " Payload => ");
      return {
        ...prevState,
        cartList: [...prevState.cartList, { ...action.payload, quantity: 1 }],
      };
    case "REMOVE_FROM_CART":
      return {
        ...prevState,
        cartList: prevState.cartList.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    case "CHANGE_CART_QTY":
      return {
        ...prevState,
        cartList: prevState.cartList.filter((product) =>
          product.id === action.payload.id
            ? (product.quantity = action.payload.quantity)
            : product.quantity
        ),
      };
    default:
      return prevState;
  }
};

export default CartReducer;
