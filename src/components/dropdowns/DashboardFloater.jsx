import React, { useState, useEffect } from "react";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { setdashboardSelection, setDashDate, setDashReg, setDashSubs } from "../Store";
import { connect } from 'react-redux';
import { DropdownButton } from "react-bootstrap";
import { getIconParam } from "../data/VariableCategories";
import { updateHash } from "../sharing/DashboardUrl";
import { findClosestDate, findUnitsByTitle } from "../data/DataManager";
import { DropdownSearchBar } from "./DropdownSearchBar";
import DashboardDataDownload from "../sharing/DashboardDataDownload";

/**
 * The floater component displayed between the guages and the charts on the dashboard. 
 * Functions as a menu for user selection of parameters, regions, dates, and subcategories.
 * 
 * @param {object} props - The component props.
 * @param {boolean} props.dataset - Name of the currently selected dataset.
 * @param {object[]} props.scenarios - Array of selected scenarios.
 * @param {(newSelectedGuage: string) => any} props.updateGuage - Updates the
 * currently selected guage.
 * @param {string} props.selection - Name of the currently selected guage.
 * @param {object[]} props.openGuages - Name of the currently open guages.
 * @param {number} props.year - Currently selected year. 
 * @param {string} props.region - Currently selected region.
 * @param {string} props.subsector - Currently selected subsector.
 * @param {(date: number) => any} props.dashDate - Updates the
 * currently selected date.
 * @param {(reg: string) => any} props.dashReg - Updates the
 * currently selected region.
 * @param {(subs: string) => any} props.dashSubs - Updates the
 * currently selected subcategory.
 * @param {object[]} props.dates - Data containing all valid dates for the 
 * current selection.
 * @param {object[]} props.subcats - Data containing all valid subcategories for the 
 * current selection.
 * @param {object[]} props.regions - Data containing all valid regions for the 
 * current selection.
 * @param {object[]} props.datasetData - Object containing all user-uploaded data.
 * @returns {ReactElement} The rendered component.
 */
function DashboardFloater({ dataset, scenarios, updateGuage, selection, openGuages, year, region, subsector, dashDate, dashReg, dashSubs, dates, subcats, regions, datasetData }) {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    //console.log(regions);
    function resetParams() {
        dashDate(findClosestDate(dates, 2100));
        dashReg("Global");
        dashSubs("Aggregate of Subsectors");
        updateHash("year", findClosestDate(dates, 2100));
        updateHash("reg", "Global");
        updateHash("sub", "Aggregate of Subsectors");
    }

    function updateScenerio(scenerio) {
        resetParams();
        updateGuage(scenerio);
    }

    const links = (Array.isArray(openGuages)) ? openGuages.map((guage) => (
        <div key={guage ? guage.title : "Error"}>
            <Dropdown.Item as="button" active={guage ? (selection === guage.title ? true : false) : false}
                onClick={() => guage ? updateScenerio(guage ? guage.title : "Error") : ""}>
                {guage ? guage.units : "Error"}
            </Dropdown.Item>
        </div >
    )) : [];

    let uniqueDates = dates !== "i" ? new Set(dates.map(obj => obj.x).sort((a, b) => parseInt(a) - parseInt(b))) : "i";
    let uniqueRegions = regions !== "i" ? new Set(regions) : "i";
    let uniqueSubcats = subcats !== "i" ? new Set(subcats) : "i";
    if (uniqueRegions !== "i")
        uniqueRegions.add("Global");
    if (uniqueSubcats !== "i")
        uniqueSubcats.add("Aggregate of Subsectors");

    //console.log(uniqueDates, uniqueRegions, uniqueSubcats);

    const date_links = (uniqueDates && uniqueDates !== "i") ? Array.from(uniqueDates).map((date) => (
        <div key={date}>
            <Dropdown.Item as="button" active={year === date ? true : false}
                onClick={() => dashDate(date)}>
                {date}
            </Dropdown.Item>
        </div >
    )) : <div></div>

    const region_links = uniqueRegions !== "i" ? Array.from(uniqueRegions).map((listedRegion) => (
        (listedRegion && listedRegion !== "global") ? (<div key={listedRegion}>
            <Dropdown.Item as="button" active={region === listedRegion ? true : false}
                onClick={() => {
                    updateHash("reg", listedRegion);
                    dashReg(listedRegion);
                }}>
                {listedRegion}
            </Dropdown.Item>
        </div >) : <div></div>
    )) : <div></div>

    //console.log(uniqueSubcats)
    const subcat_links = uniqueSubcats !== "i" ? Array.from(uniqueSubcats).map((listedSubcat) => (
        (listedSubcat && listedSubcat !== "class1") ? (<div key={listedSubcat}>
            <Dropdown.Item as="button" active={subsector === listedSubcat ? true : false}
                onClick={() => {
                    updateHash("sub", listedSubcat);
                    dashSubs(listedSubcat);
                }}>
                {listedSubcat.charAt(0).toUpperCase() + listedSubcat.slice(1).trim()}
            </Dropdown.Item>
        </div >) : <div></div>
    )) : <div></div>
    return (
        <>
            <div title="Change selected data variable" id="guage-selector-dropdown">
                SELECTED:    {findUnitsByTitle(openGuages, selection)}   {<div className='floater-icon'>{getIconParam(selection, openGuages)}</div>}
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
                <DashboardDataDownload
                    id="data-download"
                    dataset={dataset}
                    scenarios={scenarios}
                    parameter={selection}
                    datasetData={datasetData}
                />
            </div>
            {(width >= 875) ? (
                <div title="Change selected year, region, and subsector" id="floater-change-selection">
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-light" className="dashboard-scenerio-button dashboard-floater-button">
                            {"Year: " + year}
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={DropdownSearchBar}>
                            {date_links}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-light" className="dashboard-scenerio-button dashboard-floater-button">
                            {"Region: " + region}
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={DropdownSearchBar}>
                            {region_links}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-light" className="dashboard-scenerio-button dashboard-floater-button">
                            {"Subsector: " + subsector.trim()}
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={DropdownSearchBar}>
                            {subcat_links}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button
                        id="floater-change-reset"
                        title="Reset all data selections"
                        className="floater-button"
                        variant="danger"
                        onClick={() => resetParams()}>
                        Reset
                    </Button>
                </div>
            ) : (
                <>
                    <div title="Change selected year">
                        <DropdownButton variant="outline-light" className="dashboard-scenerio-button dashboard-floater-button" title={"Year: " + year}>
                            {date_links}
                        </DropdownButton>
                    </div>
                    <div title="Change selected region">
                        <DropdownButton variant="outline-light" className="dashboard-scenerio-button dashboard-floater-button" title={"Region: " + region}>
                            {region_links}
                        </DropdownButton>
                    </div>
                    <div title="Change selected subsector">
                        <DropdownButton variant="outline-light" className="dashboard-scenerio-button dashboard-floater-button" title={"Subsector: " + subsector.trim()}>
                            {subcat_links}
                        </DropdownButton>
                    </div>
                    <Button
                        title="Reset all data selections"
                        className="floater-button reset-button"
                        variant="danger"
                        onClick={() => resetParams()}>
                        Reset
                    </Button>
                </>
            )}
        </>
    );
}

/**
 * Maps the state from the Redux store to the component props.
 * 
 * @param {object} state - The current state.
 * @returns {object} The mapped props.
 */
function mapDispatchToProps(dispatch) {
    return {
        updateGuage: (newSelectedGuage) => dispatch(setdashboardSelection(newSelectedGuage)),
        dashDate: (date) => dispatch(setDashDate(date)),
        dashReg: (reg) => dispatch(setDashReg(reg)),
        dashSubs: (subs) => dispatch(setDashSubs(subs))
    };
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
        openGuages: state.guages,
        year: state.dashboardYear,
        region: state.dashboardRegion,
        subsector: state.dashboardSubsector,
        datasetData: state.datasetData,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardFloater);