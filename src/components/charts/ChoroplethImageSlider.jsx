import React from "react";
import LeafletSync from "../LeafletSync";

//<DashboardChoropleth data={getDashboardData("Scenario X", "spatialComparison")} />
function ChoroplethImageSlider( {id, scenario_1, scenario_2, dataset, dataset2} ) {
  const mapkey = id;
  const scenario1 = scenario_1;
  const scenario2 = scenario_2;
  const outputData = dataset;
  const outputData2 = dataset2;
  return (
    <LeafletSync
      data = {outputData}
      data2 = {outputData2}
      uniqueValue = {mapkey}
    />
  );
}

export default ChoroplethImageSlider;
