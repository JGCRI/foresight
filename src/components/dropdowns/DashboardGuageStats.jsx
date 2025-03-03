import React from "react";
import { connect } from 'react-redux';
import { datasets } from '../data/Scenarios';

/**
 * The bar component displayed below the charts on the dashboard. 
 * Provides additional information about the selected parameter.
**/
function DashboardGuageStats({ dataset, aggSub, selection, start, end, year, scenarios}) {
    let param = datasets.some(e => e.dataset === dataset) ? datasets.find(obj => obj.dataset === dataset).params[selection] : {};
    let currentParamDescription = param ? `You have selected ${param.description}. ` : "";

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
