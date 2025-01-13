import { useState, useEffect, useCallback } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import { connect } from 'react-redux';
import { setAllScenarios, setSceneriosNoUpdate, setGuageList, setdashboardGuages, setdashboardSelection, setStartDate, setEndDate, setDashDate, setBarCountries, setDataset, setDashReg, setDashSubs, setBarCountriesFrozen } from '../Store';
import { checkRegionURL, checkSubcatURL, loadDataURL } from '../sharing/DashboardUrl';
import { getScenerio, filterRegion, listRegions, filterSubcat, getGlobalBarHorizontal } from './DataManager';

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

export const globalBarQuery = `
query GlobalBarQuery($date: Int!, $nextToken: String, $id: String!) {
  queryGcamDataTableAggClass1Globals(
    id: $id,
    filter: {
      x: {eq: $date}
    },
    limit: 100000, 
    nextToken: $nextToken
  ) {
    items {
      value
      x
      scenario
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

/**
 * DataQuerries queries and modifies AWS data into the data needed for the various guages and visualizations.
 * 
 * @param {object} props - The component props.
 * @param {string} props.dataset - State of the current dataset.
 * @param {object[]} props.scenerios - State of the currently open scenarios.
 * @param {number} props.start - State of the current start date.
 * @param {number} props.end - State of the current end date.
 * @param {string} props.parameter - State of the currently selected parameter.
 * @param {object[]} props.parameters - State of the currently displayed parameters.
 * @param {number} props.year - State of the current year.
 * @param {string} props.region - State of the current region.
 * @param {string} props.subcat - State of the current subcategory.
 * @param {string[]} props.countries - Array of currently selected countries.
 * @param {string} props.barFrozen - State of whether the bar countries are frozen.
 * @param {React.Dispatch<React.SetStateAction<string>> | 
 * React.Dispatch<React.SetStateAction<Object[]>>} props.setGuage - Function
 * to change the data for guage displays.
 * @param {React.Dispatch<React.SetStateAction<string>> | 
 * React.Dispatch<React.SetStateAction<Object[]>>} props.setDates - Function
 * to change the data needed for dates.
 * @param {React.Dispatch<React.SetStateAction<string>> | 
 * React.Dispatch<React.SetStateAction<Object[]>>} props.setLine - Function
 * to change the data for the lien chart.
 * @param {React.Dispatch<React.SetStateAction<string>> | 
 * React.Dispatch<React.SetStateAction<Object[]>>} props.setChoropleth - Function
 * to change the data for the choropleth.
 * @param {React.Dispatch<React.SetStateAction<string>> | 
 * React.Dispatch<React.SetStateAction<Object[]>>} props.setBar - Function
 * to change the data for the bar chart.
 * @param {React.Dispatch<React.SetStateAction<string>> | 
 * React.Dispatch<React.SetStateAction<Object[]>>} props.setBarGlobal - Function
 * to change the data for the bottom global bar chart.
 * @param {React.Dispatch<React.SetStateAction<string>> | 
 * React.Dispatch<React.SetStateAction<Object[]>>} props.setAggSub - Function
 * to change the aggregated region data.
 * @param {React.Dispatch<React.SetStateAction<string>> | 
 * React.Dispatch<React.SetStateAction<Object[]>>} props.setCountries - Function
 * to change the currently selected bar countries.
 * @param {React.Dispatch<React.SetStateAction<string>> | 
 * React.Dispatch<React.SetStateAction<Object[]>>} props.setRegions - Function
 * to change the data for current regions.
 * @param {React.Dispatch<React.SetStateAction<string>> | 
 * React.Dispatch<React.SetStateAction<Object[]>>} props.setSubcategories - Function
 * to change the data for current subcategories.
 * @param {(scenarios: Object[]) => any} props.setAllScenarios - Function to 
 * set the list of all scenarios.
 * @param {(scenarios: Object[]) => any} props.setScenariosTotal - Function to 
 * set the currently open scenarios.
 * @param {(guages: Object[]) => any} props.setGuagesTotal - Function to set 
 * the list of all parameters
 * @param {(guages: Object[]) => any} props.setGuagesCurrent - Function to 
 * set the list of all currently displayed parameters.
 * @param {(guage: string) => any} props.setGuageSelected - Function 
 * to set the currently selected parameter
 * @param {(start: number) => any} props.setStart - Function 
 * to set the start year.
 * @param {(end: number) => any} props.setEnd - Function 
 * to set the end year.
 * @param {(current: number) => any} props.setCurrentDate - Function 
 * to set the current year.
 * @param {(subcat: string) => any} props.setSubcat - Function 
 * to set the current subcategory.
 * @param {(region: string) => any} props.setRegion - Function 
 * to set the current region.
 * @param {(frozen: boolean) => any} props.setFrozen - Function 
 * @param {boolean} props.URLLoaded - Flag indicating 
 * if the URL is loaded.
 * @param {() -> any} props.toggleURLLoaded - Function to 
 * toggle URL loading flag.
 * @param {(dataset: string) => any} props.updateDataset - Function to 
 * change the currently selected dataset.
 * @param {string[]} props.datasetList - State of the current 
 * list of datasets.
 * @returns {ReactElement} The rendered component.
 */
function DataQuerries({ dataset, scenerios, start, end, parameter, parameters, year, region, subcat, countries, barFrozen, setGuage, setDates, setLine, setChoropleth, setBar, setBarGlobal, setAggSub, setCountries, setRegions, setSubcategories, setAllScenarios, setScenariosTotal, setGuagesTotal, setGuagesCurrent, setGuageSelected, setStart, setEnd, setCurrentDate, setSubcat, setRegion, setFrozen, URLLoaded, toggleURLLoaded, updateDataset, datasetList }) {
  const [scenarios, setScenarios] = useState("i");

  useEffect(() => {
    setScenarios(scenerios.map(obj => obj.title));
  }, [scenerios]);

  const fetchData = async (query, variables) => {
    let nextToken = null;
    let allItems = [];
    let retries = 5;
    let delay = 500; // initial delay of 1/2 second

    let timeout = (resolve) => setTimeout(resolve, delay);
    do {
      try {
        const response = await API.graphql(graphqlOperation(query, { ...variables, nextToken }));
        const items = response.data[Object.keys(response.data)[0]].items;
        allItems.push(...items);
        nextToken = response.data[Object.keys(response.data)[0]].nextToken;
      } catch (error) {
        if (error.errors && error.errors.some(e => e.errorType === 'DynamoDB:ProvisionedThroughputExceededException')) {
          if (retries === 0) throw new Error('Retries exhausted');
          await new Promise(resolve => timeout(resolve));
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
    if (!navigator.onLine) {
      console.warn("You are offline. Some functionalities may not be available.");
      return [];
    }
  
    try {
      const results = await Promise.all(
        queries.map(([query, variables]) => fetchData(query, variables))
      );
      return results.flat().sort((a, b) => a.x - b.x);
    } catch (error) {
      console.error("Error in fetchParallel:", error);
      return []; // Return empty data to prevent further errors
    }
  }, []);
  

  const fetchDashboard = useCallback(async () => {
    const result = await fetchParallel([[queryDataset, { dataset: dataset }]]);
    setFrozen(false);
    loadDataURL(result, setAllScenarios, setScenariosTotal, setGuagesTotal, setGuagesCurrent, setGuageSelected, setStart, setEnd, setCurrentDate, URLLoaded, toggleURLLoaded, updateDataset, datasetList, dataset, start, end, year, parameter, parameters, scenerios);
    // eslint-disable-next-line
  }, [dataset]);

  const fetchLine = useCallback(async () => {
    if (region !== "" && subcat !== "" && scenarios !== "i" && scenarios.length > 1) {
      const queries = [];
      if (subcat === "Aggregate of Subsectors" || subcat === "class1") {
        if (region === "Global") {
          queries.push([lineQueryAggRegSub, { param: parameter + "|" , id: dataset + "|" + scenarios[0] }]);
          queries.push([lineQueryAggRegSub, { param: parameter + "|" , id: dataset + "|" + scenarios[1] }]);
        } else {
          queries.push([lineQueryAggSub, { id: dataset + "|" + scenarios[0] + "|" + parameter, reg: region }]);
          queries.push([lineQueryAggSub, { id: dataset + "|" + scenarios[1] + "|" + parameter, reg: region }]);
        }
      } else if (region === "Global") {
        queries.push([lineQueryAggReg, { id: dataset + "|" + scenarios[0] + "|" + parameter, sub: subcat + "|" }]);
        queries.push([lineQueryAggReg, { id: dataset + "|" + scenarios[1] + "|" + parameter, sub: subcat + "|" }]);
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
        queries.push([choroplethQueryAggSub, { sort: year.toString()  + "|" , id: dataset + "|" + scenarios[0] + "|" + parameter }]);
        queries.push([choroplethQueryAggSub, { sort: year.toString()  + "|" , id: dataset + "|" + scenarios[1] + "|" + parameter }]);
      } else {
        queries.push([choroplethQuery, { id: dataset + "|" + scenarios[0] + "|" + parameter, date: year.toString()  + "|" , sub: subcat }]);
        queries.push([choroplethQuery, { id: dataset + "|" + scenarios[1] + "|" + parameter, date: year.toString()  + "|" , sub: subcat }]);
      }
      const result = await fetchParallel(queries);
      setChoropleth(result);
      setRegions(listRegions(result));
    }
  }, [dataset, subcat, scenarios, parameter, year, setChoropleth, setRegions, fetchParallel]);

  const fetchBar = useCallback(async () => {
    if (scenarios !== "i" && scenarios.length > 1) {
      const queries = [];
      const globalQueries = [];

      queries.push([barQuery, { id: dataset + "|" + scenarios[0] + "|" + parameter, date: year.toString()  + "|"  }]);
      queries.push([barQuery, { id: dataset + "|" + scenarios[1] + "|" + parameter, date: year.toString()  + "|"  }]);

      globalQueries.push([globalBarQuery, { id: dataset + "|" + scenarios[0] + "|" + parameter, date: year.toString() }]);
      globalQueries.push([globalBarQuery, { id: dataset + "|" + scenarios[1] + "|" + parameter, date: year.toString() }]);

      const result = await fetchParallel(queries);
      const globalResult = await fetchParallel(globalQueries);
      
      setBar(result);
      //console.log("GLOBAL RESULT", getGlobalBarHorizontal(globalResult, scenarios[0]));
      setBarGlobal(globalResult);
    }
  }, [dataset, scenarios, parameter, year, setBar, fetchParallel]);

  const fetchGuage = useCallback(async () => {
    if (scenarios !== "i" && scenarios.length > 1 && scenarios.length > 1) {
      const queries = [];
      queries.push([queryGuage, { start, end, id: dataset + "|" + scenarios[0] }]);
      queries.push([queryGuage, { start, end, id: dataset + "|" + scenarios[1] }]);
      const result = await fetchParallel(queries);
      setGuage(result);
    }
  }, [dataset, scenarios, start, end, setGuage, fetchParallel]);

  const fetchDates = useCallback(async () => {
    if (scenarios !== "i" && scenarios.length > 1) {
      const queries = [];
      queries.push([queryDates, { param: parameter  + "|" , id: dataset + "|" + scenarios[0] }]);
      queries.push([queryDates, { param: parameter  + "|" , id: dataset + "|" + scenarios[1] }]);
      const result = await fetchParallel(queries);
      setDates(result);
    }
  }, [dataset, scenarios, parameter, setDates, fetchParallel]);

  const fetchAggSub = useCallback(async () => {
    if (scenarios !== "i" && scenarios.length > 1) {
      const queries = [];
      queries.push([aggSubQuery, { date: year.toString()  + "|" , id: dataset + "|" + scenarios[0] + "|" + parameter }]);
      queries.push([aggSubQuery, { date: year.toString()  + "|" , id: dataset + "|" + scenarios[1] + "|" + parameter }]);
      const result = await fetchParallel(queries);
      setAggSub(result);
      if(region === "")
        checkRegionURL(new Set(result.map(obj => obj.region)), setRegion);
      if(countries.length < 1 || !barFrozen)
        setCountries(filterRegion(getScenerio(result, scenarios[0])));
    }
    // eslint-disable-next-line
  }, [dataset, scenarios, parameter, year, setAggSub, setCountries, setRegion, fetchParallel]);

  const fetchAggReg = useCallback(async () => {
    if (scenarios !== "i" && scenarios.length > 1) {
      const result = await fetchParallel([[aggRegQuery, { date: year, id: dataset + "|" + scenarios[0] + "|" + parameter }]]);
      if(subcat === "")
        checkSubcatURL(result.map(obj => obj.class), setSubcat);
      setSubcategories(filterSubcat(result));
    }
    // eslint-disable-next-line
  }, [dataset, scenarios, parameter, year, setSubcategories, setSubcat, fetchParallel]);

  useEffect(() => {
    setScenarios("i");
    fetchDashboard();
  }, [dataset, fetchDashboard])

  useEffect(() => {
    if (URLLoaded && dataset) {
      const abortController = new AbortController();
      setLine("i");
      fetchLine(abortController.signal);
      return () => abortController.abort();
    }
  }, [dataset, scenarios, parameter, region, subcat, setLine, fetchLine, URLLoaded]);

  useEffect(() => {
    if (URLLoaded && dataset) {
      const abortController = new AbortController();
      setChoropleth("i");
      fetchChoropleth(abortController.signal);
      return () => abortController.abort();
    }
  }, [dataset, scenarios, parameter, year, subcat, setChoropleth, fetchChoropleth, URLLoaded]);

  useEffect(() => {
    if (URLLoaded && dataset) {
      const abortController = new AbortController();
      setBar("i");
      setBarGlobal("i");
      fetchBar(abortController.signal);
      return () => abortController.abort();
    }
  }, [dataset, scenarios, parameter, year, setBar, fetchBar, URLLoaded]);

  useEffect(() => {
    const abortController = new AbortController();
    setGuage("i");
    fetchGuage(abortController.signal);
    return () => abortController.abort();
  }, [scenarios, start, end, setGuage, fetchGuage]);

  useEffect(() => {
    const abortController = new AbortController();
    setDates("i");
    fetchDates(abortController.signal);
    return () => abortController.abort();
  }, [scenarios, parameter, setDates, fetchDates]);

  useEffect(() => {
    if (URLLoaded && dataset) {
      const abortController = new AbortController();
      setAggSub("i");
      fetchAggSub(abortController.signal);
      return () => abortController.abort();
    }
  }, [dataset, scenarios, parameter, year, setAggSub, fetchAggSub, URLLoaded]);

  useEffect(() => {
    const abortController = new AbortController();
    setSubcategories("i");
    fetchAggReg(abortController.signal);
    return () => abortController.abort();
  }, [scenarios, parameter, year, setSubcategories, fetchAggReg]);
}

/**
 * Maps the state from the Redux store to the component props.
 * 
 * @param {object} state - The current state.
 * @returns {Object} The mapped props.
 */
function mapStateToProps(state) {
  return {
    dataset: state.dataset,
    datasetList: state.datasetList,
    start: parseInt(state.startDate),
    end: parseInt(state.endDate),
    scenerios: state.scenerios,
    parameter: state.dashboardSelection,
    parameters: state.guages,
    year: state.dashboardYear,
    region: state.dashboardRegion,
    subcat: state.dashboardSubsector,
    countries: state.barCountries,
    barFrozen: state.barCountriesFrozen,
    URLLoaded: state.urlLoaded
  };
}

/**
 * Maps the dispatch functions to the component props.
 * 
 * @param {Function} dispatch - The dispatch function.
 * @returns {Object} The mapped props.
 */
function mapDispatchToProps(dispatch) {
  return {
    setAllScenarios: (scenarios) => dispatch(setAllScenarios(scenarios)),
    setGuagesTotal: (guages) => dispatch(setGuageList(guages)),
    setScenariosTotal: (scenarios) => dispatch(setSceneriosNoUpdate(scenarios)),
    setGuagesCurrent: (guages) => dispatch(setdashboardGuages(guages)),
    setGuageSelected: (guage) => dispatch(setdashboardSelection(guage)),
    setStart: (start) => dispatch(setStartDate(start)),
    setEnd: (end) => dispatch(setEndDate(end)),
    setCurrentDate: (current) => dispatch(setDashDate(current)),
    setCountries: (countryList) => dispatch(setBarCountries(countryList)),
    toggleURLLoaded: () => dispatch({ type: 'toggleURLLoaded' }),
    updateDataset: (dataset) => dispatch(setDataset(dataset)),
    setSubcat: (subcat) => dispatch(setDashSubs(subcat)),
    setRegion: (region) => dispatch(setDashReg(region)),
    setFrozen: (frozen) => dispatch(setBarCountriesFrozen(frozen)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(DataQuerries);