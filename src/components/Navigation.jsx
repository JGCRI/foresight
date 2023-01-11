import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logoText from "../assets/img/logo_pnnl_white_cropped_text.png";
import logo from "../assets/img/logo_pnnl_white_cropped.png";
import {useState} from "react";

function Navigation() {

  const [expanded, setExpanded] = useState(false);
  
  return (
    <Navbar expanded={expanded} fixed="top" bg="dark" variant="dark" expand="lg" className="bartop">
      <Container>
        <Navbar.Brand to="/">
          <img className="logo-text" src={logoText} alt="Logo" />
          <img className="logo" src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink onClick={() => setExpanded(false)} className="nav-link" to="/foresight">
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
            <NavLink onClick={() => setExpanded(false)} className="nav-link" to="/experiment">
              Experiment
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
