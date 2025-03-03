import React from "react";
import { connect } from 'react-redux';
import { datasets } from '../data/Scenarios';

/**
 * The bar component displayed below the charts on the dashboard. 
 * Provides additional information about the selected parameter.
**/
function DashboardGuageStats({ dataset, aggSub, selection, start, end, year, scenarios}) {
    let param = datasets.some(e => e.dataset === dataset) ? datasets.find(obj => obj.dataset === dataset).params[selection] : {};
    let aggValuesScenario1 = Array.isArray(aggSub) ? aggSub.filter(obj => obj.scenario === scenarios[0].title).sort((a, b) => b.value - a.value) : [];
    let aggValuesScenario2 = Array.isArray(aggSub) ? aggSub.filter(obj => obj.scenario === scenarios[1].title).sort((a, b) => b.value - a.value) : [];
    
    // Current Selection
    let currentParamDescription = `You have selected ${param.description}. `;

    // Greatest and least values
    let greatestValue = Array.isArray(aggSub) ? (
        <>
            The region with the greatest value in {year} is 
            <span style={{ color: "#FFFF00", fontWeight: "bold" }}> {aggValuesScenario1[0].region}</span> 
            for<span style={{ color: "#FFA500", fontWeight: "bold" }}> {scenarios[0].title}</span> and
            <span style={{ color: "#FFFF00", fontWeight: "bold" }}> {aggValuesScenario2[0].region}</span> 
            for<span style={{ color: "#FFA500", fontWeight: "bold" }}> {scenarios[1].title}</span>.
        </>
    ) : "Data Loading...";

    let smallestValue = Array.isArray(aggSub) ? (
        <>
            The region with the smallest value in {year} is 
            <span style={{ color: "#FFFF00", fontWeight: "bold" }}> {aggValuesScenario1[aggValuesScenario2.length - 1].region}</span> 
            for<span style={{ color: "#FFA500", fontWeight: "bold" }}> {scenarios[0].title}</span> and
            <span style={{ color: "#FFFF00", fontWeight: "bold" }}> {aggValuesScenario2[aggValuesScenario2.length - 1].region}</span> 
            for<span style={{ color: "#FFA500", fontWeight: "bold" }}> {scenarios[1].title}</span>.
        </>
    ) : "";

    return (
        <>
            <div title="Data Summary" className="selection-divider row">
                <div>{currentParamDescription}</div>
            </div>
        </>
    );
}

/**
 * Maps the dispatch functions to the component props.
 * 
 * @param {Function} dispatch - The dispatch function.
 * @returns {object} The mapped props.
 */
function mapStateToProps(state) {
    return {
        selection: state.dashboardSelection,
        start: state.startDate,
        end: state.endDate,
        year: state.dashboardYear,
        scenarios: state.scenerios,
    };
}

export default connect(mapStateToProps)(DashboardGuageStats);
