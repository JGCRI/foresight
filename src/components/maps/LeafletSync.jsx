import React, { useEffect, useState } from 'react';
// eslint-disable-next-line
import L from 'leaflet'; //This must be here to allow the leaflet sync to work correctly. Do not remove!
import "leaflet.sync";
import {
  ReactCompareSlider
} from "react-compare-slider";

import ChoroplethControl from '../dropdowns/ChoroplethControl';
import ChoroplethLegend from '../dropdowns/ChoroplethLegend';
import DashboardLeaflet from './DashboardLeaflet';
import { getSmallestChoropleth, getLargestChoropleth } from '../data/DataManager';
import { getColorsFromPalette } from '../data/GcamColors';

/**
 * A Leaflet choropleth to be synced and displayed in the LeafletSync component.
 * 
 * @param {object} props - The component props.
 * @param {object[]} props.mapRegion - Name of the geojson region type.
 * @param {string} props.choroplethColorPalette - Selected choropleth color palette.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setChoroplethColorPalette - Update the current color palette.
 * @param {string} props.choroplethInterpolation - Selected choropleth interpolation.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setInterpolation - Updates the currently selected interpolation.
 * @param {object[]} props.data - Dataset for the first scenario.
 * @param {object[]} props.data2 - Dataset for the second scenario.
 * @param {string} props.uniqueValue - Unique value to title the senario.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setRegion - Update the currently selected country.
 * @returns {ReactElement} The rendered component.
 */
const LeafletSync = ({ mapRegion, choroplethColorPalette, setChoroplethColorPalette, choroplethInterpolation, setInterpolation, data, data2, uniqueValue, setRegion }) => {
  //Map Instances
  const [mapInstance, setMapInstance] = useState(null);
  const [mapInstance2, setMapInstance2] = useState(null);
  //Choropleth Visualization Settings
  const divisions = 7;
  const [country, setCountryDisplay] = useState("");
  const [countryValue, setCountryDisplayValue] = useState(0.0);
  function getColorValues(color, number, n) {
    const colors = getColorsFromPalette(color);
    return colors[Math.floor(((Object.keys(colors).length - 1) / n) * (n - number))];
  }
  //console.log(countryValue);
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
    return getColorValues(choroplethColorPalette, Math.min(Math.abs(bracket), divisions), divisions);
  }

  function getRelativeDataValue(countryValue) {
    if (data.length === 0) return -1;
    return (countryValue - getSmallestChoropleth(data)) / (getLargestChoropleth(data) - getSmallestChoropleth(data))
  }

  function getRank(data, country) {
    data.sort((a, b) => b.value - a.value);
    const index = data.findIndex(item => item.id === country);
    return index !== -1 ? index + 1 : -1;
  }

  function getColor(value, data, country) {
    return value ? getScaleValuesTest(getRelativeDataValue(value), getRank(data, country), Object.keys(data).length) : "#333333";
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
            {country === "" ? "" : country.slice(0, -2) + ": "}
            <strong>{country === "" ? "" : ((country.slice(-2) === "_1" ? getRank(data, country.slice(0, -2)) === -1 : getRank(data2, country.slice(0, -2)) === -1) ? "No Data" : Number(countryValue).toFixed(2))}</strong>
          </div>
          <ChoroplethControl
            palette={choroplethColorPalette}
            interpolation={choroplethInterpolation}
            changePalette={setChoroplethColorPalette}
            changeInterpolation={setInterpolation}
          />
          <ChoroplethLegend
            data={data}
            data2={data2}
            mapRegion={mapRegion}
            color={choroplethColorPalette}
            divisions={divisions}
          />
          <div id="map" />
          <ReactCompareSlider
            itemOne={
              <DashboardLeaflet
                data={data}
                displayLegend={true}
                id={mapkey + '_1'}
                setRegion={setRegion}
                mapInstance={mapInstance}
                setMapInstance={setMapInstance}
                mapRegion={mapRegion}
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
                displayLegend={false}
                id={mapkey + '_2'}
                setRegion={setRegion}
                mapInstance={mapInstance2}
                setMapInstance={setMapInstance2}
                mapRegion={mapRegion}
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
