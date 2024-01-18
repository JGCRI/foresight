import React from "react";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { setdashboardSelection, setDashDate, setDashReg, setDashSubs} from "../Store";
import { connect } from 'react-redux';
import { getIcon } from "../Dashboard";

function DashboardFloater({ updateGuage, selection, openGuages, year, region, subsector, dashDate, dashReg, dashSubs }) {
    function resetParams() {
        dashDate(2020);
        dashReg("Global");
        dashSubs("Aggregate of Subsectors");
    }

    function updateScenerio(scenerio) {
        resetParams();
        updateGuage(scenerio);
    }
    
    const links = openGuages.map((guage) => (
        <div key={guage.title}>
            <Dropdown.Item as="button" active={selection === guage.title ? true : false}
                onClick={() => updateScenerio(guage.title)}>
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
                <Button
                    className="floater-button" 
                    variant="danger"
                    onClick={() => resetParams()}>
                    Reset
                </Button>
            </div>
        </>
    );
}
function mapDispatchToProps(dispatch) {
    return {
        updateGuage: (newSelectedGuage) => dispatch(setdashboardSelection(newSelectedGuage)),
        dashDate: (date) => dispatch(setDashDate(date)),
        dashReg: (date) => dispatch(setDashReg(date)),
        dashSubs: (date) => dispatch(setDashSubs(date))
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