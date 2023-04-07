import React from "react";
import { connect } from 'react-redux';
// In Sidenav.js
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import HomeIcon from "@mui/icons-material/Home";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

function Sidebar({open, toggleOpen}) {

  return (
      <div className={open ? "sidenav" : "sidenavClosed"}>
        <button className={"menuBtn"} onClick={toggleOpen}>
          {open ? (
            <KeyboardDoubleArrowLeftIcon />
          ) : (
            <KeyboardDoubleArrowRightIcon />
          )}
        </button>
        <NavLink className="sideitem" to="/dashboard">
          <HomeIcon />
          <span className={"linkText"}>{"Summary"}</span>
        </NavLink>
        <NavLink className="sideitem" to="/sector">
          <AcUnitIcon/>
          <span className={"linkText"}>{"Energy"}</span>
        </NavLink>
        <NavLink className="sideitem" to="/sector">
          <BarChartIcon/>
          <span className={"linkText"}>{"Water"}</span>
        </NavLink>
        <NavLink className="sideitem" to="/sector">
          <SettingsIcon/>
          <span className={"linkText"}>{"Land"}</span>
        </NavLink>
      </div>
  );
}

function mapStateToProps(state) {
  return {
    open: state.open,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleOpen: () => dispatch({ type: 'toggleOpen' })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
