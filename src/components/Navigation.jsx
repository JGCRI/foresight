import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/img/PNNL_CENTER_White.png";
import { FaGlobeAmericas } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { AiFillGithub, AiFillHome, AiFillExperiment } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { MdHelp } from "react-icons/md";


function Navigation() {

  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setExpanded(false);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="bartop" expanded={expanded}>
      <Container fluid>
        <Navbar.Brand href="/"><img className="logo" src={logo} alt="Logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto nav-left">
          <NavLink className="nav-link" to="/" onClick={handleClose}>
              <div className="nav-icon"><AiFillHome /></div>
              </NavLink>
            <NavLink className="nav-link" to="/dashboard" onClick={handleClose}>
              <div className="nav-icon"><RiDashboardFill /></div> Dashboard
              </NavLink>
              <NavLink className="nav-link" to="/explore" onClick={handleClose}>
              <div className="nav-icon"><AiFillExperiment /></div>Experiment
            </NavLink>
            <NavLink className="nav-link" to="/world" onClick={handleClose}>
              <div className="nav-icon"><FaGlobeAmericas /></div>World
            </NavLink>
            </Nav>
            <Nav className="ms-auto nav-right">
              <NavLink className="nav-link" to="/about" onClick={handleClose}>
                <div className="nav-icon"><BsFillInfoCircleFill /></div>About
              </NavLink>
              <NavLink className="nav-link" to="/team" onClick={handleClose}>
                <div className="nav-icon"><RiTeamFill /></div>Team
              </NavLink>
              <NavLink className="nav-link" to="/help" onClick={handleClose}>
                <div className="nav-icon"><MdHelp /></div>Help
              </NavLink>
              <a className="nav-link" href="https://github.com/JGCRI/foresight" target="_blank" rel="noreferrer" onClick={handleClose}>
                <div className="nav-icon"><AiFillGithub /></div>
              </a>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;