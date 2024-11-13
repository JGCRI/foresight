import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/img/PNNL_CENTER_White.png";
import { RiDashboardFill } from "react-icons/ri";
import { AiFillGithub, AiFillHome, AiFillExperiment } from "react-icons/ai";
import { BsFillInfoCircleFill, BsFillDatabaseFill } from "react-icons/bs";
import { MdFileUpload } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { MdHelp } from "react-icons/md";
import { connect } from "react-redux";
import { setDataset } from "./Store";
import './css/Navigation.css';

function Navigation({ dataset, datasets, updateDataset }) {
  const handleDatasetChange = (selectedDataset) => {
    console.log("Selected dataset:", selectedDataset);
    // Call updateDataset to dispatch the action
    updateDataset(selectedDataset.data);
  };

  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setExpanded(false);
  };

  let datasetList = [];
  //console.log(datasets)
  for (let i = 0; i < datasets.length; i++) {
    let data = datasets.at(i);
    datasetList.push(
      <NavDropdown.Item
        onClick={() => handleDatasetChange({ data })}
      >
        {data}
      </NavDropdown.Item>
    )
  }

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="bartop"
      expanded={expanded}
    >
      <Container fluid>
        <Navbar.Brand href="/">
          <img className="logo" src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto nav-left">
            <NavLink className="nav-link" to="/" onClick={handleClose}>
              <div className="nav-icon">
                <AiFillHome />
              </div>
            </NavLink>
            <NavDropdown
              className="nav-link"
              title={
                <span>
                  <div className="nav-icon nav-icon-drop">
                    <BsFillDatabaseFill />
                  </div>
                  <span className="nav-dropdown-title">{`${dataset || "None"
                    }`}</span>
                </span>
              }
              id="dataset-dropdown"
            >
              {datasetList}
            </NavDropdown>
            <NavLink className="nav-link" to="/dashboard" onClick={handleClose}>
              <div className="nav-icon">
                <RiDashboardFill />
              </div>{" "}
              Dashboard
            </NavLink>
            <NavLink
              className="nav-link"
              to="/charts"
              onClick={handleClose}
            >
              <div className="nav-icon">
                <AiFillExperiment />
              </div>
              Experiment
            </NavLink>
            <NavLink
              className="nav-link"
              to="/dataupload"
              onClick={handleClose}
            >
              <div className="nav-icon">
                <MdFileUpload />
              </div>
              Upload Data
            </NavLink>
          </Nav>
          <Nav className="ms-auto nav-right">
            <NavLink className="nav-link" to="/about" onClick={handleClose}>
              <div className="nav-icon">
                <BsFillInfoCircleFill />
              </div>
              About
            </NavLink>
            <NavLink className="nav-link" to="/team" onClick={handleClose}>
              <div className="nav-icon">
                <RiTeamFill />
              </div>
              Team
            </NavLink>
            <NavLink className="nav-link" to="/help" onClick={handleClose}>
              <div className="nav-icon">
                <MdHelp />
              </div>
              Help
            </NavLink>
            <a
              className="nav-link"
              href="https://github.com/JGCRI/foresight"
              target="_blank"
              rel="noreferrer"
              onClick={handleClose}
            >
              <div className="nav-icon">
                <AiFillGithub />
              </div>
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const mapStateToProps = (state) => {
  return {
    dataset: state.dataset,
    datasets: state.datasets,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    updateDataset: (dataset) => dispatch(setDataset(dataset)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
