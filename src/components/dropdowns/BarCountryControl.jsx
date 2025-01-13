import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';

import { MdSettings } from "react-icons/md";
import { setBarCountries, setBarCountriesFrozen } from '../Store';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { getRegionsSorted, getScenerio, listRegions } from '../data/DataManager';
import { DropdownSearchBar } from './DropdownSearchBar';
import { BAR_COUNTRIES } from '../data/Scenarios';

/**
 * A dropdown menu for Bar Chart settings.
 * 
 * @param {object} props - The component props.
 * @param {object[]} props.csv - Data with global regions.
 * @param {string} props.scenario - The first scenario.
 * @param {(countryList: string[]) => any} props.setCountries - Function 
 * modifying the currently displayed countries on the bar chart.
 * @param {string[]} props.countries - State of the array 
 * of currently selected countries.
 * @param {(frozen: boolean) => any} props.setFrozen - Function 
 * setting whether the countries are frozen.
 * @param {boolean} props.frozen - Boolean on whether the countries are frozen upon change.
 * @returns {ReactElement} The rendered component.
 */
function BarChartControl({ csv, scenario, setCountries, countries, setFrozen, frozen }) {
  const changeCountries = (checked, country) => {
    if (checked) {
      countries.push(country);
      let newList = getRegionsSorted(countries, getScenerio(csv, scenario));
      setCountries(newList);
    }
    else {
      countries = countries.filter(i => i !== country);
      setCountries(countries);
    }
  }

  let aggregates = getScenerio(csv, scenario);
  const countryList = listRegions(aggregates);
  countryList.sort();
  //console.log("!", countryList);
  let countryMenu = []
  countryMenu.push(<Dropdown.ItemText>Settings</Dropdown.ItemText>);
  countryMenu.push(<Form.Check
    checked={frozen}
    type="switch"
    key={"country_frozen_toggle"}
    id={"country_frozen_toggle"}
    label={"Freeze regions on change"}
    onChange={e => { setFrozen(!frozen) }}
  />);
  countryMenu.push(<Dropdown.ItemText>Regions</Dropdown.ItemText>);
  for (let i = 0; i < countryList.length; i++) {
    let country = countryList.at(i);
    countryMenu.push(
      <Form.Check
        disabled={!(countries.includes(country)) && countries.length >= BAR_COUNTRIES}
        checked={countries.includes(country)}
        type="switch"
        key={country}
        id={country}
        label={country}
        onChange={e => { changeCountries(e.target.checked, country) }}
      />
    )
  }

  return (
    <Dropdown title="Bar chart settings" className="choropleth-control">
      <Dropdown.Toggle variant="outline-secondary" size="sm" id="dropdown-basic">
        <MdSettings />
      </Dropdown.Toggle>

      <Dropdown.Menu as={DropdownSearchBar}>
        <Dropdown.Header>Region Selection</Dropdown.Header>
        {countryMenu}
      </Dropdown.Menu>
    </Dropdown>
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
    setCountries: (countryList) => dispatch(setBarCountries(countryList)),
    setFrozen: (frozen) => dispatch(setBarCountriesFrozen(frozen)),
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
    countries: state.barCountries,
    frozen: state.barCountriesFrozen,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChartControl);