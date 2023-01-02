import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logoText from "../assets/img/logo_pnnl_white_cropped_text.png";
import logo from "../assets/img/logo_pnnl_white_cropped.png";

function Navigation() {
  return (
    <Navbar fixed="top" bg="dark" variant="dark" expand="lg" className="bartop">
      <Container>
        <Navbar.Brand to="/">
          <img className="logo-text" src={logoText} alt="Logo" />
          <img className="logo" src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/dashboard">
              Dashboard
            </NavLink>
            <NavLink className="nav-link" to="/explore">
              Explore
            </NavLink>
            <NavLink className="nav-link" to="/world">
              Globe
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
