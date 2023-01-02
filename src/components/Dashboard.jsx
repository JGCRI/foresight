import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Bar from "./charts/Bar";
import AreaBump from "./charts/AreaBump";
import Choropleth from "./charts/Choropleth";
import Chord from "./charts/Chord";
import Pie from "./charts/Pie";
import TreeMap from "./charts/TreeMap";
import Funnel from "./charts/Funnel";

function Dashboard() {
  return (
    <div className="dashboard">
      <Container fluid>
        <Row className="row">
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Bar />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <AreaBump />
          </Col>
        </Row>
        <Row className="row">
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Row className="row">
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Chord />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Funnel />
              </Col>
            </Row>
            <Row className="row">
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <TreeMap />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Pie />
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Choropleth />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
