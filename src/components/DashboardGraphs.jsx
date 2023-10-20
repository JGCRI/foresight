import React, { useEffect, useState } from 'react';
import BarHorizontal from "./charts/BarHorizontal";
import ChoroplethImageSlider from './charts/ChoroplethImageSlider';
import getDashboardData from "./DashboardDummyData";
import { connect } from 'react-redux';
import { choroplethReduce, filterSubcat, getBarHorizontal, lineGraphReduce, processData } from '../assets/data/DataManager';
import Papa from "papaparse";

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
    const Scenerios = openedScenerios;
    const [startDate, setStartDate] = useState(start);
    const [endDate, setEndDate] = useState(end);
    useEffect(() => {
        setStartDate(start);
        setEndDate(end);
    }, [scenerioSpread, start, end]);
    if(csv !== "i" && csv1 !== "i" && csv2 !== "i" && csv3 !== "i") {
      rawData = processData(csv, csv1, csv2, csv3, "GCAM_SSP2", "elecByTechTWh", region, subcat);
    }
    return (
        <>
            <div className="graph-grid">
                <div>Global Trends</div>
                <div>Spatial Composition</div>
                <div>Top 10 Countries -- By Subsector</div>
                {rawData === 'i' ? (
                  "Loading Dataset..."
                ) : (
                <Line data={lineGraphReduce(rawData, "elecByTechTWh", Scenerios, region, subcat)} />
                )}
                {rawData === 'i' ? (
                  "Loading Dataset..."
                ) : (
                <ChoroplethImageSlider
                    id={"Dashboard_Big"}
                    scenario_1={Scenerios.at(0).title}
                    scenario_2={Scenerios.at(1).title}
                    dataset={choroplethReduce(csv2, Scenerios.at(0).title, "elecByTechTWh", curYear)}
                    dataset2={choroplethReduce(csv2, Scenerios.at(1).title, "elecByTechTWh", curYear)}
                />
                )}
                {rawData === 'i' ? (
                  "Loading Dataset..."
                ) : (
                <div className='bar-grid grid-border'>
                    <BarHorizontal data={getBarHorizontal(csv, csv2, Scenerios.at(0).title, "elecByTechTWh", curYear)} listKeys={filterSubcat(csv1)} scenerio={Scenerios.at(0).title} />
                    <BarHorizontal data={getBarHorizontal(csv, csv2, Scenerios.at(1).title, "elecByTechTWh", curYear)} listKeys={filterSubcat(csv1)} scenerio={Scenerios.at(1).title} />
                </div>
                )}
            </div>
            <div className="graph-grid-small">
                <div>Global Trends</div>
                {rawData === 'i' ? (
                  "Loading Dataset..."
                ) : (
                <Line data={lineGraphReduce(rawData, "elecByTechTWh", Scenerios, region, subcat)} />
                )}
                <div>Spatial Composition</div>
                {rawData === 'i' ? (
                  "Loading Dataset..."
                ) : (
                <ChoroplethImageSlider
                    id={"Dashboard_Small"}
                    scenario_1={Scenerios.at(0).title}
                    scenario_2={Scenerios.at(1).title}
                    dataset={choroplethReduce(csv2, Scenerios.at(0).title, "elecByTechTWh", curYear)}
                    dataset2={choroplethReduce(csv2, Scenerios.at(1).title, "elecByTechTWh", curYear)}
                />
                )}
                <div>Top 10 Countries -- By Subsector</div>
                {rawData === 'i' ? (
                  "Loading Dataset..."
                ) : (
                <div className='bar-grid grid-border'>
                    <BarHorizontal data={getBarHorizontal(csv, csv2, Scenerios.at(0).title, "elecByTechTWh", curYear)} listKeys={filterSubcat(csv1)} scenerio={Scenerios.at(0).title} />
                    <BarHorizontal data={getBarHorizontal(csv, csv2, Scenerios.at(1).title, "elecByTechTWh", curYear)} listKeys={filterSubcat(csv1)} scenerio={Scenerios.at(1).title} />
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
        reg: state.parsedData,
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