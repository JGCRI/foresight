import React, { useState } from "react";
import { Container, Row, Form, Button, Dropdown, ButtonGroup } from "react-bootstrap";
import Papa from "papaparse";
import './css/DataUpload.css';
import { setDatasets, setUserUploadedData } from "./Store";
import { connect } from "react-redux";
import { MdOutlineWater } from "react-icons/md";
import { TbBuildingFactory } from "react-icons/tb";
import { RiMapPinAddFill, RiLandscapeFill } from "react-icons/ri";
import { iconTypes, getIcon } from "../assets/data/VariableCategories";
import { getUnits } from "../assets/data/DataManager";

function UploadData({ datasets, updateDatasets, userUploadedData, loadDataToStore }) {
  const [dataset_name, setInput1] = useState('');
  const [fileError, setFileError] = useState('');
  const [tempDataStore, setDataStore] = useState(null);
  const [chosenRegion, setChosenRegion] = useState([]);
  const [success, setSuccess] = useState(false);

  const processCSV = (file) => {
    if (!file) return;

    let newData = {};

    // Debug Data
    //console.log("Got Data:", file);
    // List of Scenarios
    const uniqueScenarios = [...new Set(file.map(item => item.scenario).filter(item => item !== undefined))];
    newData.scenarios = uniqueScenarios;
    //console.log('Unique Scenarios:', uniqueScenarios);

    // List of Regions
    const uniqueRegions = [...new Set(file.map(item => item.region).filter(item => item !== undefined))];
    newData.regions = uniqueRegions;
    console.log('Unique Regions:', uniqueRegions);

    // 4. aggClass1_global
    const aggClass1_global = Object.values(file.reduce((acc, item) => {
      const key = item.scenario + '-' + item.param + '-' + item.x + '-' + item.class;
      if (!acc[key]) {
        acc[key] = { ...item };
      } else {
        acc[key].region = "global"
        acc[key].value = parseFloat(acc[key].value) + parseFloat(item.value);
      }
      return acc;
    }, {}));
    //console.log('Aggregate by Scenario, Param, X, Class:', aggClass1_global);
    newData.aggClass1_global = aggClass1_global;

    // List of Parameters
    const uniqueParams = [...new Set(file.map(item => item.param).filter(item => item !== undefined))];
    newData.parameters = uniqueParams.map((param) => {
      let units = getUnits(aggClass1_global, param);
      return {
        title: param,
        units: units.slice(0, units.indexOf("(")).trim(),
        group: autoFillIcons(param)
      }
    });
    //console.log('Unique Params:', uniqueParams);

    // 5. aggParam_global
    const aggParam_regions = Object.values(file.reduce((acc, item) => {
      const key = item.scenario + '-' + item.param + '-' + item.x + '-' + item.region;
      if (!acc[key]) {
        acc[key] = { ...item };
      } else {
        acc[key].value = parseFloat(acc[key].value) + parseFloat(item.value);
      }
      return acc;
    }, {}));
    //console.log('Aggregate by Scenario, Param, X, Region:', aggParam_global);
    newData.aggParam_regions = aggParam_regions;

    // 6. aggParam_region
    const aggParam_global = Object.values(file.reduce((acc, item) => {
      const key = item.scenario + '-' + item.param + '-' + item.x;
      if (!acc[key]) {
        acc[key] = { ...item };
      } else {
        acc[key].region = "global"
        acc[key].value = parseFloat(acc[key].value) + parseFloat(item.value);
      }
      return acc;
    }, {}));
    //console.log('Aggregate by Scenario, Param, X:', aggregateByScenarioParamX);
    newData.aggParam_global = aggParam_global;
    console.log(newData)

    // 7. aggClass1_region
    newData.aggClass1_regions = file;
    setDataStore(newData);
  }

  //Uploading Data
  const submitData = () => {
    // Update Datasets
    let datasetList = [...datasets];
    datasetList.push(dataset_name)
    updateDatasets(datasetList)
    let newDataArray = structuredClone(userUploadedData);
    newDataArray[dataset_name] = tempDataStore;
    loadDataToStore(newDataArray);
    setSuccess(true);
  }

  const checkRegion = (region) => {
    if (!tempDataStore) return false;
    let energyList = ["Africa_Eastern", "Africa_Northern", "Africa_Southern", "Africa_Western", "Argentina", "Australia_NZ", "Brazil", "Canada", "Central America and Caribbean", "Central Asia", "China", "Colombia", "EU-12", "EU-15", "Europe_Eastern", "Europe_Non_EU", "European Free Trade Association", "India", "Indonesia", "Japan", "Mexico", "Middle East", "Pakistan", "Russia", "South Africa", "South America_Northern", "South America_Southern", "South Asia", "South Korea", "Southeast Asia", "Taiwan", "USA"];
    let waterList = ["Arctic_Ocean_Islands", "Northwest_Territories", "Siberia_North_Coast", "Siberia_West_Coast", "Kara_Sea_Coast", "Lena", "Pacific_and_Arctic_Coast", "Scandinavia_North_Coast", "Russia_Barents_Sea_Coast", "Mackenzie", "Iceland", "Sweden", "Finland", "Northern_Dvina", "Hudson_Bay_Coast", "Scotland", "Neva", "Volga", "Atlantic_Ocean_Seaboard", "Baltic_Sea_Coast", "Denmark_Germany_Coast", "Narva", "Saskatchewan_Nelson", "Ireland", "Daugava", "England_and_Wales", "Fraser", "Ems_Weser", "Oder", "Wisla", "Elbe", "Rhine", "Poland_Coast", "Churchill", "Neman", "Scheldt", "Russia_South_East_Coast", "Ural", "Dnieper", "St_Lawrence", "France_West_Coast", "Gobi_Interior", "Amur", "Loire", "Caspian_Sea_Coast", "Seine", "Black_Sea_North_Coast", "Yenisey", "Dniester", "Italy_East_Coast", "Japan", "Caspian_Sea_East_Coast", "Don", "Danube", "Adriatic_Sea_Greece_Black_Sea_Coast", "Ob", "Po", "Amu_Darya", "Italy_West_Coast", "Spain_Portugal_Atlantic_Coast", "France_South_Coast", "Rh(ne", "Mediterranean_Sea_Islands", "Gironde", "North_and_South_Korea", "Bo_Hai_Korean_Bay_North_Coast", "Spain_South_and_East_Coast", "Lake_Balkash", "Tiber", "Black_Sea_South_Coast", "Tagus", "Caspian_Sea_South_West_Coast", "Ebro", "Douro", "Mediterranean_Sea_East_Coast", "Syr_Darya", "Ziya_He_Interior", "China_Coast", "Huang_He", "Mediterranean_South_Coast", "Guadiana", "Central_Iran", "Guadalquivir", "Tigris_Euphrates", "Tarim_Interior", "Africa_North_West_Coast", "Nile", "Persian_Gulf_Coast", "Indus", "Farahrud", "Baja_California", "Plateau_of_Tibet_Interior", "Red_Sea_East_Coast", "Arabian_Peninsula", "Dead_Sea", "Mexico_Northwest_Coast", "Helmand", "Sinai_Peninsula", "Eastern_Jordan_Syria", "Africa_Red_Sea_Gulf_of_Aden_Coast", "Caribbean", "HamuniMashkel", "Taiwan", "Arabian_Sea_Coast", "North_Gulf", "Yangtze", "Sabarmati", "Xun_Jiang", "Hong_(Red_River)", "Ganges_Bramaputra", "Yucatan_Peninsula", "South_China_Sea_Coast", "Mahi", "Mexico_Interior", "Pacific_Central_Coast", "Bay_of_Bengal_North_East_Coast", "Tapti", "Yasai", "Philippines", "Brahamani", "North_Marina_Islands_and_Guam", "Mahandi", "Godavari", "Hainan", "Mekong", "Viet_Nam_Coast", "Salween", "India_North_East_Coast", "India_West_Coast", "Papaloapan", "Rfo_Lerma", "Rfo_Verde", "Grijalva_Usumacinta", "Rfo_Balsas", "Southern_Central_America", "Isthmus_of_Tehuantepec", "Irrawaddy", "Sittang", "Peninsula_Malaysia", "Krishna", "Andaman_Nicobar_Islands", "Africa_West_Coast", "Caribbean_Coast", "Africa_North_Interior", "India_East_Coast", "Chao_Phraya", "Pennar", "Gulf_of_Thailand_Coast", "Niger", "Micronesia", "Lake_Chad", "Senegal", "Cauvery", "Sri_Lanka", "India_South_Coast", "Orinoco", "Colombia_Ecuador_Pacific_Coast", "Palau_and_East_Indonesia", "North_Borneo_Coast", "Volta", "Northeast_South_America_South_Atlantic_Coast", "Gulf_of_Guinea", "Sumatra", "Sulawesi", "Kalimantan", "Magdalena", "Irian_Jaya_Coast", "Amazon", "South_Chile_Pacific_Coast", "Shebelli_Juba", "Africa_East_Central_Coast", "North_Brazil_South_Atlantic_Coast", "Papua_New_Guinea_Coast", "Tocantins", "Java_Timor", "Solomon_Islands", "Madagascar", "Sepik", "Rift_Valley", "Peru_Pacific_Coast", "Fly", "Angola_Coast", "Congo", "Australia_North_Coast", "South_Pacific_Islands", "East_Brazil_South_Atlantic_Coast", "Parnaiba", "Zambezi", "Australia_East_Coast", "Africa_Indian_Ocean_Coast", "Australia_West_Coast", "Sao_Francisco", "Australia_Interior", "Orange", "Uruguay_Brazil_South_Atlantic_Coast", "Namibia_Coast", "Africa_South_Interior", "South_Africa_South_Coast", "Limpopo", "La_Puna_Region", "New_Zealand", "Australia_South_Coast", "Mar_Chiquita", "South_Africa_West_Coast", "Salinas_Grandes", "La_Plata", "North_Chile_Pacific_Coast", "Murray_Darling", "Pampas_Region", "North_Argentina_South_Atlantic_Coast", "Tasmania", "South_America_Colorado", "Negro", "Central_Patagonia_Highlands", "South_Argentina_South_Atlantic_Coast", "Antarctica", "California_River_Basin", "Upper_Mississippi_Basin", "Lower_Mississippi_River_Basin", "Upper_Colorado_River_Basin", "Lower_Colorado_River_Basin", "Great_Basin", "Missouri_River_Basin", "Arkansas_White_Red_Basin", "Texas_Gulf_Coast_Basin", "South_Atlantic_Gulf_Basin", "Great_Lakes_Basin", "Ohio_River_Basin", "Pacific_Northwest_Basin", "Tennessee_River_Basin", "Rio_Grande_River_Basin", "New_England_Basin", "Mid_Atlantic_Basin", "Hawaii", "Narmada"];
    let countryList = ["Armenia", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Australia and Christmas Island and Cocos (Keeling) Islands and Heard Island & McDonald Islands", "Austria", "Bahamas (The)", "Bahrain", "Barbados", "Bangladesh", "Bhutan", "Bolivia", "Botswana", "Brazil", "Aruba", "Belize", "Solomon Islands", "Brunei", "Bulgaria", "Myanmar", "Burundi", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Sri Lanka", "Chad", "Chile", "Colombia", "Comoros", "Congo", "Costa Rica", "Cuba", "Cyprus", "Azerbaijan", "Benin", "Denmark", "Dominica", "Dominican Republic", "Byelarus", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Faroe Islands", "Falkland Islands (Malvinas)", "Fiji", "Finland", "France and French Southern & Antarctic Lands and Glorioso Islands and Juan De Nova Island", "French Guiana", "French Polynesia", "Djibouti", "Georgia", "Gabon", "Gambia (The)", "Germany", "Bosnia and Herzegovina", "Ghana", "Kiribati", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "Croatia", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Kazakhstan", "Jamaica", "Japan", "Jordan", "Kyrgyzstan", "Kenya", "Cambodia", "North Korea", "South Korea", "Kuwait", "Latvia", "Laos", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Marshall Islands", "Madagascar", "Malawi", "Malaysia", "Mali", "Malta", "Martinique", "Mauritania", "Mauritius", "Mexico", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Federated States of Micronesia", "Moldova", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "Macedonia", "Vanuatu", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Norway and Bouvet Island", "Northern Mariana Islands", "Pakistan", "Panama", "Czech Republic", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn Islands", "Poland", "Portugal", "Guinea-Bissau", "Timor-Leste", "Puerto Rico", "Eritrea", "Qatar", "Pacific Islands (Palau)", "Zimbabwe", "Reunion", "Romania", "Rwanda", "Russia", "Serbia and Montenegro", "St. Helena", "St. Kitts and Nevis", "St. Lucia", "St. Pierre and Miquelon", "St. Vincent and the Grenadines", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Slovenia", "Slovakia", "Singapore", "Somalia", "South Africa", "Spain", "Western Sahara", "Sudan", "Suriname", "Tajikistan", "Swaziland", "Sweden", "Switzerland", "Syria", "Turkmenistan", "Tanzania (United Republic of)", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Oman", "Tunisia", "Turkey", "Turks and Caicos Islands", "United Arab Emirates", "Uganda", "United Kingdom and British Indian Ocean Territory and South Georgia and the South Sandwich Is", "Ukraine", "United States and Baker Island and Howland Island and Jarvis Island and Johnston Atoll and Midway Islands", "Burkina Faso", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Ethiopia", "Virgin Islands", "Wallis and Futuna", "Western Samoa", "Yemen", "Zaire", "Zambia", "Belgium", "Luxembourg", "Anguilla", "Guernsey and Jersey", "Svalbard and Jan Mayen", "Man (Isle of)", "Mayotte", "Gaza Strip and West Bank", "Macau", "Hong Kong", "Taiwan", "China and Paracel Islands"];
    let selectedArray = []
    switch (region) {
      case "energy":
        selectedArray = energyList;
        break;
      case "water":
        selectedArray = waterList;
        break;
      case "countries":
        selectedArray = countryList;
        break;
      default:
        selectedArray = energyList;
        break;
    }
    return tempDataStore.regions.sort().join(",") === selectedArray.sort().join(",");
  }

  const handleInputChange = (e, setInput) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9-]*$/;
    if (regex.test(value) && !datasets.includes(value)) {
      setInput(value);
    }
  };

  const handleFileChange = (e) => {
    if (!e || e.target.files.length === 0) {
      return;
    }
    console.log(e);
    setInput1(e.target.files[0].name.replace(".csv", ""));
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      Papa.parse(uploadedFile, {
        header: true,
        complete: (result) => {
          let error = validateCSV(result.data);
          if (error === "") {
            processCSV(result.data.slice(0, -1));
            setFileError('');
          } else {
            setDataStore(null);
            setFileError("Invalid CSV format. Please ensure the file has the column " + error + ".");
          }
        },
        error: (error) => {
          setDataStore(null);
          setFileError('Error parsing CSV file: ' + error.message);
        }
      });
    }
  };

  const validateCSV = (data) => {
    let error = []
    const requiredColumns = ['scenario', 'param', 'x', 'value', 'region', 'class', 'units'];
    if (data.length === 0) return requiredColumns.toString();
    const keys = Object.keys(data[0]);
    requiredColumns.forEach((requirement) => {
      if (!keys.includes(requirement)) {
        error.push(requirement);
      }
    })
    return error.toString();
  };

  const setRegionType = (type, selected) => {
    let temp = chosenRegion;
    if (selected)
      temp.pop(type);
    else {
      if (type === "custom" || temp[0] === "custom" || temp.length === 0)
        temp = [type]
      else
        temp.push(type);
    }
    setChosenRegion(temp);
  }

  const setVariableCategory = (index, category) => {
    let temp = structuredClone(tempDataStore);
    temp.parameters[index].group = category;
    setDataStore(temp);
  }

  const autoFillIcons = (string) => {
    let test = string.toLowerCase().trim();
    if(test.includes("energy") || test.includes("fuel"))
      return "energy";
    if(test.includes("wat") || test.includes("irr") || test.includes("basin") || test.includes("runoff"))
      return "water";
    if(test.includes("elec") || test.includes("fuel"))
      return "electricity";
    if(test.includes("emiss") || test.includes("ghg") || test.includes("co2") || test.includes("methane"))
      return "emissions";
    if(test.includes("land"))
      return "land";
    if(test.includes("agprod"))
      return "agriculture";
    if(test.includes("livestock") || test.includes("meat") || test.includes("dairy"))
      return "livestock";
    if(test.includes("transport") || test.includes("pass") || test.includes("freight"))
      return "transport";
    if(test.includes("build") || test.includes("floor"))
      return "buildings";
    if(test.includes("indus"))
      return "industry";
    if(test.includes("gdp"))
      return "socioeconomic - gdp";
    if(test.includes("pop"))
      return "socioeconomic - population";
    if(test.includes("hydrogen"))
      return "hydrogen";
    return "custom"
  }

  return (
    <div className="body-page-dark page-text-dark data-upload-page">
      <Container>
        <Row>
          <h1 className="page-title page-text-dark">Upload Data</h1>
          <hr className="about-home-hr" />
          <div className="page-subtitle page-text-dark">
            Upload your Data to the Foresight Dashboard.
          </div>
        </Row>
        <hr className="about-home-hr lower-hr" />
        <Row className="data-black-info-box title-info-gap">
          <div className="page-text">
            <div className="data-text-thick">
              Data Requirements:
            </div>
            <ul className="text-left">
              <li>Must be in CSV format.</li>
              <li>
                Must have the following columns in the given format:
                <ul>
                  <li>Scenario (String)</li>
                  <li>Param (String) - Data Variable</li>
                  <li>X (Integer) - Date</li>
                  <li>Value (Integer or Float)</li>
                  <li>Region (String)</li>
                  <li>Class (String)</li>
                  <li>Units (String)</li>
                </ul>
              </li>
              <li>All values must be in the proper units with no NaN values.</li>
            </ul>
          </div>
        </Row>
        <Row className="title-info-gap">
          <h1 className=" upload-page-gap page-smaller-title page-subtitle page-text-dark">Basic Settings</h1>
          <hr className="about-home-hr lower-hr form-gap" />
          <Form>
            <Form.Label className="color-important">* (Required)</Form.Label>
            <Form.Group className="buffer-top">
              <Form.Label>Upload CSV <div className="color-important">*</div></Form.Label>
              <Form.Control
                type="file"
                accept=".csv"
                onChange={handleFileChange}
              />
              {fileError && <p className="text-danger">{fileError}</p>}
            </Form.Group>
            <Form.Group className="buffer-top">
              <Form.Label>Dataset Name <div className="color-important">*</div> </Form.Label>
              <Form.Control
                type="text"
                value={dataset_name}
                onChange={(e) => handleInputChange(e, setInput1)}
                placeholder="Only Letters, Numbers, and Dashes allowed"
                disabled={!tempDataStore}
              />
            </Form.Group>
            <h1 className="upload-page-gap page-smaller-title page-subtitle page-text-dark">Region Settings</h1>
            <hr className="about-home-hr lower-hr form-gap" />
            <Form.Group className="buffer-top">
              <Form.Label>Region Type <div className="color-important">* (Pick one or more)</div> </Form.Label>
              <div className="region-button-bar">
                <Button variant={(chosenRegion.includes("energy")) ? ("secondary") : ("dark")} className="region-button" onClick={() => setRegionType("energy", chosenRegion.includes("energy"))} disabled={!dataset_name || !checkRegion("energy")}>
                  <div>
                    Energy Regions
                  </div>
                  <TbBuildingFactory />
                </Button>
                <Button variant={(chosenRegion.includes("countries")) ? ("secondary") : ("dark")} className="region-button" onClick={() => setRegionType("countries", chosenRegion.includes("countries"))} disabled={!dataset_name || !checkRegion("countries")}>
                  <div>
                    Countries
                  </div>
                  <RiLandscapeFill />
                </Button>
                <Button variant={(chosenRegion.includes("water")) ? ("secondary") : ("dark")} className="region-button" onClick={() => setRegionType("water", chosenRegion.includes("water"))} disabled={!dataset_name || !checkRegion("water")}>
                  <div>
                    Basins
                  </div>
                  <MdOutlineWater />
                </Button>
                <Button
                  variant={(chosenRegion.includes("custom")) ? ("secondary") : ("dark")}
                  className="region-button" onClick={() => setRegionType("custom", chosenRegion === "custom")}
                  disabled={!dataset_name}>
                  <div>
                    Add Custom Region
                  </div>
                  <RiMapPinAddFill />
                </Button>
              </div>
            </Form.Group>
            <h1 className="upload-page-gap page-smaller-title page-subtitle page-text-dark">Data Variable Settings</h1>
            <hr className="about-home-hr lower-hr form-gap" />
            <Form.Group className="buffer-top param-edit-background">
              {(tempDataStore) ? (
                <div className="upload-data-variable-grid">
                  {tempDataStore.parameters.map((param, index) => (
                    <>
                      <div>{param.units + ":"}</div>
                      <Dropdown as={ButtonGroup}>
                        <Button type="button" variant="dark">{tempDataStore.parameters[index].group}</Button>
                        <Dropdown.Toggle
                          split
                          variant="dark"
                          id="dropdown-split-basic"
                        />
                        <Dropdown.Menu>
                          {
                            iconTypes.map((type) => (
                              <div key={type}>
                                <Dropdown.Item type="button" as="button" //active={selection === guage.title ? true : false}
                                  onClick={() => setVariableCategory(index, type)}>
                                  {type.charAt(0).toUpperCase() + type.slice(1)} {getIcon(type, true)}
                                </Dropdown.Item>
                              </div >
                            ))
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                    </>
                  ))}
                </div>
              ) : "Please Submit a CSV File to see Data Variable Options"}
            </Form.Group>
            <Button variant={(!dataset_name || !tempDataStore || chosenRegion.length === 0) ? "dark" : "secondary"} onClick={() => submitData()} disabled={!dataset_name || !tempDataStore || chosenRegion.length === 0}>Submit</Button>
            <div className="inline-success">{(success)?"Dataset Uploaded Successfully!":""}</div>
          </Form>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    datasets: state.datasets,
    userUploadedData: state.userUploadedData,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    updateDatasets: (datasets) => dispatch(setDatasets(datasets)),
    loadDataToStore: (data) => dispatch(setUserUploadedData(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadData);