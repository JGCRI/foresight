import React, { useState, useEffect } from "react";
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { setBasinAggregation, setdashboardSelection, setDashDate, setDashReg, setDashSubs } from "../Store";
import { connect } from 'react-redux';
import { findClosestDate, findUnitsByTitle } from "../../assets/data/DataManager";
import { updateHash } from "../sharing/DashboardUrl";
import { getIconParam } from "../../assets/data/VariableCategories";
import { DropdownButton } from "react-bootstrap";
import { MdFileDownload } from "react-icons/md";
import { RiFilterFill } from "react-icons/ri";

function DashboardFloater({ updateGuage, selection, openGuages, year, region, subsector, dashDate, dashReg, dashSubs, dates, subcats, regions, data, downloadableData, basinAggregation, setBasinAggregation }) {
    const [width, setWidth] = useState(window.innerWidth);
    const [selectedAggregate, setSelectedAggregate] = useState(0);
    const [aggregates, setAggregates] = useState([]);

    const aggregateRegion = (region) => {
        let newAggregate = structuredClone(aggregates);
        console.log(region + "AGGREGATED TO GROUP " + selectedAggregate);
        if (newAggregate.length < selectedAggregate + 1) //Creating New Aggregate Group
            newAggregate.push([region]);
        else if (newAggregate[selectedAggregate].includes(region)) { //Removing from Aggregate Group
            if (newAggregate[selectedAggregate].length === 1) //Delete Group
                newAggregate.splice(selectedAggregate, 1);
            else
                newAggregate[selectedAggregate] = newAggregate[selectedAggregate].filter(item => item !== region);
        }

        else //Adding to Aggregate Group
            newAggregate[selectedAggregate].push(region);
        setAggregates(newAggregate);
        console.log(newAggregate);
    }

    const moveGroup = (flag) => {
        if (flag)
            setSelectedAggregate(selectedAggregate + 1);
        else
            setSelectedAggregate(selectedAggregate - 1);
    }

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const downloadCSV = () => {
        if (downloadableData !== "i") {
            const csv = Papa.unparse(downloadableData);

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            saveAs(blob, 'data.csv');
        }
    };

    function resetParams() {
        if (data.length > 0) {
            let date = findClosestDate(data, 2020);
            dashDate(date);
            dashReg("Global");
            dashSubs("Aggregate of Subsectors");
            updateHash("year", date);
            updateHash("region", "Global");
            updateHash("class", "Aggregate of Subsectors");
        }
    }

    function updateScenerio(scenerio) {
        resetParams();
        updateHash("selectedParam", scenerio);
        updateGuage(scenerio);
    }

    const links = openGuages.map((guage) => (
        <div key={guage.title}>
            <Dropdown.Item as="button" active={selection === guage.title ? true : false}
                onClick={() => updateScenerio(guage.title)}>
                {guage.units}
            </Dropdown.Item>
        </div >
    ))

    let uniqueDates = dates !== "i" ? new Set(dates.map(obj => obj.x)) : "i";
    let uniqueRegions = regions !== "i" ? new Set(regions) : "i";
    let uniqueSubcats = subcats !== "i" ? new Set(subcats) : "i";
    if (uniqueRegions !== "i")
        uniqueRegions.add("Global");
    if (uniqueSubcats !== "i")
        uniqueSubcats.add("Aggregate of Subsectors");
    //console.log(uniqueDates, uniqueRegions, uniqueSubcats);

    const date_links = uniqueDates !== "i" ? Array.from(uniqueDates).map((date) => (
        <div key={date}>
            <Dropdown.Item as="button" active={year === date ? true : false}
                onClick={() => dashDate(date)}>
                {date}
            </Dropdown.Item>
        </div >
    )) : <div></div>

    const region_links = uniqueRegions !== "i" ? Array.from(uniqueRegions).map((listedRegion) => (
        (listedRegion !== "global") ?
            <div key={listedRegion}>
                <Dropdown.Item as="button" active={region === listedRegion ? true : false}
                    onClick={() => dashReg(listedRegion)}>
                    {listedRegion}
                </Dropdown.Item>
            </div > : <div></div>
    )) : <div></div>

    let region_aggregate_links = uniqueRegions !== "i" ? Array.from(uniqueRegions).map((listedRegion) => (
        (listedRegion !== "Global") ?
            <div key={listedRegion}>
                {console.log()}
                <Dropdown.Item as="button" active={aggregates.length > selectedAggregate && aggregates[selectedAggregate].includes(listedRegion)}
                    onClick={() => aggregateRegion(listedRegion)}>
                    {listedRegion}
                </Dropdown.Item>
            </div > : <div></div>
    )) : <div></div>
    // region_aggregate_links.push(
    //     <Dropdown.Divider />
    // );
    // region_aggregate_links.push(
    //     <Dropdown.Item as="button"
    //         onClick={() => moveGroup(true)}>
    //         {aggregates.length === selectedAggregate + 1 ? 'Add New Group' : 'Next Group'}
    //     </Dropdown.Item>
    // );
    if (selectedAggregate !== 0) {
        region_aggregate_links.push(
            <Dropdown.Item as="button"
                onClick={() => moveGroup(false)}>
                {'Previous Group'}
            </Dropdown.Item>
        );
    }
    const subcat_links = uniqueSubcats !== "i" ? Array.from(uniqueSubcats).map((listedSubcat) => (
        (listedSubcat !== "class1") ?
            <div key={listedSubcat}>
                <Dropdown.Item as="button" active={subsector === listedSubcat ? true : false}
                    onClick={() => dashSubs(listedSubcat)}>
                    {listedSubcat.charAt(0).toUpperCase() + listedSubcat.slice(1).trim()}
                </Dropdown.Item>
            </div > : <div></div>
    )) : <div></div>

    let basinOptions = ["Region", "Basin", "Global", "RegionBasin"]
    const basin_links = basinAggregation !== "i" ? Array.from(basinOptions).map((type) => (
        <div key={type}>
            <Dropdown.Item as="button" active={basinAggregation === type ? true : false}
                onClick={() => setBasinAggregation(type)}>
                {type}
            </Dropdown.Item>
        </div >
    )) : <div></div>
    return (
        <>
            <div>
                SELECTED:    {findUnitsByTitle(openGuages, selection).toUpperCase()}   {<div className="floater-icon">{getIconParam(selection, openGuages)}</div>}
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
                <div
                    onClick={() => downloadCSV()}
                    className="guage-button">
                    <MdFileDownload />
                </div>
                <DropdownButton variant="outline-light" autoClose="outside" className="dashboard-scenerio-button" title={<RiFilterFill className='floater-filter' />}>
                    {region_aggregate_links}
                </DropdownButton>
            </div>
            {(width >= 875) ? (
                <div>
                    <DropdownButton variant="outline-light" className="dashboard-scenerio-button dashboard-floater-button" title={"Year: " + year}>
                        {date_links}
                    </DropdownButton>
                    <DropdownButton variant="outline-light" className="dashboard-scenerio-button dashboard-floater-button" title={"Region: " + region}>
                        {region_links}
                    </DropdownButton>
                    <DropdownButton variant="outline-light" className="dashboard-scenerio-button dashboard-floater-button" title={"Subsector: " + subsector.trim()}>
                        {subcat_links}
                    </DropdownButton>
                    <DropdownButton variant="outline-light" className="dashboard-scenerio-button dashboard-floater-button" title={"Region Type: " + basinAggregation.trim()}>
                        {basin_links}
                    </DropdownButton>
                    <Button
                        className="floater-button"
                        variant="danger"
                        onClick={() => resetParams()}>
                        Reset
                    </Button>
                </div>
            ) : (
                <>
                    <div>
                        Year: {year}
                        <DropdownButton variant="outline-light" className="dashboard-scenerio-button dashboard-floater-button" title={"Year: " + year}>
                            {date_links}
                        </DropdownButton>
                    </div>
                    <div>
                        Region: {region}
                        <DropdownButton variant="outline-light" className="dashboard-scenerio-button dashboard-floater-button" title={"Region: " + region}>
                            {region_links}
                        </DropdownButton>
                    </div>
                    <div>
                        Subsector: {subsector.charAt(0).toUpperCase() + subsector.slice(1)}
                        <DropdownButton variant="outline-light" className="dashboard-scenerio-button dashboard-floater-button" title={"Subsector: " + subsector.trim()}>
                            {subcat_links}
                        </DropdownButton>
                    </div>
                    <div>
                        Region Type: {basinAggregation}
                        <DropdownButton variant="outline-light" className="dashboard-scenerio-button dashboard-floater-button" title={"Region Type: " + basinAggregation.trim()}>
                            {basin_links}
                        </DropdownButton>
                    </div>
                    <Button
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
function mapDispatchToProps(dispatch) {
    return {
        updateGuage: (newSelectedGuage) => dispatch(setdashboardSelection(newSelectedGuage)),
        dashDate: (date) => dispatch(setDashDate(date)),
        dashReg: (date) => dispatch(setDashReg(date)),
        dashSubs: (date) => dispatch(setDashSubs(date)),
        setBasinAggregation: (type) => dispatch(setBasinAggregation(type)),
    };
}

function mapStateToProps(state) {
    return {
        selection: state.dashboardSelection,
        openGuages: state.guages,
        year: state.dashboardYear,
        region: state.dashboardRegion,
        subsector: state.dashboardSubsector,
        basinAggregation: state.basinAggregation,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardFloater);