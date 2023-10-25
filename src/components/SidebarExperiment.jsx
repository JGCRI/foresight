import React from "react";
import { connect } from 'react-redux';
// In Sidenav.js
import { NavLink } from "react-router-dom";
import { AiFillCaretLeft,AiFillCaretRight } from "react-icons/ai";
import { FaMapMarkedAlt, FaGlobeAmericas} from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs"


function SidebarExperiment({open, toggleOpen}) {

  return (
      <div className={open ? "sidenav" : "sidenavClosed"}>
        <button className={"menuBtn"} onClick={toggleOpen}>
          {open ? (
            <AiFillCaretLeft />
          ) : (
            <AiFillCaretRight />
          )}
        </button>
        <NavLink className="sideitem" to="/charts">
          <BsBarChartFill />
          <span className={`linkText ${!open ? "collapsed" : ""}`}>{"Charts"}</span>
        </NavLink>
        <NavLink className="sideitem" to="/maps">
          <FaMapMarkedAlt />
          <span className={`linkText ${!open ? "collapsed" : ""}`}>{"Maps"}</span>
        </NavLink>
        <NavLink className="sideitem" to="/globes">
          <FaGlobeAmericas/>
          <span className={`linkText ${!open ? "collapsed" : ""}`}>{"Globes"}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(SidebarExperiment);
