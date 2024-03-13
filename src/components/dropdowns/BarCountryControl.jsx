import Dropdown from 'react-bootstrap/Dropdown';

import { MdSettings } from "react-icons/md";
import { setBarCountries } from '../Store';
import { connect } from 'react-redux';
import { getDates, getScenerio, filterRegion, listRegions } from '../../assets/data/DataManager';
import Form from 'react-bootstrap/Form';

function BarChartControl({csv, scenerio, year, setCountries, countries}) {
  const changeCountries = (checked, country) => {
    if(checked) {
      countries.push(country);
      setCountries(countries);
    }
    else {
      countries = countries.filter(i => i !== country);
      setCountries(countries);
    }
    
  }

  let aggregates = getDates(getScenerio(csv, scenerio), year);
  const countryList = listRegions(aggregates);
  countryList.sort();
  console.log("!", countries);
  let colors = []
  for (let i = 0; i < countryList.length; i++) {
    let country = countryList.at(i);
    if(countries.includes(country) || countries.includes(country)) {
      colors.push(
          <Form.Check
            defaultChecked
            type="switch"
            id={country}
            label={country}
            onChange={e => {changeCountries(e.target.checked, country)}}
            //onClick={setCountries(countries.filter(c => c !== country))}
          />
      )
    }
    else {
      colors.push(
          <Form.Check
            type="switch"
            id={country}
            label={country}
            onChange={e => {changeCountries(e.target.checked, country)}}
            //onClick={setCountries(countries.push(country))}
          />
      )
    }
  }

  return (
    <Dropdown className = "choropleth-control">
      <Dropdown.Toggle variant="outline-secondary" size="sm" id="dropdown-basic">
        <MdSettings/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {colors.map((c) => (c))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

function mapDispatchToProps(dispatch) {
  return {
      setCountries: (color) => dispatch(setBarCountries(color)),
  };
}

//Gets open scenerios, open guages, and the current selected guage from storage.
function mapStateToProps(state) {
  return {
      countries: state.barCountries,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChartControl);