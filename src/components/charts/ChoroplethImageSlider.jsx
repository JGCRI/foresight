import React from "react";
import {
  ReactCompareSlider, styleFitContainer
} from "react-compare-slider";
import DashboardChoropleth from "./DashboardChoropleth";
import getDashboardData from "../DashboardDummyData";

function ChoroplethImageSlider() {
  return (
    <div className="slider">
      <div className="slider-container">
        <div className="image-container">
          <ReactCompareSlider
            itemOne={<DashboardChoropleth data={getDashboardData("Scenario X", "spatialComparison")} />}
            itemTwo={<DashboardChoropleth data={getDashboardData("Scenario Y", "spatialComparison")} />}
            style={{
              ...styleFitContainer({
                objectFit: 'contain',
                objectPosition: 'center',
              })
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ChoroplethImageSlider;
