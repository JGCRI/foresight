import React from "react";
import {
  ReactCompareSlider
} from "react-compare-slider";
import DashboardChoropleth from "./DashboardChoropleth";
import getDashboardData from "../DashboardDummyData";
import { getSmallestChoropleth, getLargestChoropleth } from "../../assets/data/DataManager";

import MapChoropleth from "../maps/MapChoropleth";
import usstateData from "../maps/data/uststateData.js"

//<DashboardChoropleth data={getDashboardData("Scenario X", "spatialComparison")} />
function ChoroplethImageSlider({scenario_1, scenario_2, dataset}) {
  const scenario1 = scenario_1;
  const scenario2 = scenario_2;
  const outputData = dataset;
  const maximum = getLargestChoropleth(outputData);
  const minimum = getSmallestChoropleth(outputData);
  console.log(maximum);
  console.log(minimum);
  return (
    <div className="slider grid-border">
      <div className="slider-container">
        <div className="image-container">
          <ReactCompareSlider
            itemOne={<MapChoropleth width={"100%"} height={"100%"} data={usstateData} />}
            itemTwo={<MapChoropleth width={"100%"} height={"100%"} data={usstateData} />}
            onlyHandleDraggable
            className="map-wrapper"
            max={maximum}
            min={minimum}
            />
        </div>
      </div>
    </div>
  );
}
/*
function getData({scenario, data}) {
  if(scenario === "Reference")
    return 
  return getDashboardData(scenario, "spatialComparison");
}
*/
export default ChoroplethImageSlider;
