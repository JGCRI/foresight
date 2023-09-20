import React from "react";
import {
  ReactCompareSlider
} from "react-compare-slider";
import DashboardChoropleth from "./DashboardChoropleth";
import getDashboardData from "../DashboardDummyData";
import { getSmallestChoropleth, getLargestChoropleth } from "../../assets/data/DataManager";

import MapChoropleth from "../maps/MapChoropleth";
import usstateData from "../maps/data/uststateData.js"
import LeafletSync from "../LeafletSync";

//<DashboardChoropleth data={getDashboardData("Scenario X", "spatialComparison")} />
function ChoroplethImageSlider( {id, scenario_1, scenario_2, dataset} ) {
  const mapkey = id;
  const scenario1 = scenario_1;
  const scenario2 = scenario_2;
  const outputData = dataset;
  const maximum = getLargestChoropleth(outputData);
  const minimum = getSmallestChoropleth(outputData);
  console.log(maximum);
  console.log(minimum);
  console.log(mapkey);
  return (
    <LeafletSync
      maxval = {maximum}
      minval = {minimum}
      data = {outputData}
      uniqueValue = {mapkey}
    />
  );
}

export default ChoroplethImageSlider;
