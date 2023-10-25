import React from "react";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { setdashboardSelection } from "../Store";
import { connect } from 'react-redux';
import { getIcon } from "../Dashboard";

function DashboardFloater({ updateGuage, selection, openGuages, year, region, subsector }) {
    const links = openGuages.map((guage) => (
        <div key={guage.title}>
            <Dropdown.Item as="button" active={selection === guage.title ? true : false}
                onClick={() => updateGuage(guage.title)}>
                {guage.title}
            </Dropdown.Item>
        </div >
    ))

    return (
        <>
            <div>
                SELECTED:    {selection.toUpperCase()}   {getIcon(selection)}
                <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle
                        split
                        variant="outline-warning"
                        id="dropdown-split-basic"
                    />
                    <Dropdown.Menu>
                        {links}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div>
                Year: {year}     Region: {region}     Subsector: {subsector}
            </div>
        </>
    );
}
function mapDispatchToProps(dispatch) {
    return {
        updateGuage: (newSelectedGuage) => dispatch(setdashboardSelection(newSelectedGuage))
    };
}

function mapStateToProps(state) {
    return {
        selection: state.dashboardSelection,
        openGuages: state.guages,
        year: state.dashboardYear,
        region: state.dashboardRegion,
        subsector: state.dashboardSubsector,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardFloater);