import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';

import { MdSettings } from "react-icons/md";
import { setBarCountries } from '../Store';
import { connect } from 'react-redux';
import { getRegionsSorted, getScenerio, listRegions } from '../../assets/data/DataManager';
import Form from 'react-bootstrap/Form';

function BarChartControl({csv, scenario, year, setCountries, countries}) {
  const changeCountries = (checked, country) => {
    if(checked) {
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
  let colors = []
  for (let i = 0; i < countryList.length; i++) {
    let country = countryList.at(i);
    colors.push(
      <Form.Check
        disabled={!(countries.includes(country)) && countries.length >= 10}
        checked={countries.includes(country)}
        type="switch"
        key={country}
        id={country}
        label={country}
        onChange={e => {changeCountries(e.target.checked, country)}}
      />
  )
  }

  return (
    <Dropdown className = "choropleth-control">
      <Dropdown.Toggle variant="outline-secondary" size="sm" id="dropdown-basic">
        <MdSettings/>
      </Dropdown.Toggle>
      
      <Dropdown.Menu>
        <Dropdown.Header>Region Selection</Dropdown.Header>
        {colors}
      </Dropdown.Menu>
    </Dropdown>
  );
}

function mapDispatchToProps(dispatch) {
  return {
      setCountries: (countryList) => dispatch(setBarCountries(countryList)),
  };
}

//Gets open scenarios, open guages, and the current selected guage from storage.
function mapStateToProps(state) {
  return {
      countries: state.barCountries,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChartControl);