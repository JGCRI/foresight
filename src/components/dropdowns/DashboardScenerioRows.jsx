import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import DashboardScenerioSelector from "./DashboardScenerioSelector";
import { setdashboardSelection } from "../Store";
import { updateHash } from '../Dashboard';

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
                guages={guageLists}
                openGuage={openGuages}
                update={updateSelect}
            />
        ))
    )
};

function DashboardScenerioRows({ Scenarios, openScenerio, guageList, openGuage, updateSelection, startDate, endDate, dashboardSelection }) {
    const openScenerios = openScenerio;
    const ScenarioList = Scenarios;
    const guageLists = guageList;
    const openGage = openGuage;
    const updateSelect = updateSelection;

    //Updates the hash value with the dashboard's current parameters. This is useful for auto-filling
    //the URL when a user has opened up the dashboard for the first time or from another page.
    useEffect(() => {
        updateHash("start", startDate);
        updateHash("end", endDate);
        updateHash("selected", openGuage);
    }, [startDate, endDate, openGuage]);

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
        startDate: state.startDate,
        endDate: state.endDate,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScenerioRows);