import React from "react";
import {
  ReactCompareSlider
} from "react-compare-slider";
import DashboardChoropleth from "./DashboardChoropleth";
import getDashboardData from "../DashboardDummyData";

//<DashboardChoropleth data={getDashboardData("Scenario X", "spatialComparison")} />
function ChoroplethImageSlider({scenario_1, scenario_2}) {
  const scenario1 = scenario_1;
  const scenario2 = scenario_2;
  console.log(scenario1);
  return (
    <div className="slider grid-border">
      <div className="slider-container">
        <div className="image-container">
          <ReactCompareSlider
            itemOne={<DashboardChoropleth data={getDashboardData(scenario1, "spatialComparison")} scenarioTitle={scenario1} isLeft={true} />}
            itemTwo={<DashboardChoropleth data={getDashboardData(scenario2, "spatialComparison")} scenarioTitle={scenario2} isLeft={false} />}
            className="test-wrapper"
          />
        </div>
      </div>
    </div>
  );
}

export default ChoroplethImageSlider;
