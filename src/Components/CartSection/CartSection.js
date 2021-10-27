import React from "react";
import { ListGroup, Row, Col, Image, Form, Button } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import useCustomContext from "../../Hooks/UseCustomContext";
import Rating from "../Rating/Rating";
import "./CartSection.css";
import { Link } from "react-router-dom";

const CartSection = () => {
  const { cart, dispatchCart } = useCustomContext();
  const [totalAmount, setTotalAmount] = React.useState(0);

  React.useEffect(() => {
    setTotalAmount(
      cart?.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
    );
  }, [cart]);
  return (
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
          {cart.length === 0 && (
            <h1 style={{ width: "100%", textAlign: "center" }}>
              Cart Is Empty
            </h1>
          )}
          {cart.map((product) => (
            <ListGroup.Item key={product.id}>
              <Row>
                <Col md={2}>
                  <Image src={product.image} alt={product.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{product.name}</span>
                </Col>
                <Col md={2}>₹ {product.price}</Col>
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
        </ListGroup>
      </div>
      <div className="cartSidebar__section">
        <h1 className="cartSidebar__title">Filter Products</h1>
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
                <br />(<span> ₹ {product.price} </span>
                <strong>X</strong>
                <span> {product.quantity} </span>)
              </span>
            ))}
            <hr />
          </div>
        )}
        <span style={{ fontWeight: 700, fontSize: 20 }}>
          Total: ₹ {totalAmount}
        </span>
        <br />
      </div>
    </div>
  );
};

export default CartSection;
