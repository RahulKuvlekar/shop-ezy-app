import React from "react";
import { ListGroup, Row, Col, Image, Form, Button } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import useCustomContext from "../../Hooks/UseCustomContext";
import Rating from "../Rating/Rating";
import "./CartSection.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import Modal from "../UI/Modal/Modal";
import db from "../../Config/Firebase-Init";
import firebase from "@firebase/app-compat";
import { v4 as uuidv4 } from "uuid";

const CartSection = () => {
  const {
    user,
    cart,
    dispatchCart,
    userAddress,
    dispatchToast,
    dispatchFilter,
  } = useCustomContext();
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [confirmModal, setConfirmModal] = React.useState(false);
  const [paymentMode, setPaymentMode] = React.useState("");
  const [paymentError, setPaymentError] = React.useState(false);
  // console.log(useCustomContext());
  console.log("Payment Mode ==> ", paymentMode);
  const history = useHistory();
  const showConfirmModal = () => {
    setConfirmModal(true);
  };
  const hideConfirmModal = () => {
    setConfirmModal(false);
  };

  const confirmOrder = () => {
    if (paymentMode === "") {
      setPaymentError(true);
      return;
    }
    db.collection("users").doc(user.uid).collection("orders").add({
      items: cart,
      timestamp: firebase.firestore.Timestamp.now(),
      totalAmount,
      userAddress,
      paymentMode,
    });
    history.push("/");
    dispatchCart({
      type: "CLEAR_CART",
    });
    dispatchFilter({
      type: "CLEAR_FILTERS",
    });
    dispatchToast({
      type: "ADD_NOTIFICATION",
      payload: {
        id: uuidv4(),
        type: "SUCCESS",
        title: "Order place Successfully",
        message: "CONGRATZZZ ORDER IS BEEN PLACE ",
      },
    });
    setPaymentError(false);
  };

  React.useEffect(() => {
    setTotalAmount(
      cart?.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
    );
  }, [cart]);

  // console.log("CUSTOM CONTEXT API ", useCustomContext());
  return (
    <>
      {user === null && <Redirect to="/login" />}
      {confirmModal && (
        <Modal onHideCart={hideConfirmModal}>
          <div className="confirmOrder__Modal">
            <div className="order__details">
              <h3>Order details -</h3>
              <hr />
              <div className="order__description">
                {cart?.map((product, idx) => (
                  <span style={{ display: "block" }} key={idx}>
                    {product.name}
                    <br />(<span> ??? {product.price} </span>
                    <strong>X</strong>
                    <span> {product.quantity} </span>)
                  </span>
                ))}
              </div>
              <hr />
            </div>
            <div className="order__paymentMode">
              {" "}
              <h5>
                <label
                  style={{
                    fontWeight: `${paymentError ? "800" : "bold"}`,
                    color: `${paymentError ? "red" : "black"}`,
                  }}
                  htmlFor="paymentMode"
                >
                  Select Payment Mode :
                </label>
                <select
                  name="paymentMode"
                  id="paymentMode"
                  onChange={(event) => {
                    setPaymentMode(event.target.value);
                  }}
                >
                  <option value="">--Please choose an Payment Mode--</option>
                  <option value="COD">COD</option>
                  <option value="Paytm">Paytm</option>
                  <option value="UPID">UPID</option>
                  <option value="Online Banking">Online Banking</option>
                </select>
              </h5>
            </div>
            <h5>TOTAL AMOUNT - ??? {totalAmount}</h5>
            <div className="modal__btns">
              <button onClick={() => hideConfirmModal()}>Cancel</button>
              <button onClick={confirmOrder}>Confirm</button>
            </div>
          </div>
        </Modal>
      )}
      <div
        style={{
          marginTop: "5.5rem",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-between",
        }}
      >
        <div className="cart__container">
          <ListGroup>
            <PersonalInfo disabledOrderBtn={true} />
            {cart.length === 0 && (
              <h1 style={{ width: "100%", textAlign: "center" }}>
                Cart Is Empty
              </h1>
            )}
            {cart.map((product) => (
              <ListGroup.Item key={product.id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={2}>
                    <span>{product.name}</span>
                  </Col>
                  <Col md={2}>??? {product.price}</Col>
                  <Col md={2}>
                    <Rating rating={product.ratings} />
                  </Col>
                  <Col md={2}>
                    <Form.Select
                      value={product.quantity}
                      onChange={(event) =>
                        dispatchCart({
                          type: "CHANGE_CART_QTY",
                          payload: {
                            id: product.id,
                            quantity: Number(event.target.value),
                          },
                        })
                      }
                    >
                      {[...Array(product.inStock)].map((data, idx) => (
                        <option key={idx + 1}>{idx + 1}</option>
                      ))}
                    </Form.Select>
                    {/* <Form.Control
                    as="select"
                    value={product.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: product.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control> */}
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() =>
                        dispatchCart({
                          type: "REMOVE_FROM_CART",
                          payload: product,
                        })
                      }
                    >
                      <AiFillDelete fontSize="20px" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <Link className="goback__btn" to="/">
              {cart.length === 0 ? "Go Back to Home Page" : " Add More Items"}
            </Link>
            <Button
              variant="primary"
              style={{ fontWeight: "800" }}
              onClick={() => {
                if (userAddress.trim() === "") {
                  dispatchToast({
                    type: "ADD_NOTIFICATION",
                    payload: {
                      id: uuidv4(),
                      type: "WARNING",
                      title: "Please Add the Address",
                      message: "Add the Address",
                    },
                  });
                  return;
                }
                showConfirmModal();
              }}
              disabled={cart.length === 0}
            >
              {cart.length === 0 ? "Cart is Empty" : " Confirm Order"}
            </Button>
          </ListGroup>
        </div>
        <div className="cartSidebar__section">
          <h1 className="cartSidebar__title">PRICE DETAILS</h1>
          <hr />
          <span style={{ margin: ".5rem 0" }} className="title">
            Subtotal ({cart.length}) items
          </span>
          {cart.length > 0 && (
            <div className="cartSidebar__priceInfo">
              <hr />
              {cart?.map((product, idx) => (
                <span style={{ display: "block" }} key={idx}>
                  {product.name}
                  <br />(<span> ??? {product.price} </span>
                  <strong>X</strong>
                  <span> {product.quantity} </span>)
                </span>
              ))}
              <hr />
            </div>
          )}
          <span style={{ fontWeight: 700, fontSize: 20 }}>
            Total: ??? {totalAmount}
          </span>
          <br />
        </div>
      </div>
    </>
  );
};

export default CartSection;
