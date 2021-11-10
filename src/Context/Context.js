import React, { createContext, useReducer, useState, useEffect } from "react";
import CartReducer from "./CartReducer";
import faker from "faker";
import FilterReducer from "./FilterReducer";
import AddressReducer from "./AddressReducer";
import db from "../Config/Firebase-Init";
import { auth } from "../Config/Firebase-Init";
import toastReducer from "./toastReducer";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const Context = createContext({
  user: null,
  toast: [],
  userAddress: "",
  products: [],
  cart: [],
  dispatchCart: () => {},
  sortBy: null,
  byStock: false,
  byFastDelivery: false,
  byRating: 0,
  searchQuery: "",
  dispatchToast: () => {},
  dispatchFilter: () => {},
  dispatchAddress: () => {},
  signInWithGoogle: () => Promise,
  signOutUser: () => Promise,
  createNewAccount: () => Promise,
  signInToAccount: () => Promise,
});
faker.seed(89);

const ContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
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

  const [cart, dispatchCart] = useReducer(CartReducer, {
    cartList: [],
  });
  const [address, dispatchAddress] = useReducer(AddressReducer, {
    userAddress: "",
  });

  const [filter, dispatchFilter] = useReducer(FilterReducer, {
    sortBy: null,
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  const [stateToast, dispatchToast] = useReducer(toastReducer, []);
  // console.log("PRODUCTS ====> \n", firebaseProducts);

  const createNewAccount = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const signInToAccount = (email, pass) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const DEFAULT_VALUE = {
    user: currentUser,
    userAddress: address.userAddress,
    products: products,
    cart: cart.cartList,
    toast: stateToast,
    dispatchToast: dispatchToast,
    dispatchCart: dispatchCart,
    dispatchFilter: dispatchFilter,
    dispatchAddress: dispatchAddress,
    sortBy: filter.sortBy,
    byStock: filter.byStock,
    byFastDelivery: filter.byFastDelivery,
    byRating: filter.byRating,
    searchQuery: filter.searchQuery,
    signInWithGoogle,
    signOutUser,
    createNewAccount,
    signInToAccount,
  };

  useEffect(() => {
    fetchProducts();
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      console.log("AUTH CHANGED => ", user);
      if (!user) {
        dispatchAddress({
          type: "CLEAR_ADDRESS",
        });
      }
      return setCurrentUser(user ? user : null);
    });
    return () => unsubscribed();
  }, []);

  return (
    <Context.Provider value={DEFAULT_VALUE}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
