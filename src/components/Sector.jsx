import React from "react";
import { Container } from "react-bootstrap";
import Bar from "./charts/Bar";
import AreaBump from "./charts/AreaBump";
import Sidebar from "./Sidebar";
import { connect } from 'react-redux';

  // <div className={open ? "dashboard" : "dashboardClosed"}></div>

function Sector({open, toggleOpen}) {
  const dataBar = [
    {
      country: "AD",
      "param 1": 100,
      "param 1Color": "hsl(154, 70%, 50%)",
      "param 2": 593,
      "param 2Color": "hsl(304, 70%, 50%)",
      "param 3": 10,
      "param 3Color": "hsl(222, 70%, 50%)",
      "param 4": 754,
      "param 4Color": "hsl(241, 70%, 50%)",
      "param 5": 28,
      "param 5Color": "hsl(331, 70%, 50%)",
      "param 6": 39,
      "param 6Color": "hsl(259, 70%, 50%)",
    },
    {
      country: "AE",
      "param 1": 16,
      "param 1Color": "hsl(33, 70%, 50%)",
      "param 2": 206,
      "param 2Color": "hsl(70, 70%, 50%)",
      "param 3": 109,
      "param 3Color": "hsl(348, 70%, 50%)",
      "param 4": 38,
      "param 4Color": "hsl(191, 70%, 50%)",
      "param 5": 43,
      "param 5Color": "hsl(262, 70%, 50%)",
      "param 6": 34,
      "param 6Color": "hsl(118, 70%, 50%)",
    },
    {
      country: "AF",
      "param 1": 523,
      "param 1Color": "hsl(17, 70%, 50%)",
      "param 2": 14,
      "param 2Color": "hsl(122, 70%, 50%)",
      "param 3": 72,
      "param 3Color": "hsl(35, 70%, 50%)",
      "param 4": 441,
      "param 4Color": "hsl(102, 70%, 50%)",
      "param 5": 93,
      "param 5Color": "hsl(191, 70%, 50%)",
      "param 6": 810,
      "param 6Color": "hsl(183, 70%, 50%)",
    },
  ];

  const dataAreaBump = [
    {
      id: "JavaScript",
      data: [
        {
          x: 2000,
          y: 15,
        },
        {
          x: 2001,
          y: 10,
        },
        {
          x: 2002,
          y: 27,
        },
        {
          x: 2003,
          y: 26,
        },
        {
          x: 2004,
          y: 14,
        },
        {
          x: 2005,
          y: 11,
        },
      ],
    },
    {
      id: "ReasonML",
      data: [
        {
          x: 2000,
          y: 16,
        },
        {
          x: 2001,
          y: 13,
        },
        {
          x: 2002,
          y: 30,
        },
        {
          x: 2003,
          y: 28,
        },
        {
          x: 2004,
          y: 30,
        },
        {
          x: 2005,
          y: 28,
        },
      ],
    },
    {
      id: "TypeScript",
      data: [
        {
          x: 2000,
          y: 25,
        },
        {
          x: 2001,
          y: 17,
        },
        {
          x: 2002,
          y: 24,
        },
        {
          x: 2003,
          y: 26,
        },
        {
          x: 2004,
          y: 16,
        },
        {
          x: 2005,
          y: 16,
        },
      ],
    },
    {
      id: "Elm",
      data: [
        {
          x: 2000,
          y: 11,
        },
        {
          x: 2001,
          y: 29,
        },
        {
          x: 2002,
          y: 10,
        },
        {
          x: 2003,
          y: 24,
        },
        {
          x: 2004,
          y: 16,
        },
        {
          x: 2005,
          y: 19,
        },
      ],
    },
    {
      id: "CoffeeScript",
      data: [
        {
          x: 2000,
          y: 29,
        },
        {
          x: 2001,
          y: 30,
        },
        {
          x: 2002,
          y: 11,
        },
        {
          x: 2003,
          y: 19,
        },
        {
          x: 2004,
          y: 10,
        },
        {
          x: 2005,
          y: 11,
        },
      ],
    },
  ];

  return (
    <div>
      <Sidebar />
      <div className={open ? "dashboard" : "dashboardClosed"}>
        <Container fluid>
              <div className="bar chart">
                {!dataBar ? "Loading..." : <Bar data={dataBar} />}
              </div>
              <div className="areabump chart">
                {!dataAreaBump ? (
                  "Loading..."
                ) : (
                  <AreaBump data={dataAreaBump} />
                )}
              </div>
        </Container>
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
    toggleOpen: () => dispatch({ type: 'toggleOpen' })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sector);
