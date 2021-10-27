import React, { createContext, useReducer, useState, useEffect } from "react";
import CartReducer from "./CartReducer";
import faker from "faker";
import FilterReducer from "./FilterReducer";
import db from "../Config/Firebase-Init";

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
  const [products, setProducts] = useState([]);

  // const products = [...Array(20)].map(() => ({
  //   id: faker.datatype.uuid(),
  //   name: faker.commerce.productName(),
  //   price: Number(faker.commerce.price()),
  //   image: faker.random.image(),
  //   inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
  //   fastDelivery: faker.datatype.boolean(),
  //   ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  // }));

  const fetchProducts = () => {
    console.log("FetchProducts");
    db.collection("shop").onSnapshot((snapshot) =>
      setProducts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      )
    );
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const [cart, dispatchCart] = useReducer(CartReducer, {
    cartList: [],
  });

  const [filter, dispatchFilter] = useReducer(FilterReducer, {
    sortBy: null,
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  // console.log("PRODUCTS ====> \n", firebaseProducts);

  const DEFAULT_VALUE = {
    user: null,
    products: products,
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
