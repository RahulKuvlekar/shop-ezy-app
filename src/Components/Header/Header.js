import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
// import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { Badge, Container, Button } from "react-bootstrap";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import useCustomContext from "../../Hooks/UseCustomContext";
import { AiFillDelete } from "react-icons/ai";
import "./Header.css";

const Header = () => {
  const { cart, dispatchCart, dispatchFilter, searchQuery } =
    useCustomContext();
  //   console.log(searchQuery);
  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        style={{
          height: "5rem",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          zIndex: "999",
        }}
      >
        <Container>
          <Navbar.Brand className="d-flex justify-content-center align-content-center">
            <Link to="/">
              <img
                style={{ width: "3rem" }}
                src="/Images/NavBrand.png"
                alt="NavBrand"
              />
              Shop Ezy
            </Link>
          </Navbar.Brand>
          <Navbar.Text className="navbar__search">
            <FormControl
              style={{ width: 500 }}
              type="search"
              placeholder="Search a product..."
              className="m-auto"
              aria-label="Search"
              value={searchQuery}
              onChange={(event) => {
                dispatchFilter({
                  type: "FILTER_BY_SEARCH",
                  payload: event.target.value,
                });
              }}
            />
          </Navbar.Text>
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <MdShoppingCart fontSize="2rem" />
                {cart?.length > 0 && <Badge bg="danger">{cart?.length}</Badge>}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ minWidth: 350 }}>
                {cart.length > 0 ? (
                  <>
                    {cart.map((product) => (
                      <span className="cartitem" key={product.id}>
                        <img
                          src={product.image}
                          className="cartItem__img"
                          alt={product.name}
                        />
                        <div className="cartItem__details">
                          <span>{product.name}</span>
                          <span>₹ {product.price}</span>
                        </div>
                        <AiFillDelete
                          fontSize="20px"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            dispatchCart({
                              type: "REMOVE_FROM_CART",
                              payload: product,
                            })
                          }
                        />
                      </span>
                    ))}

                    <Link to="/cart-section">go to cart</Link>

                    <Link to="/">go to home</Link>
                    <Link to="/cart-section">
                      <Button style={{ width: "95%", margin: "0 10px" }}>
                        Go To Cart
                      </Button>
                    </Link>
                  </>
                ) : (
                  <span style={{ padding: 10 }}>Cart is Empty!</span>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
