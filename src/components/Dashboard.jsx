import React, {useEffect, useCallback} from "react";
import { Container, Row, Col } from "react-bootstrap";
import SidebarDashboard from "./SidebarDashboard.jsx";
import { connect } from "react-redux";
import DateDropdown from "./dropdowns/DashboardDate";
import DashboardScenerioRows from "./dropdowns/DashboardScenerioRows";
import DashboardGraphs from "./DashboardGraphs.jsx";
import { MdError, MdGroups } from "react-icons/md";
import { GiCorn, GiFactory, GiWaterDrop } from "react-icons/gi";
import { TbCoins } from "react-icons/tb";
import { FaThermometerHalf } from "react-icons/fa"
import { setdashboardSelection, setStartDate, setEndDate, setScenerios, setParsed, setParsedSub, setParsedReg, setParsedRegSub} from "./Store";
import './css/Dashboard.css';
import scenarios from "../assets/data/Scenarios.jsx";
import DashboardFloater from "./dropdowns/DashboardFloater.jsx";

import { API, graphqlOperation } from "aws-amplify";

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

export const getIcon = (selection) => {
  switch (selection) {
    case "runoff":
      return <GiWaterDrop />;
    case "yields":
      return <GiCorn />;
    case "temp":
      return <FaThermometerHalf />;
    case "emiss":
      return <GiFactory />;
    case "pop":
      return <MdGroups />;
    case "gdp":
      return <TbCoins />;
    default:
      return <MdError />;
  }
}

export const updateHash = (name, value) => {
  var searchParams = new URLSearchParams(window.location.hash.substring(1));
  if (!searchParams.has(name))
    searchParams.append(name, value);
  else
    searchParams.set(name, value);
  window.location.hash = searchParams.toString();
}

export const updateListHash = (name, index, value) => {
  var searchParams = new URLSearchParams(window.location.hash.substring(1));
  if (searchParams.has(name)) {
    let arr = searchParams.get(name).toString().split(",");
    arr[index] = value;
    searchParams.set(name, arr.join(","));
    window.location.hash = searchParams.toString();
  }
}

function Dashboard({ open, selection, updateCurrentGuage, updateStart, updateEnd, updateScenerios, openScenerios, openGuages, updateParse, updateParseReg, updateParseSub, updateParseRegSub }) {
  const queryRegSub = `
    query MyQuery($param: String!) {
      listGcamDataTableAggParamGlobals(filter: {param: {eq: $param}}, limit: 1000000) {
        items {
          id
          value
          x
          scenario
          param
        }
      }
    }
  `;
  const querySub = `
    query MyQuery($param: String!) {
      listGcamDataTableAggParamRegions(filter: {param: {eq: $param}}, limit: 1000000) {
        items {
          id
          value
          x
          scenario
          param
          region
        }
      }
    }
  `;
  const queryReg = `
    query MyQuery($param: String!) {
      listGcamDataTableAggClass1Globals(filter: {param: {eq: $param}}, limit: 1000000) {
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
      }
    }
  `;
  const query = `
  query MyQuery($param: String!) {
    listGcamDataTableAggClass1Regions(filter: {param: {eq: $param}}, limit: 2000000) {
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
    }
  }
`;

  const fetchForesightRegSub = useCallback(async () => {
    try {
      const { data } = await API.graphql(
        graphqlOperation(queryRegSub, {
          param: selection,
        })
      );
      console.log(selection);
      console.log("Foresight regsub data response:", data); // Print the response data
      let input = data.listGcamDataTableAggParamGlobals.items;
      input.sort((a,b) => a.x - b.x);
      updateParseRegSub(input);
    } catch (error) {
      console.log(error);
  }
  }, [selection, queryRegSub, updateParseRegSub]);
  const fetchForesightSub = useCallback(async () => {
    try {
      const { data } = await API.graphql(
        graphqlOperation(querySub, {
          param: selection,
        })
      );
      console.log(selection);
      console.log("Foresight sub data response:", data); // Print the response data
      let input = data.listGcamDataTableAggParamRegions.items;
      input.sort((a,b) => a.x - b.x);
      updateParseSub(input);
    } catch (error) {
      console.log(error);
  }
  }, [selection, querySub, updateParseSub]);
  const fetchForesightReg = useCallback(async () => {
    try {
      const { data } = await API.graphql(
        graphqlOperation(queryReg, {
          param: selection,
        })
      );
      console.log(selection);
      console.log("Foresight reg data response:", data); // Print the response data
      let input = data.listGcamDataTableAggClass1Globals.items;
      input.sort((a,b) => a.x - b.x);
      updateParseReg(input);
    } catch (error) {
      console.log(error);
  }
  }, [selection, queryReg, updateParseReg]);
  const fetchForesight = useCallback(async () => {
    try {
      const { data } = await API.graphql(
        graphqlOperation(query, {
          param: selection,
        })
      );
      console.log(selection);
      console.log("Foresight data response:", data); // Print the response data
      let input = data.listGcamDataTableAggClass1Regions.items;
      input.sort((a,b) => a.x - b.x);
      updateParse(input);
    } catch (error) {
      console.log(error);
  }
  }, [selection, query, updateParse]);

  useEffect(() => {
    fetchForesightRegSub();
    fetchForesightSub();
    fetchForesightReg();
    fetchForesight();
  }, [selection, updateParse, updateParseReg, updateParseSub, updateParseRegSub, fetchForesightRegSub, fetchForesightSub, fetchForesightReg, fetchForesight]);

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
