import React from "react";
import { connect } from 'react-redux';
// In Sidenav.js
import { NavLink } from "react-router-dom";
import { AiFillCaretLeft,AiFillCaretRight } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { MdElectricBolt } from "react-icons/md";
import { GiWaterDrop } from "react-icons/gi";
import { CiWheat } from "react-icons/ci"


function SidebarDashboard({open, toggleOpen}) {
  return (
      <div className={open ? "sidenav" : "sidenavClosed"}>
        <button className={"menuBtn"} onClick={toggleOpen}>
          {open ? (
            <AiFillCaretLeft />
          ) : (
            <AiFillCaretRight />
          )}
        </button>
        <NavLink className="sideitem" to="/dashboard">
          <RiDashboardFill/>
          <span className={`linkText ${!open ? "collapsed" : ""}`}>{"Dashboard"}</span>
        </NavLink>
        <NavLink className="sideitem" to="/energy">
          <MdElectricBolt />
          <span className={`linkText ${!open ? "collapsed" : ""}`}>{"Energy"}</span>
        </NavLink>
        <NavLink className="sideitem" to="/water">
          <GiWaterDrop/>
          <span className={`linkText ${!open ? "collapsed" : ""}`}>{"Water"}</span>
        </NavLink>
        <NavLink className="sideitem" to="/land">
          <CiWheat/>
          <span className={`linkText ${!open ? "collapsed" : ""}`}>{"Land"}</span>
        </NavLink>
        <NavLink className="sideitem" to="/test">
          <CiWheat/>
          <span className={`linkText ${!open ? "collapsed" : ""}`}>{"Test"}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(SidebarDashboard);
