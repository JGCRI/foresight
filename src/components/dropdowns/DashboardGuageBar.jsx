import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setdashboardGuages, setdashboardSelection } from "../Store";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { setDashDate, setDashReg, setDashSubs, setScenerios } from "../Store";
import ScenerioGuage from "../guages/ScenerioGuage"
import ScenerioGuageNegative from "../guages/ScenerioGuageNegative"
import Dropdown from 'react-bootstrap/Dropdown';
import { findClosestDate, getGuage } from '../../assets/data/DataManager';
import { updateHash, updateListHash } from '../sharing/DashboardUrl';
import { getIconParam, iconTypes } from '../../assets/data/VariableCategories';
import { GrAddCircle } from "react-icons/gr";
import Form from 'react-bootstrap/Form';
import { DropdownButton } from 'react-bootstrap';

function DashboardGuageBar({ Scenarios, OpenScenarios, Parameters, OpenParameters, SelectedParameter, startDate, endDate, data, dateData, updateSelection, updateScenerios, updateGuages, dashDate, dashReg, dashSubs, reset }) {
  const [OpenedScenarios, setValueScenario] = useState(OpenScenarios);
  const [OpenedParameters, setValueParameter] = useState(OpenParameters);

  useEffect(() => {
    setValueScenario(OpenScenarios);
  }, [OpenScenarios]);

  useEffect(() => {
    setValueParameter(OpenParameters);
  }, [OpenParameters]);

  // Maps the dropdown menu. Takes in the vector of all scenerios and creates 
  // a Dropdown.Item for each.
  const scenarioDropdownList = (index) => Scenarios.map((scenerio) => (
    <div key={scenerio.title}>
      <Dropdown.Item as="button" onClick={() => handleScenerioChange(index, scenerio.title)}>
        {scenerio.title}
      </Dropdown.Item>
    </div>
  ))

  const paramDropdownList = () => {
    let list = [];
    iconTypes.sort().forEach(group => {
      let params = paramDropdownListGroup(group)
      if(params.length > 0) {
        list.push(<Dropdown.Header>{group.charAt(0).toUpperCase() + group.slice(1).trim()}</Dropdown.Header>);
        list.push(params);
      }
    });
    return list;
  }

  const paramDropdownListGroup = (group) => {
    return (Parameters.filter(param => param.group === group).map((param) => (
      <div key={param.title}>
        <Form.Check
          disabled={(!(OpenedParameters.map(obj => obj.title).includes(param.title)) && OpenedParameters.map(obj => obj.title).length >= 5) || ((OpenedParameters.map(obj => obj.title).includes(param.title)) && OpenedParameters.map(obj => obj.title).length === 1)}
          checked={OpenedParameters.map(obj => obj.title).includes(param.title)}
          type="switch"
          key={param.title}
          id={param.title}
          label={param.units}
          onChange={e => { handleParamChange(e.target.checked, param) }}
        />
      </div>
    )))
  }


  // Handles when a dropdown selection changes the scenario. The function
  // should be given the index of the row in which the scenario is being
  // changed (Starting at 0 from top to bottom) as well as the string of
  // the new scenario.
  const handleScenerioChange = (index, scenario) => {
    reset();
    updateListHash("scenarios", index, scenario);
    OpenedScenarios.at(index).title = scenario;
    let newScenarios = [...OpenedScenarios];
    setValueScenario(newScenarios);
    updateScenerios(index, scenario, newScenarios);
  }


  const handleParamChange = (checked, param) => {
    console.log(OpenedParameters, Parameters, param);
    let newParameters = structuredClone(OpenedParameters);
    if (checked) //Add Guage
      newParameters.push(param)
    else { //Remove Guage
      newParameters = newParameters.filter(obj => obj.title !== param.title)
      if (SelectedParameter === param.title)
        updateSelection(newParameters[newParameters.length - 1].title)
    }
    updateGuages(newParameters);
  }

  // This function gets data from the dataset for the guagues. It will return the result
  // for the percent change between a start and end date from a dataset given by data for a
  // scenario. This dataset should be aggregated by region and subcategory. 
  // If the value is found it is returned. Otherwise the function returns -1.
  const getDataValue = (scenario, fieldTitle) => {
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
    if (!dateData || dateData === "i") return;
    let date = findClosestDate(dateData, 2020);

    dashDate(date);
    dashReg("Global");
    dashSubs("Aggregate of Subsectors");
    updateSelection(title);

    updateHash("year", date);
    updateHash("region", "Global");
    updateHash("class", "Aggregate of Subsectors");
    updateHash("selectedParam", title);
  }


  // Creates the first column of scenario selectors. Reads from the array of currently opened scenarios
  // from the store.
  const scenarioSelectionCol = () => {
    return (
      OpenedScenarios.map((scenario, index) => (
        <DropdownButton variant="outline-light" className="dashboard-scenerio-button" title={scenario.title}>
          {scenarioDropdownList(index)}
        </DropdownButton>
      ))
    )
  };


  const guageSelectionCol = () => {
    //console.log(Parameters);
    return (
      OpenedScenarios.map((scenario, index) => (
        <Dropdown as={ButtonGroup} key={index} className={"dashboard-scenerio-selector"}>
          <Button variant="outline-light"><GrAddCircle /></Button>
          <Dropdown.Toggle
            split
            variant="outline-warning"
            id="dropdown-split-basic"
          />
          <Dropdown.Menu>
            {paramDropdownList()}
          </Dropdown.Menu>
        </Dropdown>
      ))
    )
  };


  // Returns the HTML for each column of the guage dashboard. As the user can add more scenarios, the columns
  // have been changed to only take up one cell. This cell will then contain each guage layered sequentially.
  const col = () => {
    return (
      OpenedParameters.map((param, index) => (
        <div className={getGuageCSS(param.title)} key={index} onClick={() => resetAndUpdate(param.title)}>
          {row(param.title, param.units)}
        </div>
      ))
    )
  };
  // <div className="guage-selection-menu">
  //   <RiPlayListAddFill />
  // </div>

  // Returns the HTML for each row of the guage dashboard. With the new guage format,
  // each column now has its seperate grid for rows.
  const row = (param, units) => {
    return (
      OpenedScenarios.map((scenario, index) => (
        <div title={units} key={index}>
          {guageNumber(getDataValue(scenario.title, param), param, units, index)}
        </div>
      ))
    )
  };
  //style={{gridTemplateColumns: "auto repeat(" + OpenedParameters.length + ", 1fr)"}}
  // If the dataset hasn't loaded yet, we give the user the "Loading Dataset..." message.
  return (
    <div className="dashboard-guage-grid">
      <div className="dashboard-guage-grid-columns">
        {scenarioSelectionCol()}
      </div>
      {(data === 'i' || data.length === 0) ? (
        "Loading Dataset..."
      ) : (col())}
      <div className="dashboard-guage-grid-columns">
        {guageSelectionCol()}
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    OpenScenarios: state.scenerios,
    OpenParameters: state.guages,
    SelectedParameter: state.dashboardSelection,
    startDate: state.startDate,
    endDate: state.endDate,
    Parameters: state.guageList,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    updateSelection: (openGuage) => dispatch(setdashboardSelection(openGuage)),
    updateScenerios: (newIndex, newTitle, openScenerio) => dispatch(setScenerios(newIndex, newTitle, openScenerio)),
    updateGuages: (guages) => dispatch(setdashboardGuages(guages)),
    dashDate: (date) => dispatch(setDashDate(date)),
    dashReg: (reg) => dispatch(setDashReg(reg)),
    dashSubs: (sub) => dispatch(setDashSubs(sub))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardGuageBar);