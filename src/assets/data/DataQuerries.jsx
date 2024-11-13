import { useState, useEffect, useCallback } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import { connect } from 'react-redux';
import { setAllScenarios, setSceneriosNoUpdate, setGuageList, setdashboardGuages, setdashboardSelection, setStartDate, setEndDate, setDashDate, setBarCountries } from '../../components/Store';
import { getUnits, findClosestDateAllParamsAbove, getScenerio, filterRegion, listRegions, filterSubcat, getBasinAggregate } from './DataManager';
import { loadDataURL } from '../../components/sharing/DashboardUrl';
import { datasets } from './Scenarios';


export const lineQuery = `
query BarQuery($reg: String!, $sub: String!, $nextToken: String, $id: String!) {
  queryGcamDataTableAggClass1Regions(
    id: $id,
    filter: {
      region: {eq: $reg},
      class: {eq: $sub}
    },
    limit: 100000, 
    nextToken: $nextToken
  ) {
    items {
      value
      x
      scenario
    }
    nextToken
  }
}
`;


export const lineQueryAggReg = `
query BarQuery($sub: String!, $nextToken: String, $id: String!) {
  queryGcamDataTableAggClass1Globals(
    id: $id,
    date: $sub,
    limit: 100000, 
    nextToken: $nextToken
  ) {
    items {
      value
      x
      scenario
    }
    nextToken
  }
}
`;


export const lineQueryAggSub = `
query BarQuery($reg: String!, $nextToken: String, $id: String!) {
  queryGcamDataTableAggParamRegions(
    id: $id,
    filter: {
      region: {eq: $reg}
    },
    limit: 100000, 
    nextToken: $nextToken
  ) {
    items {
      value
      x
      scenario
    }
    nextToken
  }
}
`;


export const lineQueryAggRegSub = `
query BarQuery($param: String!, $nextToken: String, $id: String!) {
  queryGcamDataTableAggParamGlobals(
    id: $id,
    date: $param,
    limit: 100000, 
    nextToken: $nextToken
  ) {
    items {
      value
      x
      scenario
    }
    nextToken
  }
}
`;


export const choroplethQuery = `
query BarQuery($nextToken: String, $id: String!, $date: String!, $sub: String!) {
  queryGcamDataTableAggClass1Regions(
    id: $id,
    date: $date,
    filter: {
      class: {eq: $sub}
    },
    limit: 100000, 
    nextToken: $nextToken
  ) {
    items {
      region
      value
      scenario
    }
    nextToken
  }
}
`;


export const choroplethQueryAggSub = `
query BarQuery($nextToken: String, $id: String!, $sort: String!) {
  queryGcamDataTableAggParamRegions(
    id: $id,
    date: $sort,
    limit: 100000, 
    nextToken: $nextToken
  ) {
    items {
      region
      value
      scenario
    }
    nextToken
  }
}
`;


export const barQuery = `
query BarQuery($date: String!, $nextToken: String, $id: String!) {
  queryGcamDataTableAggClass1Regions(
    id: $id,
    date: $date,
    limit: 100000,
    nextToken: $nextToken
  ) {
    items {
      value
      x
      scenario
      region
      class
    }
    nextToken
  }
}
`;


const queryGuage = `
query MyQuery($nextToken: String, $start: Int!, $end: Int!, $id: String!) {
  queryGcamDataTableAggParamGlobals(
    id: $id,
    filter: {
      x: { in: [$start, $end] }
    },
    limit: 100000,
    nextToken: $nextToken
  ) {
    items {
      units
      value
      x
      scenario
      param
    }
    nextToken
  }
}
`

const queryDataset = `
query MyQuery($nextToken: String, $dataset: String!) {
  listGcamDataTableAggParamGlobals(
    filter: {
      id: { beginsWith: $dataset }
    },
    limit: 100000,
    nextToken: $nextToken
  ) {
    items {
      units
      value
      x
      scenario
      param
    }
    nextToken
  }
}
`

const queryDates = `
query MyQuery($nextToken: String, $param: String!, $id: String!) {
  queryGcamDataTableAggParamGlobals(
    id: $id,
    date: $param,
    limit: 100000,
    nextToken: $nextToken
  ) {
    items {
      x
    }
    nextToken
  }
}
`

export const aggSubQuery = `
query BarQuery($date: String!, $nextToken: String, $id: String!) {
  queryGcamDataTableAggParamRegions(
    id: $id,
    date: $date,
    limit: 100000, 
    nextToken: $nextToken
  ) {
    items {
      value
      x
      scenario
      region
    }
    nextToken
  }
}
`;

export const aggRegQuery = `
query BarQuery($date: Int!, $nextToken: String, $id: String!) {
  queryGcamDataTableAggClass1Globals(
    id: $id,
    filter: {
      x: {eq: $date}
    },
    limit: 100000, 
    nextToken: $nextToken
  ) {
    items {
      class
      value
      x
      scenario
      region
    }
    nextToken
  }
}
`;


function DataQuerries({ dataset, scenerios, start, end, parameter, year, region, subcat, setGuage, setDates, setLine, setChoropleth, setBar, setAggSub, setCountries, setRegions, setSubcategories, setAllScenarios, setScenariosTotal, setGuagesTotal, setGuagesCurrent, setGuageSelected, setStart, setEnd, setCurrentDate, URLLoaded, toggleURLLoaded, basinAggregation }) {

  //console.log(scenerios);
  const [scenarios, setScenarios] = useState((scenerios.length > 1) ? scenerios.map(obj => obj.title) : "i");

  useEffect(() => {
    setScenarios(scenerios.map(obj => obj.title));
  }, [scenerios]);

  useEffect(() => {
    setScenarios("i");
    fetchDashboard();
  }, [dataset])

  const fetchData = async (query, variables) => {
    let nextToken = null;
    let allItems = [];
    let retries = 5;
    let delay = 500; // initial delay of 1/2 second

    do {
      try {
        const response = await API.graphql(graphqlOperation(query, { ...variables, nextToken }));
        const items = response.data[Object.keys(response.data)[0]].items;
        allItems.push(...items);
        nextToken = response.data[Object.keys(response.data)[0]].nextToken;
      } catch (error) {
        if (error.errors && error.errors.some(e => e.errorType === 'DynamoDB:ProvisionedThroughputExceededException')) {
          if (retries === 0) throw new Error('Retries exhausted');
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // exponential backoff
          retries -= 1;
        } else {
          throw error;
        }
      }
    } while (nextToken);
    return allItems;
  };

  const fetchParallel = useCallback(async (queries) => {
    const results = await Promise.all(queries.map(([query, variables]) => fetchData(query, variables)));
    return results.flat().sort((a, b) => a.x - b.x);
  }, []);

  const fetchDashboard = useCallback(async () => {
    const result = await fetchParallel([[queryDataset, { dataset: dataset }]]);
    loadDataURL(result, setAllScenarios, setScenariosTotal, setGuagesTotal, setGuagesCurrent, setGuageSelected, setStart, setEnd, setCurrentDate, URLLoaded, toggleURLLoaded, dataset);
  }, [fetchParallel]);

  const fetchLine = useCallback(async () => {
    if (scenarios !== "i" && scenarios.length > 1) {
      const queries = [];
      if (subcat === "Aggregate of Subsectors" || subcat === "class1") {
        if (region === "Global") {
          queries.push([lineQueryAggRegSub, { param: parameter, id: dataset + "|" + scenarios[0] }]);
          queries.push([lineQueryAggRegSub, { param: parameter, id: dataset + "|" + scenarios[1] }]);
        } else {
          queries.push([lineQueryAggSub, { id: dataset + "|" + scenarios[0] + "|" + parameter, reg: region }]);
          queries.push([lineQueryAggSub, { id: dataset + "|" + scenarios[1] + "|" + parameter, reg: region }]);
        }
      } else if (region === "Global") {
        queries.push([lineQueryAggReg, { id: dataset + "|" + scenarios[0] + "|" + parameter, sub: subcat }]);
        queries.push([lineQueryAggReg, { id: dataset + "|" + scenarios[1] + "|" + parameter, sub: subcat }]);
      } else {
        queries.push([lineQuery, { id: dataset + "|" + scenarios[0] + "|" + parameter, reg: region, sub: subcat }]);
        queries.push([lineQuery, { id: dataset + "|" + scenarios[1] + "|" + parameter, reg: region, sub: subcat }]);
      }
      const result = await fetchParallel(queries);
      setLine(result);
    }
  }, [dataset, region, subcat, scenarios, parameter, setLine, fetchParallel]);

  const fetchChoropleth = useCallback(async () => {
    if (scenarios !== "i" && scenarios.length > 1) {
      const queries = [];
      if (subcat === "Aggregate of Subsectors") {
        queries.push([choroplethQueryAggSub, { sort: year.toString(), id: dataset + "|" + scenarios[0] + "|" + parameter }]);
        queries.push([choroplethQueryAggSub, { sort: year.toString(), id: dataset + "|" + scenarios[1] + "|" + parameter }]);
      } else {
        queries.push([choroplethQuery, { id: dataset + "|" + scenarios[0] + "|" + parameter, date: year.toString(), sub: subcat }]);
        queries.push([choroplethQuery, { id: dataset + "|" + scenarios[1] + "|" + parameter, date: year.toString(), sub: subcat }]);
      }
      const result = await fetchParallel(queries);
      setChoropleth(result);
      setRegions(listRegions(result));
    }
  }, [subcat, scenarios, parameter, year, setChoropleth, fetchParallel]);

  const fetchBar = useCallback(async () => {
    if (scenarios !== "i" && scenarios.length > 1) {
      const queries = [];
      queries.push([barQuery, { id: dataset + "|" + scenarios[0] + "|" + parameter, date: year.toString() }]);
      queries.push([barQuery, { id: dataset + "|" + scenarios[1] + "|" + parameter, date: year.toString() }]);
      const result = await fetchParallel(queries);
      setBar(result);
      console.log(parameter);
    }
  }, [scenarios, parameter, year, setBar, fetchParallel]);

  const fetchGuage = useCallback(async () => {
    if (scenarios !== "i" && scenarios.length > 1 && scenarios.length > 1) {
      const queries = [];
      queries.push([queryGuage, { start, end, id: dataset + "|" + scenarios[0] }]);
      queries.push([queryGuage, { start, end, id: dataset + "|" + scenarios[1] }]);
      const result = await fetchParallel(queries);
      setGuage(result);
    }
  }, [scenarios, start, end, setGuage, fetchParallel]);

  const fetchDates = useCallback(async () => {
    if (scenarios !== "i" && scenarios.length > 1) {
      const queries = [];
      queries.push([queryDates, { param: parameter, id: dataset + "|" + scenarios[0]}]);
      queries.push([queryDates, { param: parameter, id: dataset + "|" + scenarios[1]}]);
      const result = await fetchParallel(queries);
      setDates(result);
    }
  }, [scenarios, parameter, setDates, fetchParallel]);

  const fetchAggSub = useCallback(async () => {
    if (scenarios !== "i" && scenarios.length > 1) {
      const queries = [];
      queries.push([aggSubQuery, { date: year.toString(), id: dataset + "|" + scenarios[0] + "|" + parameter }]);
      queries.push([aggSubQuery, { date: year.toString(), id: dataset + "|" + scenarios[1] + "|" + parameter }]);
      const result = await fetchParallel(queries);
      setAggSub(result);
      console.log(filterRegion(getBasinAggregate(getScenerio(result, scenarios[0]), basinAggregation)));
      setCountries(filterRegion(getBasinAggregate(getScenerio(result, scenarios[0]), basinAggregation)));
    }
  }, [scenarios, parameter, year, setAggSub, setCountries, fetchParallel]);

  const fetchAggReg = useCallback(async () => {
    if (scenarios !== "i" && scenarios.length > 1) {
      const result = await fetchParallel([[aggRegQuery, { date: year, id: dataset + "|" + scenarios[0] + "|" + parameter }]]);
      setSubcategories(filterSubcat(result));
    }
  }, [scenarios, parameter, year, setSubcategories, fetchParallel]);

  useEffect(() => {
    if (URLLoaded && scenarios !== "i" && scenarios.length > 1) {
      const abortController = new AbortController();
      setLine("i");
      fetchLine(abortController.signal);
      return () => abortController.abort();
    }
  }, [scenarios, parameter, region, subcat, setLine, fetchLine, URLLoaded]);

  useEffect(() => {
    if (URLLoaded && scenarios !== "i" && scenarios.length > 1) {
      const abortController = new AbortController();
      setChoropleth("i");
      fetchChoropleth(abortController.signal);
      return () => abortController.abort();
    }
  }, [scenarios, parameter, year, subcat, setChoropleth, fetchChoropleth, URLLoaded]);

  useEffect(() => {
    if (URLLoaded && scenarios !== "i" && scenarios.length > 1) {
      const abortController = new AbortController();
      setBar("i");
      fetchBar(abortController.signal);
      return () => abortController.abort();
    }
  }, [scenarios, parameter, year, setBar, fetchBar, URLLoaded]);

  useEffect(() => {
    if (scenarios !== "i" && scenarios.length > 1) {
      const abortController = new AbortController();
      setGuage("i");
      fetchGuage(abortController.signal);
      return () => abortController.abort();
    }
  }, [scenarios, start, end, setGuage, fetchGuage]);

  useEffect(() => {
    if (scenarios !== "i" && scenarios.length > 1) {
      const abortController = new AbortController();
      setDates("i");
      fetchDates(abortController.signal);
      return () => abortController.abort();
    }
  }, [scenarios, parameter, setDates, fetchDates]);

  useEffect(() => {
    if (URLLoaded && scenarios !== "i" && scenarios.length > 1) {
      const abortController = new AbortController();
      setAggSub("i");
      fetchAggSub(abortController.signal);
      return () => abortController.abort();
    }
  }, [scenarios, parameter, year, setAggSub, fetchAggSub, URLLoaded]);

  useEffect(() => {
    if (URLLoaded && scenarios !== "i" && scenarios.length > 1) {
      const abortController = new AbortController();
      setSubcategories("i");
      fetchAggReg(abortController.signal);
      return () => abortController.abort();
    }
  }, [scenarios, parameter, year, setSubcategories, fetchAggReg, URLLoaded]);
}

function mapStateToProps(state) {
  return {
    start: parseInt(state.startDate),
    end: parseInt(state.endDate),
    scenerios: state.scenerios,
    parameter: state.dashboardSelection,
    year: state.dashboardYear,
    region: state.dashboardRegion,
    subcat: state.dashboardSubsector,
    dataLine: state.parsedDataLine,
    URLLoaded: state.urlLoaded,
    basinAggregation: state.basinAggregation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAllScenarios: (scenarios) => dispatch(setAllScenarios(scenarios)),
    setGuagesTotal: (guages) => dispatch(setGuageList(guages)),
    setScenariosTotal: (scenarios) => dispatch(setSceneriosNoUpdate(scenarios)),
    setGuagesCurrent: (guages) => dispatch(setdashboardGuages(guages)),
    setGuageSelected: (guages) => dispatch(setdashboardSelection(guages)),
    setStart: (start) => dispatch(setStartDate(start)),
    setEnd: (end) => dispatch(setEndDate(end)),
    setCurrentDate: (current) => dispatch(setDashDate(current)),
    setCountries: (countryList) => dispatch(setBarCountries(countryList)),
    toggleURLLoaded: () => dispatch({ type: 'toggleURLLoaded' })
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(DataQuerries);