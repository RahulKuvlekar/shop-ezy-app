import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
// import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
// import Button from "react-bootstrap/Button";
import { Badge, Container } from "react-bootstrap";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md" style={{ height: "5rem" }}>
        <Container>
          <Navbar.Brand>
            <Link to="/home-body">
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
            />
          </Navbar.Text>
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <MdShoppingCart fontSize="2rem" />
                <Badge bg="success">10</Badge>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/cart-section">action</Dropdown.Item>

                <Dropdown.Item href="/cart-section">go to cart</Dropdown.Item>

                <Dropdown.Item href="/">go to home</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
