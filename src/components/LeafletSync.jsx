import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import styled from "styled-components";
import "leaflet.sync";
import landcells from "./maps/data/landcells.json"
import {
  ReactCompareSlider
} from "react-compare-slider";
import { getChoroplethValue } from '../assets/data/DataManager';

const LeafletSync = ({ maxval, minval, data, uniqueValue, props }) => {

  const mapData = data
  // Map state:
  const [mapInstance, setMapInstance] = useState(null);
  const [mapInstance2, setMapInstance2] = useState(null);

  function getColor(d) {
    var seg = (maxval - minval) / 50
    return d > minval + seg * 49 ? '#005A32' :
      d > minval + seg * 25 ? '#238B45' :
        d > minval + seg * 10 ? '#41AB5D' :
          d > minval + seg * 5 ? '#74C476' :
            d > minval + seg * 3 ? '#A1D99B' :
              d > minval + seg * 2 ? '#C7E9C0' :
                d > minval + seg ? '#E5F5E0' :
                  '#F7FCF5';
  }

  function style(feature) {
    console.log(getChoroplethValue(mapData, feature.id))
    return {
      fillColor: getColor(getChoroplethValue(mapData, feature.id)),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }

  // Map refs:
  const mapkey = uniqueValue
  const mapRef = useRef(null);
  const mapRef2 = useRef(null);
  const tileRef = useRef(null);
  const tileRef2 = useRef(null);

  // Base tile for the map:
  tileRef.current = L.tileLayer(
    `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  tileRef2.current = L.tileLayer(
    `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  const mapStyles = {
    width: '100%',
    height: '80vh',
  };

  // Options for our map instance:
  const mapParams = {
    center: [0, 0],
    zoom: 0.6,
    zoomControl: false,
    zoomSnap: 0.75,
    maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
    closePopupOnClick: false,
    layers: [tileRef.current], // Start with just the base layer
  };

  const mapParams2 = {
    center: [0, 0], // USA
    zoom: 0.6,
    zoomControl: false,
    zoomSnap: 0.75,
    maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
    closePopupOnClick: false,
    layers: [tileRef2.current], // Start with just the base layer
  };

  // Map creation:
  useEffect(() => {
    mapRef.current = L.map(mapkey + '_1', mapParams);
    mapRef.current.on('click', () => {
      alert('map clicked');
    });
    // Set map instance to state:
    if (!mapInstance) {
      setMapInstance(mapRef.current);
    }

    mapRef2.current = L.map(mapkey + '_2', mapParams2);
    mapRef2.current.on('click', () => {
      alert('map clicked');
    });
    // Set map instance to state:
    if (!mapInstance2)
      setMapInstance2(mapRef2.current);
  }, []);

  // If you want to use the mapInstance in a useEffect hook,
  // you first have to make sure the map exists. Then, you can add your logic.
  useEffect(() => {
    // Check for the map instance before adding something (ie: another event handler).
    // If no map, return:
    if (!mapInstance || !mapInstance2) return;
    if (mapInstance) {
      mapInstance.on('zoomstart', () => {
        console.log('Zooming1!!!');
      });
    }
    if (mapInstance2) {
      mapInstance2.on('zoomstart', () => {
        console.log('Zooming2!!!');
      });
    }
    L.geoJSON(landcells, {style: style}).addTo(mapInstance);
    L.geoJSON(landcells, {style: style}).addTo(mapInstance2);
    mapInstance.sync(mapInstance2)
    mapInstance2.sync(mapInstance)
  }, [mapInstance, mapInstance2]);
  console.log(mapkey + '1')
  // Toggle marker on button click:
  return (
    <div className="slider grid-border">
      <div className="slider-container">
        <div className="image-container">
          <div id="map" />
          <ReactCompareSlider
            itemOne={<div id={mapkey + '_1'} style={mapStyles} />}
            itemTwo={<div id={mapkey + '_2'} style={mapStyles} />}
            onlyHandleDraggable
            className="map-wrapper"
          />
        </div>
      </div>
    </div>
  );
};

export default LeafletSync;