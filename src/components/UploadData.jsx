import React, { useState } from "react";
import { Container, Row, Form, Button, Dropdown, ButtonGroup } from "react-bootstrap";
import Papa from "papaparse";
import './css/UploadData.css';
import { setDatasetList, setDatasetData, setDatasetInfo } from "./Store";
import { connect } from "react-redux";
import { getUnits } from "./data/DataManager";
import { iconTypes, getIcon } from "./data/VariableCategories";

/**
 * UploadData component. Is accessed through the main dashbar. 
 * This icon is displayed next to the gauges and the selection.
 * 
 * @param {object} props - The component props.
 * @param {string[]} props.datasets - State indicating all current datasets.
 * @param {(datasets: string[]) => any} props.updateDatasets - Function to update the 
 * list of all datasets.
 * @param {object} props.userUploadedData - State containing all user uploaded datasets.
 * @param {(data: object) => any} props.loadDataToStore - Function to 
 * update the stored user-uploaded data.
 * @param {(data: object) => any} props.setDatasetInfo - Function to 
 * update the stored user-uploaded data headers.
 * @param {object} props.userUploadedDataInfo - State containing all user uploaded 
 * dataset headers.
 * @returns {ReactElement} The icon component for the specified category.
 */
function UploadData({ datasets, updateDatasets, userUploadedData, loadDataToStore, setDatasetInfo, userUploadedDataInfo }) {
  const [dataset_name, setInput1] = useState('');
  const [fileError, setFileError] = useState('');
  const [tempDataStore, setDataStore] = useState(null);
  const [tempDataInfoStore, setDataInfoStore] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const setTitle = (title) => {
    let temp = structuredClone(tempDataInfoStore);
    temp.dataset = title;
    setDataInfoStore(temp);
    setInput1(title);
  }

  const processCSV = (file) => {
    if (!file) return;

    let newData = {};

    // Debug Data
    //console.log("Got Data:", file);
    // List of Scenarios
    const uniqueScenarios = [...new Set(file.map(item => item.scenario).filter(item => item !== undefined))];
    //console.log('Unique Scenarios:', uniqueScenarios);

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
    let parameters = [];
    uniqueParams.forEach((param) => {
      let units = getUnits(aggClass1_global, param);
      parameters[param] = {
        title: param,
        units: units.slice(0, units.indexOf("(")).trim(),
        group: autoFillIcons(param),
        region: checkRegion(file.filter(item => item.param === param)[0].region)
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
    //console.log(newData)

    // 7. aggClass1_region
    newData.aggClass1_regions = file;
    setDataStore(newData);

    const dataInfo = {
      dataset: dataset_name,
      scenarios: uniqueScenarios,
      params: parameters,
      defaults: parameters.slice(0, 5)
    }
    //console.log(dataInfo);
    setDataInfoStore(dataInfo);
  }

  //Uploading Data
  const submitData = () => {
    setLoading(true);
    // Update Datasets
    let datasetList = [...datasets];
    datasetList.push(dataset_name)
    updateDatasets(datasetList)

    //Make copies of all data structures. Slow and needs improvement.
    let newDataArray = structuredClone(userUploadedData);
    let newDataInfo = structuredClone(userUploadedDataInfo);
    let newDataInfoLocal = structuredClone(tempDataInfoStore);

    //Update dataset name to reflect most recent change.
    newDataInfoLocal.dataset = dataset_name;
    newDataInfo.push(newDataInfoLocal);
    newDataArray[dataset_name] = tempDataStore;

    //Load data and mark as successful.
    loadDataToStore(newDataArray);
    setDatasetInfo(newDataInfo);

    setInput1('');
    setFileError('');
    setDataStore(null);
    setDataInfoStore(null);
    document.getElementById("upload-files").value = "";
    setSuccess(true);
    setLoading(false);
  }

  const checkRegion = (country) => {
    let energyList = ["Africa_Eastern", "Africa_Northern", "Africa_Southern", "Africa_Western", "Argentina", "Australia_NZ", "Brazil", "Canada", "Central America and Caribbean", "Central Asia", "China", "Colombia", "EU-12", "EU-15", "Europe_Eastern", "Europe_Non_EU", "European Free Trade Association", "India", "Indonesia", "Japan", "Mexico", "Middle East", "Pakistan", "Russia", "South Africa", "South America_Northern", "South America_Southern", "South Asia", "South Korea", "Southeast Asia", "Taiwan", "USA"];
    let waterList = ["Arctic_Ocean_Islands", "Northwest_Territories", "Siberia_North_Coast", "Siberia_West_Coast", "Kara_Sea_Coast", "Lena", "Pacific_and_Arctic_Coast", "Scandinavia_North_Coast", "Russia_Barents_Sea_Coast", "Mackenzie", "Iceland", "Sweden", "Finland", "Northern_Dvina", "Hudson_Bay_Coast", "Scotland", "Neva", "Volga", "Atlantic_Ocean_Seaboard", "Baltic_Sea_Coast", "Denmark_Germany_Coast", "Narva", "Saskatchewan_Nelson", "Ireland", "Daugava", "England_and_Wales", "Fraser", "Ems_Weser", "Oder", "Wisla", "Elbe", "Rhine", "Poland_Coast", "Churchill", "Neman", "Scheldt", "Russia_South_East_Coast", "Ural", "Dnieper", "St_Lawrence", "France_West_Coast", "Gobi_Interior", "Amur", "Loire", "Caspian_Sea_Coast", "Seine", "Black_Sea_North_Coast", "Yenisey", "Dniester", "Italy_East_Coast", "Japan", "Caspian_Sea_East_Coast", "Don", "Danube", "Adriatic_Sea_Greece_Black_Sea_Coast", "Ob", "Po", "Amu_Darya", "Italy_West_Coast", "Spain_Portugal_Atlantic_Coast", "France_South_Coast", "Rh(ne", "Mediterranean_Sea_Islands", "Gironde", "North_and_South_Korea", "Bo_Hai_Korean_Bay_North_Coast", "Spain_South_and_East_Coast", "Lake_Balkash", "Tiber", "Black_Sea_South_Coast", "Tagus", "Caspian_Sea_South_West_Coast", "Ebro", "Douro", "Mediterranean_Sea_East_Coast", "Syr_Darya", "Ziya_He_Interior", "China_Coast", "Huang_He", "Mediterranean_South_Coast", "Guadiana", "Central_Iran", "Guadalquivir", "Tigris_Euphrates", "Tarim_Interior", "Africa_North_West_Coast", "Nile", "Persian_Gulf_Coast", "Indus", "Farahrud", "Baja_California", "Plateau_of_Tibet_Interior", "Red_Sea_East_Coast", "Arabian_Peninsula", "Dead_Sea", "Mexico_Northwest_Coast", "Helmand", "Sinai_Peninsula", "Eastern_Jordan_Syria", "Africa_Red_Sea_Gulf_of_Aden_Coast", "Caribbean", "HamuniMashkel", "Taiwan", "Arabian_Sea_Coast", "North_Gulf", "Yangtze", "Sabarmati", "Xun_Jiang", "Hong_(Red_River)", "Ganges_Bramaputra", "Yucatan_Peninsula", "South_China_Sea_Coast", "Mahi", "Mexico_Interior", "Pacific_Central_Coast", "Bay_of_Bengal_North_East_Coast", "Tapti", "Yasai", "Philippines", "Brahamani", "North_Marina_Islands_and_Guam", "Mahandi", "Godavari", "Hainan", "Mekong", "Viet_Nam_Coast", "Salween", "India_North_East_Coast", "India_West_Coast", "Papaloapan", "Rfo_Lerma", "Rfo_Verde", "Grijalva_Usumacinta", "Rfo_Balsas", "Southern_Central_America", "Isthmus_of_Tehuantepec", "Irrawaddy", "Sittang", "Peninsula_Malaysia", "Krishna", "Andaman_Nicobar_Islands", "Africa_West_Coast", "Caribbean_Coast", "Africa_North_Interior", "India_East_Coast", "Chao_Phraya", "Pennar", "Gulf_of_Thailand_Coast", "Niger", "Micronesia", "Lake_Chad", "Senegal", "Cauvery", "Sri_Lanka", "India_South_Coast", "Orinoco", "Colombia_Ecuador_Pacific_Coast", "Palau_and_East_Indonesia", "North_Borneo_Coast", "Volta", "Northeast_South_America_South_Atlantic_Coast", "Gulf_of_Guinea", "Sumatra", "Sulawesi", "Kalimantan", "Magdalena", "Irian_Jaya_Coast", "Amazon", "South_Chile_Pacific_Coast", "Shebelli_Juba", "Africa_East_Central_Coast", "North_Brazil_South_Atlantic_Coast", "Papua_New_Guinea_Coast", "Tocantins", "Java_Timor", "Solomon_Islands", "Madagascar", "Sepik", "Rift_Valley", "Peru_Pacific_Coast", "Fly", "Angola_Coast", "Congo", "Australia_North_Coast", "South_Pacific_Islands", "East_Brazil_South_Atlantic_Coast", "Parnaiba", "Zambezi", "Australia_East_Coast", "Africa_Indian_Ocean_Coast", "Australia_West_Coast", "Sao_Francisco", "Australia_Interior", "Orange", "Uruguay_Brazil_South_Atlantic_Coast", "Namibia_Coast", "Africa_South_Interior", "South_Africa_South_Coast", "Limpopo", "La_Puna_Region", "New_Zealand", "Australia_South_Coast", "Mar_Chiquita", "South_Africa_West_Coast", "Salinas_Grandes", "La_Plata", "North_Chile_Pacific_Coast", "Murray_Darling", "Pampas_Region", "North_Argentina_South_Atlantic_Coast", "Tasmania", "South_America_Colorado", "Negro", "Central_Patagonia_Highlands", "South_Argentina_South_Atlantic_Coast", "Antarctica", "California_River_Basin", "Upper_Mississippi_Basin", "Lower_Mississippi_River_Basin", "Upper_Colorado_River_Basin", "Lower_Colorado_River_Basin", "Great_Basin", "Missouri_River_Basin", "Arkansas_White_Red_Basin", "Texas_Gulf_Coast_Basin", "South_Atlantic_Gulf_Basin", "Great_Lakes_Basin", "Ohio_River_Basin", "Pacific_Northwest_Basin", "Tennessee_River_Basin", "Rio_Grande_River_Basin", "New_England_Basin", "Mid_Atlantic_Basin", "Hawaii", "Narmada"];
    let countryList = ["Armenia", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Australia and Christmas Island and Cocos (Keeling) Islands and Heard Island & McDonald Islands", "Austria", "Bahamas (The)", "Bahrain", "Barbados", "Bangladesh", "Bhutan", "Bolivia", "Botswana", "Brazil", "Aruba", "Belize", "Solomon Islands", "Brunei", "Bulgaria", "Myanmar", "Burundi", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Sri Lanka", "Chad", "Chile", "Colombia", "Comoros", "Congo", "Costa Rica", "Cuba", "Cyprus", "Azerbaijan", "Benin", "Denmark", "Dominica", "Dominican Republic", "Byelarus", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Faroe Islands", "Falkland Islands (Malvinas)", "Fiji", "Finland", "France and French Southern & Antarctic Lands and Glorioso Islands and Juan De Nova Island", "French Guiana", "French Polynesia", "Djibouti", "Georgia", "Gabon", "Gambia (The)", "Germany", "Bosnia and Herzegovina", "Ghana", "Kiribati", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "Croatia", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Kazakhstan", "Jamaica", "Japan", "Jordan", "Kyrgyzstan", "Kenya", "Cambodia", "North Korea", "South Korea", "Kuwait", "Latvia", "Laos", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Marshall Islands", "Madagascar", "Malawi", "Malaysia", "Mali", "Malta", "Martinique", "Mauritania", "Mauritius", "Mexico", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Federated States of Micronesia", "Moldova", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "Macedonia", "Vanuatu", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Norway and Bouvet Island", "Northern Mariana Islands", "Pakistan", "Panama", "Czech Republic", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn Islands", "Poland", "Portugal", "Guinea-Bissau", "Timor-Leste", "Puerto Rico", "Eritrea", "Qatar", "Pacific Islands (Palau)", "Zimbabwe", "Reunion", "Romania", "Rwanda", "Russia", "Serbia and Montenegro", "St. Helena", "St. Kitts and Nevis", "St. Lucia", "St. Pierre and Miquelon", "St. Vincent and the Grenadines", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Slovenia", "Slovakia", "Singapore", "Somalia", "South Africa", "Spain", "Western Sahara", "Sudan", "Suriname", "Tajikistan", "Swaziland", "Sweden", "Switzerland", "Syria", "Turkmenistan", "Tanzania (United Republic of)", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Oman", "Tunisia", "Turkey", "Turks and Caicos Islands", "United Arab Emirates", "Uganda", "United Kingdom and British Indian Ocean Territory and South Georgia and the South Sandwich Is", "Ukraine", "United States and Baker Island and Howland Island and Jarvis Island and Johnston Atoll and Midway Islands", "Burkina Faso", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Ethiopia", "Virgin Islands", "Wallis and Futuna", "Western Samoa", "Yemen", "Zaire", "Zambia", "Belgium", "Luxembourg", "Anguilla", "Guernsey and Jersey", "Svalbard and Jan Mayen", "Man (Isle of)", "Mayotte", "Gaza Strip and West Bank", "Macau", "Hong Kong", "Taiwan", "China and Paracel Islands"];
    if(energyList.includes(country))
      return "region";
    else if(waterList.includes(country))
      return "glu";
    else if(countryList.includes(country))
      return "country";
    else if(country === 'global' || country === 'Global')
      return "global";
    return "region";
  }

  const handleInputChange = (e, setInput) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9-]*$/;
    if (regex.test(value) && !datasets.includes(value)) {
      setInput(value);
    }
  };

  const handleParamChange = (e, param) => {
    const value = e.target.value;
    // eslint-disable-next-line
    const regex = /^[\[\]a-z A-Z0-9-]*$/;
    if (regex.test(value) && value.length > 0) {
      let temp = structuredClone(tempDataInfoStore);
      temp.params[param].units = value;
      //console.log(value, temp);
      setDataInfoStore(temp);
    }
  };

  const setVariableCategory = (index, category) => {
    let temp = structuredClone(tempDataInfoStore);
    temp.params[index].group = category;
    setDataInfoStore(temp);
  }

  function incrementEndingNumber(str) {
    return str.replace(/_(\d+)$/, function(match, p1) {
      return '_' + (parseInt(p1, 10) + 1);
    });
  }

  const getUniqueName = (datasetName, flag) => {
    //console.log(datasets.includes(datasetName), datasetName, flag)
    if(!datasets.includes(datasetName))
      return datasetName;
    if (flag) {
      return getUniqueName(datasetName + '_1', false);
    }
    return getUniqueName(incrementEndingNumber(datasetName), false);
  }
  const handleFileChange = (e) => {
    if (!e || e.target.files.length === 0) {
      return;
    }
    //console.log(e);
    setInput1(e.target.files[0].name.replace(".csv", ""));
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setLoading(true);
      setDataStore(null);
      setDataInfoStore(null);
      Papa.parse(uploadedFile, {
        header: true,
        complete: (result) => {
          setLoading(false);
          let error = validateCSV(result.data);
          if (error === "") {
            if(result.data[0].dataset) setInput1(getUniqueName(result.data[0].dataset, true));
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

  const autoFillIcons = (string) => {
    let test = string.toLowerCase().trim();
    if (test.includes("energy") || test.includes("fuel"))
      return "energy";
    if (test.includes("wat"))
      return "water";
    if (test.includes("elec"))
      return "electricity";
    if (test.includes("emiss"))
      return "emissions";
    if (test.includes("land"))
      return "land";
    if (test.includes("agprod"))
      return "agriculture";
    if (test.includes("irr") || test.includes("basin") || test.includes("runoff"))
      return "water";
    if (test.includes("fuel"))
      return "electricity";
    if (test.includes("ghg") || test.includes("co2") || test.includes("methane"))
      return "emissions";
    if (test.includes("livestock") || test.includes("meat") || test.includes("dairy"))
      return "livestock";
    if (test.includes("transport") || test.includes("pass") || test.includes("freight"))
      return "transport";
    if (test.includes("build") || test.includes("floor"))
      return "buildings";
    if (test.includes("indus"))
      return "industry";
    if (test.includes("gdp"))
      return "socioeconomic - gdp";
    if (test.includes("pop"))
      return "socioeconomic - population";
    if (test.includes("hydrogen"))
      return "hydrogen";
    return "other"
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
              <li>NOTE: This feature is in heavy development.
                There will be features that have many bugs and can potentially crash the site.
                Please use this feature at your own risk. If you encounter bugs please report them to the
                <a href="https://github.com/JGCRI/foresight/issues" target="_blank" rel="noreferrer"> Foresight Github</a>.
              </li>
              <li>All data must be in CSV format.</li>
              <li>
                All data must have the following columns. All other columns will be ignored:
                <ul>
                  <li>scenario (String)</li>
                  <li>param (String) - Data Variable</li>
                  <li>x (Integer) - Date</li>
                  <li>value (Integer or Float)</li>
                  <li>region (String)</li>
                  <li>class (String)</li>
                  <li>units (String)</li>
                  <li>dataset (String) <div className="color-optional">(Optional)</div> - Dataset Name</li>
                </ul>
              </li>
              <li>All values must be in the proper units with no NaN values.</li>
              <li>Once the data is uploaded, it can be accessed by the datasets dropdown in the navigation bar.</li>
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
                id="upload-files"
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
                onChange={(e) => handleInputChange(e, setTitle)}
                placeholder="Only Letters, Numbers, and Dashes allowed"
                disabled={!tempDataStore}
                error={datasets.includes(dataset_name)}
                helperText={datasets.includes(dataset_name) ? "Dataset Name must be unique" : ""}
              />
            </Form.Group>
            <h1 className="upload-page-gap page-smaller-title page-subtitle page-text-dark">Data Variable Settings</h1>
            <hr className="about-home-hr lower-hr form-gap" />
            <Form.Group className="buffer-top param-edit-background">
              {(tempDataInfoStore) ? (
                <div className="upload-data-variable-grid">
                  <strong>Param</strong>
                  <strong>Display Name</strong>
                  <strong>Category</strong>
                  {Object.keys(tempDataInfoStore.params).map((param, index) => (
                    <>
                      <div>{param + ":"}</div>
                      <Form.Control
                        type="text"
                        value={tempDataInfoStore.params[param].units}
                        onChange={(e) => handleParamChange(e, param)}
                        placeholder="Only Letters, Numbers, and Dashes allowed"
                        disabled={!tempDataStore}
                      />
                      <Dropdown as={ButtonGroup}>
                        <Button type="button" variant="dark">{tempDataInfoStore.params[param].group}</Button>
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
                                  onClick={() => setVariableCategory(param, type)}>
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
              ) : loading ? "Validating Submitted Data File..." : "Please Submit a CSV File to see Data Variable Options"}
            </Form.Group>
            <Button variant={(loading || !dataset_name || !tempDataStore || !tempDataInfoStore || dataset_name.length <= 0) ? "dark" : "secondary"} onClick={() => submitData()} disabled={!dataset_name || !tempDataStore || !tempDataInfoStore || dataset_name.length <= 0}>Submit</Button>
            <div className="inline-success">{(success) ? "Dataset Uploaded Successfully!" : ""}</div>
          </Form>
        </Row>
      </Container>
    </div>
  );
}

/**
 * Maps the state from the Redux store to the component props.
 * 
 * @param {object} state - The current state.
 * @returns {object} The mapped props.
 */
const mapStateToProps = (state) => {
  return {
    datasets: state.datasetList,
    userUploadedData: state.datasetData,
    userUploadedDataInfo: state.datasetInfo,
  };
};

/**
 * Maps the dispatch functions to the component props.
 * 
 * @param {Function} dispatch - The dispatch function.
 * @returns {object} The mapped props.
 */
function mapDispatchToProps(dispatch) {
  return {
    updateDatasets: (datasets) => dispatch(setDatasetList(datasets)),
    loadDataToStore: (data) => dispatch(setDatasetData(data)),
    setDatasetInfo: (data) => dispatch(setDatasetInfo(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadData);