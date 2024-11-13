import React, { useEffect, useState } from 'react';

import BarHorizontal from "../charts/BarHorizontal";
import { connect } from 'react-redux';
import { choroplethReduce, filterSubcat, lineGraphReduce, getUnits } from '../../assets/data/DataManager';
import Line from '../charts/Line';
import BarCountryControl from '../dropdowns/BarCountryControl';
import { getBarColors } from '../../assets/data/GcamColors';
import { setDashDate, setDashReg, setDashSubs } from '../Store';
import LeafletSync from "../maps/LeafletSync";

function DashboardGraphs({ openedScenerios, selectedGuage, curYear, region, subcat, lineData, guageData, choroplethData, barData, aggSub, setDashboardDate, setDashboardReg, setDashboardSubs }) {
  const [width, setWidth] = useState(window.innerWidth);

  const [dashYear, setYear] = useState(curYear);
  const [dashRegion, setRegion] = useState(region);
  const [dashSubcategory, setSubcategory] = useState(subcat);

  useEffect(() => {
    setDashboardDate(dashYear)
  }, [dashYear]);

  useEffect(() => {
    setDashboardReg(dashRegion)
  }, [dashRegion]);

  useEffect(() => {
    setDashboardSubs(dashSubcategory)
  }, [dashSubcategory]);

  useEffect(() => {
    console.log("SCENERIO CHANGE");
  }, [openedScenerios]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const Scenerios = openedScenerios ? openedScenerios : ["ERR", "ERR"];

  // Display label text. Setting default display text for aggregates.
  let subcatDisplay = "";
  let regionDisplay = "";
  if (dashSubcategory !== "Aggregate of Subsectors")
    subcatDisplay = " " + dashSubcategory;
  if (dashRegion !== "class1")
    regionDisplay = dashRegion;


  // Load Units for Display
  let units = "ERROR: Units not loaded";
  if (guageData !== "i") {
    units = getUnits(guageData, selectedGuage);
  }


  // Labels
  const lineChartLabel = (<div className="text-centered">{regionDisplay} {subcatDisplay} Trends</div>)
  const choroplethLabel = (<div className="text-centered">
    <div>Spatial Composition {"(" + dashYear + subcatDisplay + ")"}</div>
    <div>{Scenerios.at(0).title} vs. {Scenerios.at(1).title}</div>
  </div>)
  const barChartLabel = (<div className="text-centered"> Top 10 Countries {"(" + dashYear + ")"} -- By Subsector</div>)


  // Line Chart Visualization
  const lineChart = (lineData === 'i') ? (
    <div className = "grid-border-hidden text-centered">
      Loading Dataset...
    </div>
  ) : (
    <Line data={lineGraphReduce(lineData, selectedGuage, Scenerios, dashSubcategory)} unit={units} date = {dashYear} setDate = {setYear} />
  )


  // Choropleth Visualization
  const choropleth = (choroplethData === 'i') ? (
    <div className = "grid-border-hidden text-centered">
      Loading Dataset...
    </div>
  ) : (
    <LeafletSync
      setRegion = {setRegion}
      choroplethData = {choroplethData}
      Scenerios = {Scenerios}
      data = {choroplethReduce(choroplethData, Scenerios.at(0).title)}
      data2 = {choroplethReduce(choroplethData, Scenerios.at(1).title)}
      uniqueValue = {"Dashboard_Big"}
    />
  )


  // Bar Chart Visualization
  const barChart = (barData === "i" || aggSub === 'i') ? (
    <div className = "grid-border-hidden text-centered">
      Loading Dataset...
    </div>
  ) : (
    <div className='bar-grid grid-border'>
      <BarCountryControl csv={aggSub} scenario={Scenerios.at(0).title} scenerio2={Scenerios.at(1).title} year={dashYear} className="choropleth-control" />
      <BarHorizontal csv={barData} csv2={aggSub} color={getBarColors(barData, Scenerios.at(0).title, dashYear)} listKeys={filterSubcat(barData)} scenerio={Scenerios.at(0).title} setdashboardSub = {setSubcategory}/>
      <BarHorizontal csv={barData} csv2={aggSub} color={getBarColors(barData, Scenerios.at(0).title, dashYear)} listKeys={filterSubcat(barData)} scenerio={Scenerios.at(1).title} setdashboardSub = {setSubcategory}/>
    </div>
  )


  //Display the grid. Below 1000 pixels results in its upright form.
  return (
    (width >= 1000) ? (
      <div className="graph-grid">
        {lineChartLabel}
        {choroplethLabel}
        {barChartLabel}
        {lineChart}
        {choropleth}
        {barChart}
      </div>
    ) : (
      <div className="graph-grid-small">
        {lineChartLabel}
        {lineChart}
        {choroplethLabel}
        {choropleth}
        {barChartLabel}
        {barChart}
      </div>
    ));
}


function mapStateToProps(state) {
  return {
    openedScenerios: state.scenerios,
    selectedGuage: state.dashboardSelection,
    curYear: state.dashboardYear,
    region: state.dashboardRegion,
    subcat: state.dashboardSubsector,
    countries: state.barCountries,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setDashboardDate: (date) => dispatch(setDashDate(date)),
    setDashboardReg: (reg) => dispatch(setDashReg(reg)),
    setDashboardSubs: (subs) => dispatch(setDashSubs(subs)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardGraphs);