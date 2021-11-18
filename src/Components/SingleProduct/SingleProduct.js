import React from "react";
import { Card, Button } from "react-bootstrap";
import "./SingleProduct.css";
import Rating from "../Rating/Rating";
import useCustomContext from "../../Hooks/UseCustomContext";
import { useHistory } from "react-router";

const SingleProduct = ({ product }) => {
  //   console.log(useCustomContext(), "HOOKS");
  const { cart, dispatchCart } = useCustomContext();
  const history = useHistory();
  return (
    <Card className="singleProduct">
      <div className="singleProduct__img" style={{}}>
        <Card.Img
          style={{
            maxHeight: "100%",
            objectFit: "contain",
          }}
          variant="top"
          src={product.image}
          alt={product.name}
        />
        <button
          className="img-btn btn-orange"
          onClick={() => {
            history.push(`/product/${product.id}`);
          }}
        >
          View Product
        </button>
      </div>
      <Card.Body className="singleProduct__body">
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="singleProduct__info">
          <span style={{ fontWeight: "700" }}>₹{product.price}</span>
          <br />
          <span style={{ opacity: "0.4" }}>
            {product.fastDelivery ? "Fast Delivery" : "Upto 7 days Delivery "}
          </span>
          <br />
          <Rating rating={product.ratings} />
        </Card.Subtitle>

        {cart.some((data) => data.id === product.id) ? (
          <Button
            variant="danger"
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
            onClick={() => {
              dispatchCart({
                type: "ADD_TO_CART",
                payload: product,
              });
              //   console.log("CART ==> ", cart);
              //   console.log("productList ==> ", products);
            }}
          >
            {product?.inStock === 0 ? "Out Of Stcok" : "Add to Cart"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default SingleProduct;
