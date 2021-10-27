import React from "react";
import { Card, Button } from "react-bootstrap";
import "./SingleProduct.css";
import Rating from "../Rating/Rating";
import useCustomContext from "../../Hooks/UseCustomContext";

const SingleProduct = ({ product }) => {
  //   console.log(useCustomContext(), "HOOKS");
  const { cart, dispatchCart } = useCustomContext();
  return (
    <Card className="singleProduct">
      <Card.Img variant="top" src={product.image} alt={product.name} />
      <Card.Body className="singleProduct__body">
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="singleProduct__info">
          <span>₹{product.price}</span>
          <br />
          <span>
            {product.fastDelivery ? "Fast Delivery" : "4 days Delivery "}
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