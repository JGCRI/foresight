import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/img/PNNL_CENTER_White.png";
import { RiDashboardFill } from "react-icons/ri";
import { AiFillGithub, AiFillHome } from "react-icons/ai";
import { BsFillInfoCircleFill, BsFillDatabaseFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { MdFileUpload, MdHelp } from "react-icons/md";
import { connect } from "react-redux";
import { setDashDate, setDashReg, setDashSubs, setDataset } from "./Store";
import './css/Navigation.css';
import { clearHash, updateHash } from "./sharing/DashboardUrl";

/**
 * Navigation component. Used for testing different maps
 * under the Experiments page. Currently unused.
 * 
 * @param {object} props - The component props.
 * @param {string} props.dataset - State indicating the current dataset.
 * @param {string[]} props.datasets - State indicating all datasets.
 * @param {(dataset: any) => any} props.updateDataset - Updates the current dataset.
 * @param {(date: number) => any} props.dashDate - Updates the current dashboard date.
 * @param {(reg: string) => any} props.dashReg - Updates the current dashboard region.
 * @param {(sub: string) => any} props.dashSubs - Updates the current dashboard subcategory.
 * @returns {ReactElement} The rendered component.
 */
function Navigation({ dataset, datasets, updateDataset, dashDate, dashReg, dashSubs }) {
  const handleDatasetChange = (selectedDataset) => {
    //console.log("Selected dataset:", selectedDataset);
    // Call updateDataset to dispatch the action
    updateDataset(selectedDataset.data);
    dashDate(2100);
    dashReg("Global");
    dashSubs("Aggregate of Subsectors");
    clearHash();
    updateHash("dataset", selectedDataset.data);
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

  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setExpanded(false);
  };

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
          <img title="Home" className="logo" src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto nav-left">
            <NavLink className="nav-link" to="/" onClick={handleClose}>
              <div img title="Home" className="nav-icon">
                <AiFillHome />
              </div>
            </NavLink>
            <NavDropdown
              className="nav-link"
              title={
                <span>
                  <div title="Change Dataset" className="nav-icon nav-icon-drop">
                    <BsFillDatabaseFill />
                  </div>
                  <span title="Change Dataset" className="nav-dropdown-title">{`${dataset || "None"
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
              to="/uploaddata"
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

/**
 * Maps the state from the Redux store to the component props.
 * 
 * @param {object} state - The current state.
 * @returns {object} The mapped props.
 */
const mapStateToProps = (state) => {
  return {
    dataset: state.dataset,
    datasets: state.datasetList,
  };
};

/**
 * Maps the dispatch functions to the component props.
 * 
 * @param {Function} dispatch - The dispatch function.
 * @returns {object} The mapped props.
 */
function mapDispatchToProps(dispatch) {
  return {
    updateDataset: (dataset) => dispatch(setDataset(dataset)),
    dashDate: (date) => dispatch(setDashDate(date)),
    dashReg: (reg) => dispatch(setDashReg(reg)),
    dashSubs: (sub) => dispatch(setDashSubs(sub)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
