import React from "react";
import {
  ReactCompareSlider, styleFitContainer
} from "react-compare-slider";
import DashboardChoropleth from "./DashboardChoropleth";
import getDashboardData from "../DashboardDummyData";
import BarHorizontal from "./BarHorizontal";
const dataBar = [
  {
      "country": "USA",
      "Category 1": 101,
      "Category 1 Color": "hsl(41, 70%, 50%)",
      "Category 2": 196,
      "Category 2 Color": "hsl(284, 70%, 50%)",
      "Category 3": 82,
      "Category 3 Color": "hsl(324, 70%, 50%)",
      "Category 4": 95,
      "Category 4 Color": "hsl(150, 70%, 50%)"
  },
  {
      "country": "Russia",
      "Category 1": 110,
      "Category 1 Color": "hsl(133, 70%, 50%)",
      "Category 2": 140,
      "Category 2 Color": "hsl(343, 70%, 50%)",
      "Category 3": 80,
      "Category 3 Color": "hsl(319, 70%, 50%)",
      "Category 4": 138,
      "Category 4 Color": "hsl(140, 70%, 50%)"
  },
  {
      "country": "Mexico",
      "Category 1": 128,
      "Category 1 Color": "hsl(188, 70%, 50%)",
      "Category 2": 136,
      "Category 2 Color": "hsl(107, 70%, 50%)",
      "Category 3": 105,
      "Category 3 Color": "hsl(168, 70%, 50%)",
      "Category 4": 25,
      "Category 4 Color": "hsl(242, 70%, 50%)"
  },
  {
      "country": "Japan",
      "Category 1": 169,
      "Category 1 Color": "hsl(188, 70%, 50%)",
      "Category 2": 8,
      "Category 2 Color": "hsl(129, 70%, 50%)",
      "Category 3": 123,
      "Category 3 Color": "hsl(221, 70%, 50%)",
      "Category 4": 12,
      "Category 4 Color": "hsl(244, 70%, 50%)"
  },
  {
      "country": "India",
      "Category 1": 173,
      "Category 1 Color": "hsl(145, 70%, 50%)",
      "Category 2": 119,
      "Category 2 Color": "hsl(51, 70%, 50%)",
      "Category 3": 145,
      "Category 3 Color": "hsl(238, 70%, 50%)",
      "Category 4": 25,
      "Category 4 Color": "hsl(280, 70%, 50%)"
  },
  {
      "country": "France",
      "Category 1": 152,
      "Category 1 Color": "hsl(91, 70%, 50%)",
      "Category 2": 76,
      "Category 2 Color": "hsl(208, 70%, 50%)",
      "Category 3": 175,
      "Category 3 Color": "hsl(164, 70%, 50%)",
      "Category 4": 98,
      "Category 4 Color": "hsl(297, 70%, 50%)"
  },
  {
      "country": "China",
      "Category 1": 86,
      "Category 1 Color": "hsl(53, 70%, 50%)",
      "Category 2": 123,
      "Category 2 Color": "hsl(235, 70%, 50%)",
      "Category 3": 153,
      "Category 3 Color": "hsl(146, 70%, 50%)",
      "Category 4": 153,
      "Category 4 Color": "hsl(303, 70%, 50%)"
  },
  {
      "country": "Canada",
      "Category 1": 175,
      "Category 1 Color": "hsl(53, 70%, 50%)",
      "Category 2": 145,
      "Category 2 Color": "hsl(235, 70%, 50%)",
      "Category 3": 120,
      "Category 3 Color": "hsl(146, 70%, 50%)",
      "Category 4": 120,
      "Category 4 Color": "hsl(280, 70%, 50%)"
  },
  {
      "country": "Brazil",
      "Category 1": 175,
      "Category 1 Color": "hsl(53, 70%, 50%)",
      "Category 2": 145,
      "Category 2 Color": "hsl(235, 70%, 50%)",
      "Category 3": 120,
      "Category 3 Color": "hsl(146, 70%, 50%)",
      "Category 4": 120,
      "Category 4 Color": "hsl(297, 70%, 50%)"
  },
  {
      "country": "Australia",
      "Category 1": 140,
      "Category 1 Color": "hsl(53, 70%, 50%)",
      "Category 2": 120,
      "Category 2 Color": "hsl(235, 70%, 50%)",
      "Category 3": 110,
      "Category 3 Color": "hsl(146, 70%, 50%)",
      "Category 4": 80,
      "Category 4 Color": "hsl(303, 70%, 50%)"
  }
]
//<DashboardChoropleth data={getDashboardData("Scenario X", "spatialComparison")} />
function ChoroplethImageSlider() {
  return (
    <div className="slider">
      <div className="slider-container">
        <div className="image-container">
          <ReactCompareSlider
            itemOne={<DashboardChoropleth data={getDashboardData("Scenario X", "spatialComparison")} />}
            itemTwo={<DashboardChoropleth data={getDashboardData("Scenario Y", "spatialComparison")} />}
            className="test-wrapper"
          />
        </div>
      </div>
    </div>
  );
}

export default ChoroplethImageSlider;
