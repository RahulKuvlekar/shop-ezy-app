import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Dropdown } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { Badge, Container, Button } from "react-bootstrap";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import useCustomContext from "../../Hooks/UseCustomContext";
import { AiFillDelete } from "react-icons/ai";
import "./Header.css";
import { useHistory, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Header = () => {
  const {
    cart,
    dispatchCart,
    dispatchFilter,
    searchQuery,
    signOutUser,
    user,
    dispatchToast,
  } = useCustomContext();
  const history = useHistory();
  let location = useLocation();
  //   console.log(searchQuery);
  // console.log(location, "Pathname locatiin");
  // console.log(location.pathname.includes("login"));

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
          display: `${
            location.pathname.includes("login") ||
            location.pathname.includes("signup")
              ? "none"
              : "unset"
          }`,
        }}
      >
        <Container>
          <Navbar.Brand className="d-flex justify-content-center align-content-center">
            <Link to="/" className="shopName">
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
            <Dropdown align="end" autoClose={true}>
              <Dropdown.Toggle
                className="avatar_toggle"
                style={{
                  padding: "0",
                  margin: "0",
                  display: "flex",
                  flexFlow: "column wrap",
                  alignItems: "center",
                }}
                variant="dark"
                // id="dropdown-basic"
              >
                <img
                  style={{ width: "3rem", height: "3rem", borderRadius: "50%" }}
                  src={`${
                    user?.photoURL ? user?.photoURL : "/Images/user.svg"
                  }`}
                  alt="avatar"
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {!user && (
                  <>
                    <Dropdown.Item
                      style={{ fontWeight: "800", opacity: "0.8" }}
                      onClick={() => history.push("/login")}
                    >
                      Login
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ fontWeight: "800", opacity: "0.8" }}
                      onClick={() => history.push("/signup")}
                    >
                      Create New Account
                    </Dropdown.Item>
                  </>
                )}
                {/* <Link to="/login">Login</Link> */}
                {user && (
                  <>
                    <Dropdown.Item
                      className="no-btn"
                      style={{ fontWeight: "800", opacity: "0.8" }}
                    >
                      <span style={{ opacity: "0.8" }}>Welcome,</span>{" "}
                      {user?.displayName}
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ fontWeight: "800", opacity: "0.8" }}
                      onClick={() => {
                        history.push("/");
                      }}
                    >
                      Home
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ fontWeight: "800", opacity: "0.8" }}
                      onClick={() => {
                        history.push("/order-history");
                      }}
                    >
                      My Orders
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ fontWeight: "800", opacity: "0.8" }}
                      onClick={() => {
                        signOutUser()
                          .then(() => {
                            console.log("SIGNOUT");
                            history.push("/");
                            dispatchToast({
                              type: "ADD_NOTIFICATION",
                              payload: {
                                id: uuidv4(),
                                type: "SUCCESS",
                                title: "Logout Successfully",
                                message: "You are been Logout.Thank You",
                              },
                            });
                          })
                          .catch((error) => alert(error));
                      }}
                    >
                      LogOut
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>

          <Nav>
            <Dropdown align="end" autoClose={true}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <MdShoppingCart fontSize="2rem" />
                {cart?.length > 0 && <Badge bg="danger">{cart?.length}</Badge>}
              </Dropdown.Toggle>

              <Dropdown.Menu
                style={{
                  minWidth: 350,
                  maxHeight: 500,
                  overflowY: "scroll",
                  overflowX: "hidden",
                  paddingBottom: "0",
                }}
              >
                {cart.length > 0 ? (
                  <>
                    {cart.map((product, idx) => (
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

                    <Link
                      to="/cart-section"
                      style={{
                        backgroundColor: "white",
                      }}
                    >
                      <Button
                        style={{
                          width: "95%",
                          margin: "0 10px",
                          position: "sticky",
                          bottom: 0,
                          left: 0,
                          fontWeight: "900",
                        }}
                      >
                        Go To Cart
                      </Button>
                    </Link>
                  </>
                ) : (
                  <span
                    style={{ padding: 10, fontWeight: "800", color: "red" }}
                  >
                    Cart is Empty!
                  </span>
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
