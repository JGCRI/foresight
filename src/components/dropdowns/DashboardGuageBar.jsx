import React from 'react';
import { connect } from 'react-redux';
import { setDashDate, setDashReg, setDashSubs, setScenerios, setdashboardSelection, setdashboardGuages } from "../Store";
import ScenerioGuage from "../guages/ScenerioGuage"
import ScenerioGuageNegative from "../guages/ScenerioGuageNegative"
import Dropdown from 'react-bootstrap/Dropdown';
import { getGuage } from '../data/DataManager';
import { updateHash, updateListHash } from '../sharing/DashboardUrl';
import { DropdownButton } from 'react-bootstrap';
import { MdOutlineLibraryAdd } from "react-icons/md";
import Form from 'react-bootstrap/Form';
import { getIconParam, iconTypes } from '../data/VariableCategories';
import { datasets } from '../data/Scenarios';

/**
 * The floater component displayed between the guages and the charts on the dashboard. 
 * Functions as a menu for user selection of parameters, regions, dates, and subcategories.
 * 
 * @param {object} props - The component props.
 * @param {object[]} props.Scenarios - All total available scenarios.
 * @param {object[]} props.OpenScenarios - All currently open scenarios.
 * @param {object[]} props.Parameters - All total available guages.
 * @param {object[]} props.OpenParameters - All currently open guages.
 * @param {string} props.SelectedParameter - Currently selected guage.
 * @param {number} props.startDate - Guage start date.
 * @param {number} props.endDate - Guage end date.
 * @param {object[]} props.data - Data for loading the guages.
 * @param {string} props.dataset - Currently selected dataset.
 * @param {(openGuage: object[]) => any} props.updateSelection - Updates the currently selected guage.
 * @param {(openScenerio: object[]) => any} props.updateScenerios - Updates the current scenarios.
 * @param {(guages: object[]) => any} props.updateGuages - Updates the currently opened guages.
 * @param {(date: number) => any} props.dashDate - Updates the currently selected date.
 * @param {(reg: string) => any} props.dashReg - Updates the currently selected region.
 * @param {(subs: string) => any} props.dashSubs - Updates the currently selected subsector.
 * @param {() => void} props.reset - Function that forces a re-query of all data.
 * @returns {ReactElement} The rendered component.
 */
function DashboardGuageBar({ Scenarios, OpenScenarios, Parameters, OpenParameters, SelectedParameter, startDate, endDate, data, dataset, updateSelection, updateScenerios, updateGuages, dashDate, dashReg, dashSubs, reset }) {

  const paramDropdownList = () => {
    let list = [];
    list.push(<Dropdown.Item as="button" key={"reset"} onClick={() => resetToDefault()}>{"Reset to Default"}</Dropdown.Item>)
    iconTypes.sort().forEach(group => {
      let params = paramDropdownListGroup(group)
      if (params && params.length > 0) {
        list.push(<Dropdown.Header>{group.charAt(0).toUpperCase() + group.slice(1).trim()}</Dropdown.Header>);
        list.push(params);
      }
    });
    return list;
  }

  const paramDropdownListGroup = (group) => {
    if (!OpenParameters || !Parameters) return;
    return (Parameters.filter(param => param.group === group).map((param) => (
      <div key={param.title}>
        <Form.Check
          disabled={(!(OpenParameters.map(obj => obj ? obj.title : "").includes(param ? param.title : "!!Error!!")) && OpenParameters.map(obj => obj ? obj.title : "").length >= 6) || ((OpenParameters.map(obj => obj ? obj.title : "").includes(param.title)) && OpenParameters.map(obj => obj ? obj.title : "").length === 1)}
          checked={OpenParameters ? OpenParameters.map(obj => obj ? obj.title : "").includes(param ? param.title : "!!Error!!") : false}
          type="switch"
          key={param.title}
          id={param.title}
          label={param.units}
          onChange={e => { handleParamChange(e.target.checked, param) }}
        />
      </div>
    )))
  }

  const resetParams = () => {
    dashDate(2020);
    dashReg("Global");
    dashSubs("Aggregate of Subsectors");
    updateHash("year", 2020);
    updateHash("reg", "Global");
    updateHash("sub", "Aggregate of Subsectors");
  }

  const handleParamChange = (checked, param) => {
    //console.log(OpenParameters, Parameters, param);
    let newParameters = structuredClone(OpenParameters);
    if (checked) //Add Guage
      newParameters.push(param);
    else { //Remove Guage
      newParameters = newParameters.filter(obj => obj.title !== param.title)
      if (SelectedParameter === param.title) {
        updateSelection(newParameters[newParameters.length - 1].title);
        resetParams();
      }
    }
    updateHash("params", newParameters.map(param => param.title).toString());
    updateGuages(newParameters);
  }

  const resetToDefault = () => {
    console.log("reset triggered");
    let newParams = [];
    datasets.find(obj => obj.dataset === dataset).defaults.forEach(defaultGuage => newParams.push(Parameters.filter(guage => guage ? guage.title === defaultGuage : false)[0]));
    if (newParams.length < 1 || newParams.length > 6) return;
    console.log(newParams);
    if (!newParams.includes(obj => obj.title === SelectedParameter)) {
      updateSelection(newParams[Math.min(1, newParams.length - 1)].title);
      resetParams();
    }
    updateHash("params", newParams.map(param => param.title).toString());
    updateGuages(newParams);
  }

  // Maps the dropdown menu. Takes in the list of all scenerios and creates 
  // a Dropdown.Item for each.
  const scenarioDropdownList = (index) => Scenarios.map((scenerio) => (
    <div key={scenerio.title}>
      <Dropdown.Item as="button" onClick={() => handleScenerioChange(index, scenerio.title)}>
        {scenerio.title}
      </Dropdown.Item>
    </div>
  ))


  // Handles when a dropdown selection changes the scenario. The function
  // should be given the index of the row in which the scenario is being
  // changed (Starting at 0 from top to bottom) as well as the string of
  // the new scenario.
  const handleScenerioChange = (index, scenario) => {
    reset();
    updateListHash("scenarios", index, scenario);
    OpenScenarios.at(index).title = scenario;
    let newScenarios = [...OpenScenarios];
    updateScenerios(newScenarios);
  }


  // This function gets data from the dataset for the guagues. It will return the result
  // for the percent change between a start and end date from a dataset given by data for a
  // scenario. This dataset should be aggregated by region and subcategory. 
  // If the value is found it is returned. Otherwise the function returns -1.
  const getDataValue = (scenario, fieldTitle) => {
    //console.log(data, scenario, fieldTitle, startDate, endDate);
    return getGuage(data, scenario, fieldTitle, startDate, endDate);
  };


  // This function creates guages. Positive guages are created with ScenerioGuage and
  // negative values are created with ScenerioGuageNegative. Each guage asks for three
  // values, the guage if which is [GUAGE_TITLE][ROW_NUMBER] with no spaces, the text
  // to display below the guage which is given by the guage title, and the value of the
  // guage, given by the number, num.
  const guageNumber = (number, guageTitle, guageUnit, index) => {
    let displayTitle = guageUnit;
    if (displayTitle.length > 10)
      displayTitle = displayTitle.substring(0, 10) + "...";
    return (number < 0) ? (
      <>
        <ScenerioGuageNegative
          guageText={'' + guageTitle + index}
          guageValue={number}
        />
        <div className="guageText"> {getIconParam(guageTitle, OpenParameters)}  {displayTitle}</div>
      </>
    ) : (
      <>
        <ScenerioGuage
          guageText={'' + guageTitle + index}
          guageValue={number}
        />
        <div className="guageText"> {getIconParam(guageTitle, OpenParameters)}  {displayTitle}</div>
      </>
    )
  }


  // This returns the CSS for the guage column. If the parameter is currently selected,
  // the row will be a lighter gray.
  const getGuageCSS = (param) => param === SelectedParameter ? "guage-row-open" : "guage-row-closed";


  // This function resets and updates each selected parameter apon a new parameter being
  // chosen. 
  function resetAndUpdate(title) {
    dashDate(2020);
    dashReg("Global");
    dashSubs("Aggregate of Subsectors");
    updateSelection(title);
  }


  // Creates the first column of scenario selectors. Reads from the array of currently opened scenarios
  // from the store.
  const scenarioSelectionCol = () => {
    //console.log(OpenScenarios);
    return (
      OpenScenarios.map((scenario, index) => (
        <DropdownButton variant="outline-light" className="dashboard-scenerio-button" title={scenario.title}>
          {scenarioDropdownList(index)}
        </DropdownButton>
      ))
    )
  };

  const guageSelectionCol = () => {
    return (
      OpenScenarios.map((scenario, index) => (
        <Dropdown>
          <Dropdown.Toggle className="dashboard-scenerio-button" variant="outline-light">
            <MdOutlineLibraryAdd />
          </Dropdown.Toggle>
          <Dropdown.Menu className="guage-scenerio-button">
            {paramDropdownList(index)}
          </Dropdown.Menu>
        </Dropdown>
      ))
    )
  };

  // Returns the HTML for each column of the guage dashboard. As the user can add more scenarios, the columns
  // have been changed to only take up one cell. This cell will then contain each guage layered sequentially.
  const col = () => {
    return (
      OpenParameters.map((param, index) => (
        (param) ?
          <div className={getGuageCSS(param ? param.title : "")} key={index} onClick={() => resetAndUpdate(param ? param.title : "")}>
            {row(param.title, param.units)}
          </div> : <div></div>
      ))
    )
  };


  // Returns the HTML for each row of the guage dashboard. With the new guage format,
  // each column now has its seperate grid for rows.
  const row = (param, units) => {
    return (
      OpenScenarios.map((scenario, index) => (
        <div title={units} key={index}>
          {guageNumber(getDataValue(scenario.title, param), param, units, index)}
        </div>
      ))
    )
  };


  // If the dataset hasn't loaded yet, we give the user the "Loading Dataset..." message.
  return (
    <div className="dashboard-guage-grid">
      <div className="dashboard-guage-grid-columns" title="Select scenario">
        {scenarioSelectionCol()}
      </div>
      {(data === 'i' || data.length === 0) ? (
        "Loading Dataset..."
      ) : (col())}
      <div className="dashboard-guage-grid-columns" title="Select parameters">
        {guageSelectionCol()}
      </div>
    </div>
  );
}

/**
 * Maps the state from the Redux store to the component props.
 * 
 * @param {object} state - The current state.
 * @returns {object} The mapped props.
 */
function mapStateToProps(state) {
  return {
    OpenScenarios: state.scenerios,
    OpenParameters: state.guages,
    SelectedParameter: state.dashboardSelection,
    startDate: state.startDate,
    endDate: state.endDate,
    Parameters: state.guageList,
    dataset: state.dataset,
  };
}

/**
 * Maps the dispatch functions to the component props.
 * 
 * @param {Function} dispatch - The dispatch function.
 * @returns {object} The mapped props.
 */
function mapDispatchToProps(dispatch) {
  return {
    updateSelection: (openGuage) => dispatch(setdashboardSelection(openGuage)),
    updateScenerios: (openScenerio) => dispatch(setScenerios(openScenerio)),
    updateGuages: (guages) => dispatch(setdashboardGuages(guages)),
    dashDate: (date) => dispatch(setDashDate(date)),
    dashReg: (reg) => dispatch(setDashReg(reg)),
    dashSubs: (sub) => dispatch(setDashSubs(sub))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardGuageBar);