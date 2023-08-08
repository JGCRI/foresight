import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import DashboardScenerioSelector from "./DashboardScenerioSelector";
import { setdashboardSelection } from "../Store";

//Puts together the rows of the dashboard grid. Uses a map to go through every scenerio
//and generates a row for each. A dashboard row begins with a DashboardScenerioSelector
//object and then preceds with the list of user selected guages provided by the col
//function.
const rows = (Scenarios, openedScenerios, guages, openedGuage, updateSelection) => {
    const list = Scenarios;
    const openedScene = openedScenerios;
    const guageLists = guages;
    const openGuages = openedGuage;
    const updateSelect = updateSelection;
    return (
        openedScene.map((open, index) => (
            <DashboardScenerioSelector
                key={index}
                scenerios={list}
                current={open.title}
                curIndex={index}
                curOpen={openedScene}
                className="dashboard-scenerio-selector"
                guages={guageLists}
                openGuageList={openGuages}
                update={updateSelect}
            />
        ))
    )
};

function DashboardScenerioRows({ Scenarios, openScenerio, guageList, openGuage, updateSelection }) {
    const openScenerios = openScenerio;
    const ScenarioList = Scenarios;
    const guageLists = guageList;
    const openGage = openGuage;
    const updateSelect = updateSelection;
    //Returns the completed dashboard grid.
    return (
        <div className="dashboard-data-grid">
            {rows(ScenarioList, openScenerios, guageLists, openGage, updateSelect)}
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        updateSelection: (openGuage) => dispatch(setdashboardSelection(openGuage)),
    };
}

//Gets open scenerios, open guages, and the current selected guage from storage.
function mapStateToProps(state) {
    return {
        openGuage: state.dashboardSelection,
        openScenerio: state.scenerios,
        guageList: state.guages,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScenerioRows);