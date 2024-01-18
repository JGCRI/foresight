import React, { useEffect, useState } from 'react';
import BarHorizontal from "./charts/BarHorizontal";
import ChoroplethImageSlider from './charts/ChoroplethImageSlider';
import { connect } from 'react-redux';
import { choroplethReduce, filterSubcat, getBarHorizontal, lineGraphReduce, processData, getUnits } from '../assets/data/DataManager';

import Line from './charts/Line';

function DashboardGraphs({ openedScenerios, scenerioSpread, start, end, data, dataReg, dataSub, dataRegSub, selectedGuage, curYear, region, subcat }) {
  /*
  let aggNone = [];  
  let aggRegion = [];  
  let aggSubcat = [];  
  let aggRegionSubcat = [];  
  function parseCSV(file, key) {
      Papa.parse(file, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function (input) {
          console.log(input.data);
          if (key === 0)
            aggNone = input.data;
          if (key === 1)
            aggRegion = input.data;
          if (key === 2)
            aggSubcat = input.data;
          if (key === 3)
            aggRegionSubcat = input.data;
        }
      });
    }
    parseCSV(gcamDataTable_aggParam_regions, 0);
    parseCSV(gcamDataTable_aggParam_global, 1);
    parseCSV(gcamDataTable_aggClass1_regions, 2);
    parseCSV(gcamDataTable_aggClass1_global, 3);
    */
  const csv = data;
  const csv1 = dataReg;
  const csv2 = dataSub;
  const csv3 = dataRegSub;
  let rawData = "i"
  let subcatDisplay = ""
  let regionDisplay = ""
  let units = "ERROR: Units not loaded";
  if (subcat !== "Aggregate of Subsectors")
    subcatDisplay = " " + subcat;
  if (region !== "class1")
    regionDisplay = region;
  const Scenerios = openedScenerios;
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);
  useEffect(() => {
    setStartDate(start);
    setEndDate(end);
  }, [scenerioSpread, start, end]);
  //console.log("!!", csv, csv1, csv2, csv3);
  if (csv !== "i" && csv1 !== "i" && csv2 !== "i" && csv3 !== "i") {
    //console.log("!!", csv, csv1, csv2, csv3);
    rawData = processData(csv, csv1, csv2, csv3, "GCAM_SSP2", selectedGuage, region, subcat);
    //console.log("!!!", rawData);
    units = getUnits(csv3, selectedGuage);
  }
  return (
    <>
      <div className="graph-grid">
        <div>{regionDisplay} {subcatDisplay} Trends</div>
        <div>
          <div>Spatial Composition {"(" + curYear + subcatDisplay + ")"}</div>
          <div>{Scenerios.at(0).title} vs. {Scenerios.at(1).title}</div>
        </div>
        <div>Top 10 Countries {"(" + curYear + ")"} -- By Subsector</div>
        {rawData === 'i' ? (
          "Loading Dataset..."
        ) : (
          <Line data={lineGraphReduce(rawData, selectedGuage, Scenerios, region, subcat, start, end)} unit={units} />
        )}
        {csv2 === 'i' ? (
          "Loading Dataset..."
        ) : (
          <ChoroplethImageSlider
            id={"Dashboard_Big"}
            scenario_1={Scenerios.at(0).title}
            scenario_2={Scenerios.at(1).title}
            dataset={choroplethReduce(csv2, Scenerios.at(0).title, selectedGuage, curYear)}
            dataset2={choroplethReduce(csv2, Scenerios.at(1).title, selectedGuage, curYear)}
          />
        )}
        {(csv === 'i' || csv2 === 'i') ? (
          "Loading Dataset..."
        ) : (
          <div className='bar-grid grid-border'>
            <BarHorizontal data={getBarHorizontal(csv, csv2, Scenerios.at(0).title, selectedGuage, curYear)} listKeys={filterSubcat(csv1)} scenerio={Scenerios.at(0).title} />
            <BarHorizontal data={getBarHorizontal(csv, csv2, Scenerios.at(1).title, selectedGuage, curYear)} listKeys={filterSubcat(csv1)} scenerio={Scenerios.at(1).title} />
          </div>
        )}
      </div>
      <div className="graph-grid-small">
        <div>{regionDisplay} {subcatDisplay} Trends</div>
        {rawData === 'i' ? (
          "Loading Dataset..."
        ) : (
          <Line data={lineGraphReduce(rawData, selectedGuage, Scenerios, region, subcat, start, end)} unit={units} />
        )}
        <div>Spatial Composition {"(" + curYear + subcatDisplay + ")"}</div>
        {csv2 === 'i' ? (
          "Loading Dataset..."
        ) : (
          <ChoroplethImageSlider
            id={"Dashboard_Small"}
            scenario_1={Scenerios.at(0).title}
            scenario_2={Scenerios.at(1).title}
            dataset={choroplethReduce(csv2, Scenerios.at(0).title, selectedGuage, curYear)}
            dataset2={choroplethReduce(csv2, Scenerios.at(1).title, selectedGuage, curYear)}
          />
        )}
        <div>Top 10 Countries {"(" + curYear + ")"} -- By Subsector</div>
        {(csv === 'i' || csv2 === 'i') ? (
          "Loading Dataset..."
        ) : (
          <div className='bar-grid grid-border'>
            <BarHorizontal data={getBarHorizontal(csv, csv2, Scenerios.at(0).title, selectedGuage, curYear)} listKeys={filterSubcat(csv1)} scenerio={Scenerios.at(0).title} />
            <BarHorizontal data={getBarHorizontal(csv, csv2, Scenerios.at(1).title, selectedGuage, curYear)} listKeys={filterSubcat(csv1)} scenerio={Scenerios.at(1).title} />
          </div>
        )}
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    openedScenerios: state.scenerios,
    selectedGuage: state.dashboardSelection,
    scenerioSpread: { ...(state.scenerios) },
    start: state.startDate,
    end: state.endDate,
    data: state.parsedData,
    dataReg: state.parsedDataReg,
    dataSub: state.parsedDataSub,
    dataRegSub: state.parsedDataRegSub,
    curYear: state.dashboardYear,
    region: state.dashboardRegion,
    subcat: state.dashboardSubsector,
  };
}

export default connect(mapStateToProps)(DashboardGraphs);