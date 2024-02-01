import React, {useEffect, useCallback} from "react";
import { Container, Row, Col } from "react-bootstrap";
import SidebarDashboard from "./SidebarDashboard.jsx";
import { connect } from "react-redux";
import DateDropdown from "./dropdowns/DashboardDate";
import DashboardScenerioRows from "./dropdowns/DashboardScenerioRows";
import DashboardGraphs from "./DashboardGraphs.jsx";
import { MdError, MdElectricBolt, MdGroups, MdFilterHdr } from "react-icons/md";
import { GiCorn, GiFactory, GiWaterDrop } from "react-icons/gi";
import { TbCoins } from "react-icons/tb";
import { FaThermometerHalf } from "react-icons/fa"
import { setdashboardSelection, setStartDate, setEndDate, setScenerios, setParsed, setParsedSub, setParsedReg, setParsedRegSub} from "./Store";
import './css/Dashboard.css';
import scenarios from "../assets/data/Scenarios.jsx";
import DashboardFloater from "./dropdowns/DashboardFloater.jsx";

import { API, graphqlOperation } from "aws-amplify";

//UNUSED, Only For testing: Keeps track of the distance of the selection-divider and the top of the screen.
//Allows divider to scroll with page.
const scrollHandler = () => {
  let divider = document.querySelector('.selection-divider');
  let y = window.scrollY + divider.getBoundingClientRect().bottom;
  if (y < 100) {
    divider.style.top = '100'
  }
  else {
    divider.style.top = 'auto'
  }
};

//Gets the icon of each category by name. Shows up next to the guages and the selection.
export const getIcon = (selection) => {
  switch (selection) {
    case "watConsumBySec":
      return <GiWaterDrop />;
    case "watWithdrawBySec":
      return <GiWaterDrop />;
    case "agProdByCrop":
      return <GiCorn />;
    case "temp":
      return <FaThermometerHalf />;
    case "emiss":
      return <GiFactory />;
    case "pop":
      return <MdGroups />;
    case "gdp":
      return <TbCoins />;
    case "elecByTechTWh":
      return <MdElectricBolt />
    case "landAlloc":
      return <MdFilterHdr />
    default:
      return <MdError />;
  }
}

//Updates the URL hash for single parameter hashes. Takes in the name and value of the hash.
//Does not guarentee order of placement.
export const updateHash = (name, value) => {
  var searchParams = new URLSearchParams(window.location.hash.substring(1));
  if (!searchParams.has(name))
    searchParams.append(name, value);
  else
    searchParams.set(name, value);
  window.location.hash = searchParams.toString();
}

//Updates the URL hash for a hash comprising of a list. Each element of the list must be added
//through this function and will be seperated by commas.
export const updateListHash = (name, index, value) => {
  var searchParams = new URLSearchParams(window.location.hash.substring(1));
  if (searchParams.has(name)) {
    let arr = searchParams.get(name).toString().split(",");
    arr[index] = value;
    searchParams.set(name, arr.join(","));
    window.location.hash = searchParams.toString();
  }
}

function Dashboard({ open, selection, updateCurrentGuage, updateStart, updateEnd, updateScenerios, openScenerios, openGuages, updateParse, updateParseReg, updateParseSub, updateParseRegSub, curYear }) {  
  //GraphQL Querries for dahsboard data.
  const queryRegSub = `
    query MyQuery($nextToken: String) {
      listGcamDataTableAggParamGlobals(limit: 100000, nextToken: $nextToken) {
        items {
          id
          value
          x
          scenario
          units
          param
        }
        nextToken
      }
    }
  `;
  const querySub = `
    query MyQuery($param: String!, $nextToken: String) {
      listGcamDataTableAggParamRegions(filter: {param: {eq: $param}}, limit: 100000, nextToken: $nextToken) {
        items {
          id
          value
          x
          scenario
          param
          region
        }
        nextToken
      }
    }
  `;
  const queryReg = `
    query MyQuery($param: String!, $nextToken: String) {
      listGcamDataTableAggClass1Globals(filter: {param: {eq: $param}}, limit: 100000, nextToken: $nextToken) {
        items {
          id
          value
          x
          scenario
          param
          region
          classLabel
          class
        }
        nextToken
      }
    }
  `;
  const query = `
    query MyQuery($param: String!, $year: Int!, $nextToken: String) {
      listGcamDataTableAggClass1Regions(filter: {x: {eq: $year}, param: {eq: $param}}, limit: 100000, nextToken: $nextToken) {
        items {
          id
          value
          x
          scenario
          param
          region
          classLabel
          class
        }
        nextToken
      }
    }
  `;
  //Retrieves data for all four needed categories.
  //Raw data, Aggregate Region, Aggregate Subcategory, and Aggregate Region and Subcategory.
  const fetchForesightRegSub = useCallback(async () => {
    let nextToken = null;
    let allItems = [];

    try {
      do {
        const response = await API.graphql(
          graphqlOperation(queryRegSub, {
           nextToken
          })
        );
        //console.log("PAGINATION:" + response.data.listGcamDataTableAggParamGlobals.nextToken);
        //console.log("Foresight data reg sub response:", response.data); // Print the response data

        const items = response.data.listGcamDataTableAggParamGlobals.items;
        allItems = allItems.concat(items);

        nextToken = response.data.listGcamDataTableAggParamGlobals.nextToken;
      } while(nextToken);
      
      allItems.sort((a,b) => a.x - b.x);
      updateParseRegSub(allItems);
    } catch (error) {
      console.error(error);
  }
  }, [selection, queryRegSub, updateParseRegSub]);
  const fetchForesightSub = useCallback(async () => {
    let nextToken = null;
    let allItems = [];

    try {
      do {
        const response = await API.graphql(
          graphqlOperation(querySub, {
            param: selection, nextToken
          })
        );
        const items = response.data.listGcamDataTableAggParamRegions.items;
        allItems = allItems.concat(items);

        nextToken = response.data.listGcamDataTableAggParamRegions.nextToken;
      } while(nextToken);
      
      allItems.sort((a,b) => a.x - b.x);
      updateParseSub(allItems);
    } catch (error) {
      console.error(error);
  }
  }, [selection, querySub, updateParseSub]);
  const fetchForesightReg = useCallback(async () => {
    let nextToken = null;
    let allItems = [];

    try {
      do {
        const response = await API.graphql(
          graphqlOperation(queryReg, {
            param: selection, nextToken
          })
        );
        //console.log("PAGINATION:" + response.data.listGcamDataTableAggClass1Globals.nextToken);
        //console.log("Foresight data reg response:", response.data); // Print the response data

        const items = response.data.listGcamDataTableAggClass1Globals.items;
        allItems = allItems.concat(items);

        nextToken = response.data.listGcamDataTableAggClass1Globals.nextToken;
      } while(nextToken);
      
      allItems.sort((a,b) => a.x - b.x);
      updateParseReg(allItems);
    } catch (error) {
      console.error(error);
  }
  }, [selection, queryReg, updateParseReg]);
  const fetchForesight = useCallback(async () => {
    let nextToken = null;
    let allItems = [];

    try {
      do {
        const response = await API.graphql(
          graphqlOperation(query, {
            param: selection, year: curYear, nextToken
          })
        );
        //console.log("PAGINATION:" + response.data.listGcamDataTableAggClass1Regions.nextToken);
        //console.log("Foresight data response:", response.data); // Print the response data

        const items = response.data.listGcamDataTableAggClass1Regions.items;
        allItems = allItems.concat(items);

        nextToken = response.data.listGcamDataTableAggClass1Regions.nextToken;
      } while(nextToken);
      
      allItems.sort((a,b) => a.x - b.x);
      updateParse(allItems);
    } catch (error) {
      console.error(error);
  }
  }, [curYear, selection, query, updateParse]);

  //For each change in selection, parses from AWS.
  useEffect(() => {
    updateParseReg("i");
    updateParseSub("i");
    updateParseRegSub("i");
    fetchForesightRegSub();
    fetchForesightSub();
    fetchForesightReg();
  }, [selection, updateParse, updateParseReg, updateParseSub, updateParseRegSub, fetchForesightRegSub, fetchForesightSub, fetchForesightReg, fetchForesight]);

  useEffect(() => {
    console.log("UPDATE QUERRY DATE:", curYear);
    updateParse("i");
    fetchForesight();
  }, [curYear, selection, updateParse, updateParseReg, updateParseSub, updateParseRegSub, fetchForesightRegSub, fetchForesightSub, fetchForesightReg, fetchForesight]);

  

  //Ran at the beginning of loading the dashboard right from an URL. Takes items in the hash and populates
  //the dashboard with them.
  const setDataParameters = () => {
    var searchParams = new URLSearchParams(window.location.hash.substring(1));
    if (searchParams.has("start") && searchParams.has("end")) {
      const newStart = Number(searchParams.get("start"));
      const newEnd = Number(searchParams.get("end"));
      if (newStart > 0 && newEnd > 0 && newStart < newEnd) {
        updateStart(searchParams.get("start"));
        updateEnd(searchParams.get("end"));
      }
    }
    if (searchParams.has("selected")) {
      for (var i = 0; i < openGuages.length; i++) {
        if (openGuages.at(i).title === searchParams.get("selected")) {
          updateCurrentGuage(searchParams.get("selected"));
        }
      }
    }
    if (searchParams.has("scenerios")) {
      let arr = searchParams.get("scenerios").toString().split(",");
      for (var j = 0; j < openScenerios.length; j++) {
        var flag = 0;
        for(var k = 0; k < scenarios.length; k++) {
          if(arr[j].at(k).title === arr[j])
            flag = 1;
        }
        if (flag === 1)
          updateScenerios(j, arr[j], openScenerios);
      }
    }
  }

  return (
    <div className="body-page-dark">
      <SidebarDashboard></SidebarDashboard>
      {setDataParameters()}
      <div className={open ? "dashboard" : "dashboardClosed"} onScroll={scrollHandler}>
        <Container fluid>
          <Row className="date-select-row">
            <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
              % Change from :
            </Col>
            <Col>
              <DateDropdown
                year={2015}
                isOrNotStart={0}
              />
            </Col>
            <Col className="date-select-text" xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
              to
            </Col>
            <Col>
              <DateDropdown
                year={2100}
                isOrNotStart={1}
              />
            </Col>
          </Row>
          <DashboardScenerioRows
            Scenarios={scenarios}
          />
          <Row className="selection-divider">
            <DashboardFloater />
          </Row>
          <Row>
            <DashboardGraphs />
          </Row>
        </Container>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    open: state.open,
    selection: state.dashboardSelection,
    openScenerios: state.scenerios,
    openGuages: state.guages,
    parse: state.parsedData,
    curYear: state.dashboardYear,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleOpen: () => dispatch({ type: "toggleOpen" }),
    updateStart: (start) => dispatch(setStartDate(start)),
    updateEnd: (end) => dispatch(setEndDate(end)),
    updateCurrentGuage: (guage) => dispatch(setdashboardSelection(guage)),
    updateScenerios: (index, name, scenerios) => dispatch(setScenerios(index, name, scenerios)),
    updateParse: (data) => dispatch(setParsed(data)),
    updateParseReg: (data) => dispatch(setParsedReg(data)),
    updateParseSub: (data) => dispatch(setParsedSub(data)),
    updateParseRegSub: (data) => dispatch(setParsedRegSub(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
