import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/img/PNNL_CENTER_White.png";
import {useState} from "react";

function Navigation() {

  const [expanded, setExpanded] = useState(false);
  
  return (
    <Navbar expanded={expanded} fixed="top" bg="dark" variant="dark" expand="lg" className="bartop">
      <Container>
        <Navbar.Brand to="/">
          <img className="logo" src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink onClick={() => setExpanded(false)} className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink onClick={() => setExpanded(false)} className="nav-link" to="/dashboard">
              Dashboard
            </NavLink>
            <NavLink onClick={() => setExpanded(false)} className="nav-link" to="/explore">
              Explore
            </NavLink>
            <NavLink onClick={() => setExpanded(false)} className="nav-link" to="/world">
              Globe
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
