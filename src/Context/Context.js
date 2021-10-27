import React, { createContext, useReducer } from "react";
import CartReducer from "./CartReducer";
import faker from "faker";
import FilterReducer from "./FilterReducer";

export const Context = createContext({
  user: null,
  products: [],
  cart: [],
  dispatchCart: () => {},
  sortBy: null,
  byStock: false,
  byFastDelivery: false,
  byRating: 0,
  searchQuery: "",
  dispatchFilter: () => {},
});
faker.seed(89);

const ContextProvider = (props) => {
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
    image: faker.random.image(),
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));

  const [cart, dispatchCart] = useReducer(CartReducer, {
    cartList: [],
    productList: products,
  });

  const [filter, dispatchFilter] = useReducer(FilterReducer, {
    sortBy: null,
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  //console.log("PRODUCTS ====> \n", products);

  const DEFAULT_VALUE = {
    user: null,
    products: cart.productList,
    cart: cart.cartList,
    dispatchCart: dispatchCart,
    dispatchFilter: dispatchFilter,
    sortBy: filter.sortBy,
    byStock: filter.byStock,
    byFastDelivery: filter.byFastDelivery,
    byRating: filter.byRating,
    searchQuery: filter.searchQuery,
  };

  return (
    <Context.Provider value={DEFAULT_VALUE}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
