import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import "leaflet.sync";
import {
  ReactCompareSlider
} from "react-compare-slider";
import { getSmallestChoropleth, getLargestChoropleth } from '../../assets/data/DataManager';

import ChoroplethControl from '../dropdowns/ChoroplethControl';
import { getColorsFromPalette } from '../../assets/data/GcamColors';
import ChoroplethLegend from '../dropdowns/ChoroplethLegend';
import DashboardLeaflet from './DashboardLeaflet';

const LeafletSync = ({ basinAggregation, choroplethColorPalette, setChoroplethColorPalette, choroplethInterpolation, setInterpolation, region, data, data2, uniqueValue, setRegion }) => {
  //Map Instances
  const [mapInstance, setMapInstance] = useState(null);
  const [mapInstance2, setMapInstance2] = useState(null);

  //Choropleth Visualization Settings
  const divisions = 7;

  const [country, setCountryDisplay] = useState("");
  const [countryValue, setCountryDisplayValue] = useState(0);

  function getColorValues(color, number, n) {
    const colors = getColorsFromPalette(color);
    return colors[Math.floor(((Object.keys(colors).length - 1) / n) * (n - number))];
  }

  function getScaleValuesTest(value, placement, dataLength) {
    let bracket = 0;
    switch (choroplethInterpolation) {
      case "VALUE - LINEAR":
        bracket = Math.round((1 - value) * (divisions - 1));
        break;
      case "VALUE - LOG":
        bracket = divisions - Math.round(divisions * (-1 * Math.exp(-5 * (value)) + 1));
        break;
      case "VALUE - CUBIC":
        bracket = Math.round(((1 - value) ** 3) * (divisions - 1));
        break;
      case "DATA - EQUAL":
        bracket = Math.round((placement / dataLength) * divisions);
        break;
      case "DATA - SIGMOID":
        bracket = Math.round(divisions / (1 + Math.exp(-10 * (placement / dataLength) + 5)));
        break;
      default:
        bracket = divisions - Math.round(divisions * (-1 * Math.exp(-5 * (value)) + 1));
        break;
    }
    //console.log(bracket, getColorValues(choroplethColorPalette, Math.min(Math.abs(bracket), divisions), divisions));
    return getColorValues(choroplethColorPalette, Math.min(Math.abs(bracket), divisions), divisions);
  }

  function getRelativeDataValue(countryValue) {
    return (countryValue - getSmallestChoropleth(data)) / (getLargestChoropleth(data) - getSmallestChoropleth(data))
  }

  function getRank(data, country) {
    data.sort((a, b) => b.value - a.value);
    const index = data.findIndex(item => item.id === country);
    return index !== -1 ? index + 1 : -1;
  }

  function getColor(value, data, country) {
    //console.log("**", value, data.length, getRelativeDataValue(value), getRank(data, country));
    return (value && data.length > 0 && data[0].value) ? getScaleValuesTest(getRelativeDataValue(value), getRank(data, country), Object.keys(data).length) : "#333333";
  }

  // Map refs:
  const mapkey = uniqueValue

  const mapStyles = {
    width: '100%',
    height: '100%',
  };

  useEffect(() => {
    // Check for the map instance before adding something (ie: another event handler).
    // If no map, return:
    if (!mapInstance || !mapInstance2) return;
    mapInstance.sync(mapInstance2);
    mapInstance2.sync(mapInstance);
  }, [mapInstance, mapInstance2, choroplethColorPalette, choroplethInterpolation]);

  // Toggle marker on button click:
  return (
    <div className="slider grid-border">
      <div className="slider-container">
        <div className="image-container">
          <div className="choropleth-data-info">
            {country === "" ? "" : country + ": "}
            <strong>{country === "" ? "" : countryValue.toFixed(2)}</strong>
          </div>
          <ChoroplethControl
            palette={choroplethColorPalette}
            interpolation={choroplethInterpolation}
            changePalette={setChoroplethColorPalette}
            changeInterpolation={setInterpolation}
          />
          <ChoroplethLegend
            data={data}
            color={choroplethColorPalette}
            scale={choroplethInterpolation}
            divisions={divisions}
          />
          <div id="map" />
          <ReactCompareSlider
            itemOne={
              <DashboardLeaflet
                data={data}
                region={region}
                basinAggregation={basinAggregation}
                displayLegend={true}
                id={mapkey + '_1'}
                setRegion={setRegion}
                mapInstance={mapInstance}
                setMapInstance={setMapInstance}
                mapStyles={mapStyles}
                getColor={getColor}
                setCountryDisplay={setCountryDisplay}
                setCountryDisplayValue={setCountryDisplayValue}
                choroplethColorPalette={choroplethColorPalette}
                choroplethInterpolation={choroplethInterpolation}
                divisions={divisions}
              />
            }
            itemTwo={
              <DashboardLeaflet
                data={data2}
                region={region}
                basinAggregation={basinAggregation}
                displayLegend={false}
                id={mapkey + '_2'}
                setRegion={setRegion}
                mapInstance={mapInstance2}
                setMapInstance={setMapInstance2}
                mapStyles={mapStyles}
                getColor={getColor}
                setCountryDisplay={setCountryDisplay}
                setCountryDisplayValue={setCountryDisplayValue}
                choroplethColorPalette={choroplethColorPalette}
                choroplethInterpolation={choroplethInterpolation}
                divisions={divisions}
              />
            }
            onlyHandleDraggable
            className="map-wrapper"
          />
        </div>
      </div>
    </div>
  );
};

export default LeafletSync;
