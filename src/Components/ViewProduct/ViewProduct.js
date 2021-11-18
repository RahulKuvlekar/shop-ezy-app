import React, { useState, useEffect } from "react";
import "./ViewProduct.css";
import { useParams } from "react-router";
import db from "../../Config/Firebase-Init";
import Rating from "../Rating/Rating";
import { Form, Button } from "react-bootstrap";
import useCustomContext from "../../Hooks/UseCustomContext";
import { useHistory } from "react-router";
import ImageLoader from "../../Components/UI/ImageLoader/ImageLoader";

const ViewProduct = () => {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();
  const history = useHistory();
  const { cart, dispatchCart } = useCustomContext();

  // console.log("PRODUCT INFO ==> ", product);
  useEffect(() => {
    setLoading(true);
    db.collection("shop")
      .doc(productId)
      .get()
      .then((data) => setProduct({ ...data.data(), id: data.id }));
    setLoading(false);
    // eslint-disable-next-line
  }, []);
  return (
    <div style={{ margin: "6rem 0 3rem" }}>
      {/* <h1>INDIVIDUAL PRODUCT {productId}</h1> */}
      {loading && <ImageLoader />}
      {!loading && (
        <div className="viewProduct__section">
          <div className="product__general">
            <div className="product__img">
              <img src={product.image} alt="productImg" />
            </div>
            <div className="product__btn">
              {cart.some((data) => data.id === product.id) ? (
                <Button
                  variant="danger"
                  size="lg"
                  style={{
                    fontWeight: "bolder",
                  }}
                  onClick={() => {
                    dispatchCart({
                      type: "REMOVE_FROM_CART",
                      payload: product,
                    });
                    //   console.log("CART ==> ", cart);
                    //   console.log("productList ==> ", products);
                  }}
                >
                  Remove From Cart
                </Button>
              ) : (
                <Button
                  disabled={product?.inStock === 0}
                  size="lg"
                  style={{
                    fontWeight: "bolder",
                  }}
                  onClick={() => {
                    dispatchCart({
                      type: "ADD_TO_CART",
                      payload: product,
                      quantity: quantity,
                    });
                    //   console.log("CART ==> ", cart);
                    //   console.log("productList ==> ", products);
                  }}
                >
                  {product?.inStock === 0 ? "Out Of Stock" : "Add to Cart"}
                </Button>
              )}

              <Button
                disabled={product?.inStock === 0}
                variant="warning"
                className="buyNow-btn"
                style={{
                  backgroundColor: "#ff9f00",
                  color: "white",
                  border: "1px solid #ff9f00",
                  fontWeight: "bolder",
                }}
                size="lg"
                onClick={() => {
                  dispatchCart({
                    type: "CLEAR_CART",
                  });
                  dispatchCart({
                    type: "ADD_TO_CART",
                    payload: product,
                    quantity: quantity,
                  });
                  history.push("/cart-section");
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>
          <div className="product__body">
            <h1>{product.name}</h1>
            <div
              style={{
                margin: ".6rem 0",
              }}
              className="product__discriptn"
            >
              {product.description}
            </div>
            <h3
              style={{
                margin: ".6rem 0",
              }}
            >
              Price - ₹ {product.price}
            </h3>
            <h5
              style={{
                margin: ".6rem 0",
              }}
            >
              Ratings - <Rating rating={product.ratings} />
            </h5>
            <h5
              style={{
                margin: ".6rem 0",
              }}
            >
              Qty -{"   "}
              <Form.Select
                value={product.quantity}
                style={{
                  display: "inline",
                  width: "40%",
                }}
                onChange={(event) => {
                  setQuantity(Number(event.target.value));
                  dispatchCart({
                    type: "CHANGE_CART_QTY",
                    payload: {
                      id: product.id,
                      quantity: Number(event.target.value),
                    },
                  });
                }}
              >
                {[...Array(product.inStock)].map((data, idx) => (
                  <option key={idx + 1}>{idx + 1}</option>
                ))}
              </Form.Select>
            </h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
