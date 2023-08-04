import React, { useState } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from 'react-redux';
import DashboardScenerioSelector from "./DashboardScenerioSelector";
import DashboardGuage from "../charts/DashboardGuage"

function DashboardScenerioRows({ scenarios, openScenerio, guageList, openGuage }) {
    const list = scenarios;

    const cols = guageList.map((guage, index) => (
        <div className={guage.title === openGuage ? "guageOpen" : "guageDefault"} xs="auto" sm="auto" md="auto" lg="auto" xl="auto" key={index}>
            <DashboardGuage
                title={guage.title}
                num={guageList.length}
            />
        </div>
    ))

    const rows = openScenerio.map((open, index) => (
        <>
            <div className="dashboard-scenerio-selector">
                <DashboardScenerioSelector
                    test={list}
                    current={open.title}
                    curIndex={index}
                    curOpen={openScenerio}
                    className="dashboard-scenerio-selector"
                />
            </div>
            {cols}
        </>

    ))

    return (
        <div className="dashboard-data-grid">
            {rows}
        </div>
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