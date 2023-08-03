import React, { useState } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from 'react-redux';
import DashboardScenerioSelector from "./DashboardScenerioSelector";
import DashboardGuage from "../charts/DashboardGuage"

function DashboardScenerioRows({ scenarios, openScenerio, guageList, openGuage }) {
    const list = scenarios;

    const cols = guageList.map((guage, index) => (
        <Col className = {guage.title === openGuage ? "guageOpen" : "guageDefault"} xs="auto" sm="auto" md="auto" lg="auto" xl="auto" key = {index}>
            <DashboardGuage
                title={guage.title}
                num={guageList.length}
            />
        </Col>
    ))

    const rows = openScenerio.map((open, index) => (
        <div key={index}>
            <Row className="dashboard-data-row">
                <Col className = "dashboard-scenerio-selector" xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                    <DashboardScenerioSelector
                        test={list}
                        current={open.title}
                        curIndex={index}
                        curOpen={openScenerio}
                    />
                </Col>
                {cols}
            </Row>
        </div>
    ))

    return (
        rows
    );
}

function mapStateToProps(state) {
    return {
        openScenerio: state.scenerios,
        guageList: state.guages,
        openGuage: state.currentGuage,
    };
}

export default connect(mapStateToProps)(DashboardScenerioRows);