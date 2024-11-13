import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import "leaflet.sync";
import landcells from "./data/landcells.json"
import global from "./data/global.json"
import regions_glu from "./data/regions_glu.json"
import glu from "./data/glu.json"
import { getChoroplethValue } from '../../assets/data/DataManager';
import { updateHash } from '../sharing/DashboardUrl';


const DashboardLeaflet = ({ data, region, basinAggregation, displayLegend, id, setRegion, mapInstance, setMapInstance, mapStyles, getColor, setCountryDisplay, setCountryDisplayValue, choroplethColorPalette, choroplethInterpolation, divisions }) => {
  const mapData = data;
  const getJson = (data) => {
    if(!data || !data[0] || !data[0].id || data === 'i') return;
    const firstCountry = data[0].id.toLowerCase();
    //console.log(firstCountry.includes("|"));
    if(firstCountry === 'global')
      return global;
    else if(basinAggregation === 'Basin')
      return glu;
    else if(basinAggregation === 'BasinRegion')
      return regions_glu;
    return landcells;
  }
  mapData.forEach(country => {
    country.color = getColor(country.value, data, country.id);
  });
  //console.log(mapData);
  const mapJson = getJson(mapData);

  function style(feature) {
    //console.log(feature.id, getColor(getChoroplethValue(mapData, feature.id), mapData, feature.id))
    return {
      fillColor: getColor(getChoroplethValue(mapData, feature.id), mapData, feature.id),
      weight: feature.id === region ? 5 : 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: feature.id === region ? 0.8 : 0.6
    };
  }

  // Map refs:
  const mapRef = useRef(null);
  const tileRef = useRef(null);

  // Base tile for the map:
  tileRef.current = L.tileLayer(
    `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  // Options for our map instance:
  const mapParams = {
    center: [0, 0],
    zoom: 1.5,
    zoomControl: false,
    zoomSnap: 0.75,
    closePopupOnClick: false,
    maxBoundsViscosity: 1.0,
    minZoom: 0.8,
    layers: [tileRef.current], // Start with just the base layer
  };

  // Map creation:
  useEffect(() => {
    // Set map instance to state:
    if (!mapInstance) {
      mapRef.current = L.map(id, mapParams);
      setMapInstance(mapRef.current);
    }
  }, []);

  // If you want to use the mapInstance in a useEffect hook,
  // you first have to make sure the map exists. Then, you can add your logic.
  useEffect(() => {
    // Check for the map instance before adding something (ie: another event handler).
    // If no map, return:
    if (!mapInstance) return;
    var bounds = L.latLngBounds(L.latLng(-89.98155760646617, -180), L.latLng(89.99346179538875, 180));
    mapInstance.setMaxBounds(bounds);
    mapInstance.on('drag', function () {
      mapInstance.panInsideBounds(bounds, { animate: false });
    });
    mapInstance.on('zoomstart', () => {
      //console.log('Zooming1!!!');
    });
    mapInstance.eachLayer(function (layer) {
      mapInstance.removeLayer(layer);
    });
    var map_base = L.layerGroup([tileRef.current]);
    map_base.addTo(mapInstance);
    L.geoJSON(mapJson, { style: style, onEachFeature: onEachFeature }).addTo(mapInstance);
    //setMapInstance(mapInstance);
  }, [mapInstance, mapData, choroplethColorPalette, choroplethInterpolation]);

  function highlightFeature(e) {
    var layer = e.target;
    setCountryDisplay(e.sourceTarget.feature.id);
    setCountryDisplayValue(getChoroplethValue(mapData, e.sourceTarget.feature.id));
    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });

    layer.bringToFront();
  }

  function resetHighlight(e) {
    var layer = e.target;
    setCountryDisplay("");
    setCountryDisplayValue("");
    layer.setStyle({
      weight: e.sourceTarget.feature.id === region ? 5 : 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: e.sourceTarget.feature.id === region ? 0.8 : 0.6
    });
  }

  function setCountry(e) {
    setRegion(e.sourceTarget.feature.id);
    updateHash("region", e.sourceTarget.feature.id);
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: setCountry
    });
  }

  // Toggle marker on button click:
  return (
    (displayLegend) ? (
    <>
      
      <div id={id} style={mapStyles} />
    </>
    ) : (
      <div id={id} style={mapStyles} />
    )
  );
};

export default DashboardLeaflet;
