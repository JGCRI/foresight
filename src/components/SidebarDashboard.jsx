import React from "react";
import { connect } from 'react-redux';
// In Sidenav.js
import { NavLink } from "react-router-dom";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { MdElectricBolt } from "react-icons/md";
import { GiWaterDrop } from "react-icons/gi";
import { CiWheat } from "react-icons/ci"
import { setOpen } from "./Store";


function SidebarDashboard({ open, toggleOpen, setOpen }) {
  if (open === 2) {
    if (window.innerWidth < 700)
      setOpen(0);
    else
      setOpen(1);
  }
  return (
    <div className={open ? "sidenav" : "sidenavClosed"}>
      <button className={"menuBtn"} onClick={toggleOpen}>
        {open ? (
          <AiFillCaretLeft />
        ) : (
          <AiFillCaretRight />
        )}
      </button>
      {
        (open) ? (
          <div className="sideitem">
            (Subpages Coming Soon!)
          </div>
        ) : (<div />)
      }
      <NavLink className="sideitem" >
        <RiDashboardFill />
        <span className={`linkText ${!open ? "collapsed" : ""}`}>{"Dashboard"}</span>
      </NavLink>
      <div className="sideitem" >
        <MdElectricBolt />
        <span className={`linkText ${!open ? "collapsed" : ""}`}>{"Energy"}</span>
      </div>
      <div className="sideitem" >
        <GiWaterDrop />
        <span className={`linkText ${!open ? "collapsed" : ""}`}>{"Water"}</span>
      </div>
      <div className="sideitem" >
        <CiWheat />
        <span className={`linkText ${!open ? "collapsed" : ""}`}>{"Land"}</span>
      </div>
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
    toggleOpen: () => dispatch({ type: 'toggleOpen' }),
    setOpen: (opened) => dispatch(setOpen(opened))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarDashboard);
