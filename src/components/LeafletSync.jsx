import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import "leaflet.sync";
import landcells from "./maps/data/landcells.json"
import {
  ReactCompareSlider
} from "react-compare-slider";
import { getChoroplethValue, getSmallestChoropleth, getLargestChoropleth } from '../assets/data/DataManager';

import { connect } from 'react-redux';
import { setDashReg } from './Store';
import ChoroplethControl from './dropdowns/ChoroplethControl';

const LeafletSync = ({ data, data2, uniqueValue, setdashboardReg, color, scale }) => {
  //console.log("***", data, data2);
  const mapData = data
  const mapData2 = data2
  // Map state:
  const [mapInstance, setMapInstance] = useState(null);
  const [mapInstance2, setMapInstance2] = useState(null);

  const [country, setCountryDisplay] = useState("");
  function getColorValues(color, seg) {
    let colorValues = [['#D7191C', '#FDAE61', '#FFFFBG', '#4575B4', '#D1E5F0', '#1B7837', '#E7D4E8', '#762A83'],
    ['#D73027', '#F46D43', '#FDAE61', '#FEE08B', '#D9EF8B', '#A6D96A', '#66BD63', '#1A9850'],
    ['#E41A1C', '#377EB8', '#4DAF4A', '#984EA3', '#FF7F00', '#FFFF33', '#A65628', '#F781BF'],
    ['#005A32', '#238B45', '#41AB5D', '#74C476', '#A1D99B', '#C7E9C0', '#E5F5E0', '#F7FCF5']]
    return colorValues[parseInt(color)][seg];
  }

  function getScaleValues(scale, seg) {
    let scaleValues = [[43, 37, 31, 25, 19, 12, 6],[30, 19, 12, 7, 4, 2, 1],[49, 25, 10, 5, 3, 2, 1]]
    return scaleValues[parseInt(scale)][seg]
  }
  function getColor(d, data) {
    //console.log("**", d, data);
    var minval = getSmallestChoropleth(data);
    var maxval = getLargestChoropleth(data);
    var seg = (maxval - minval) / 50;
    return d > minval + seg * getScaleValues(scale, 0) ? getColorValues(color, 0) :
      d > minval + seg * getScaleValues(scale, 1) ? getColorValues(color, 1) :
        d > minval + seg * getScaleValues(scale, 2) ? getColorValues(color, 2) :
          d > minval + seg * getScaleValues(scale, 3) ? getColorValues(color, 3) :
            d > minval + seg * getScaleValues(scale, 4) ? getColorValues(color, 4) :
              d > minval + seg * getScaleValues(scale, 5) ? getColorValues(color, 5) :
                d > minval + seg * getScaleValues(scale, 6) ? getColorValues(color, 6) :
                  getColorValues(color, 7);
  }

  function style(feature) {
    return {
      fillColor: getColor(getChoroplethValue(mapData, feature.id), mapData),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }

  function style2(feature) {
    return {
      fillColor: getColor(getChoroplethValue(mapData2, feature.id), mapData2),
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
    height: '100%',
  };

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

  const mapParams2 = {
    center: [0, 0], // USA
    zoom: 1.5,
    zoomControl: false,
    zoomSnap: 0.75,
    closePopupOnClick: false,
    maxBoundsViscosity: 1.0,
    minZoom: 0.8,
    layers: [tileRef2.current], // Start with just the base layer
  };

  // Map creation:
  useEffect(() => {
    mapRef.current = L.map(mapkey + '_1', mapParams);
    // Set map instance to state:
    if (!mapInstance) {
      setMapInstance(mapRef.current);
    }
    mapRef2.current = L.map(mapkey + '_2', mapParams2);
    // Set map instance to state:
    if (!mapInstance2)
      setMapInstance2(mapRef2.current);
  }, []);

  var legend = L.control();

  legend.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
  };

  legend.update = function (props) {
    this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
    '<b>' + props.name + '</b><br />' + getChoroplethValue(mapData, props.id) + ' people / mi<sup>2</sup>'
    : 'Hover over a state');
  };
  // If you want to use the mapInstance in a useEffect hook,
  // you first have to make sure the map exists. Then, you can add your logic.
  useEffect(() => {
    // Check for the map instance before adding something (ie: another event handler).
    // If no map, return:
    if (!mapInstance || !mapInstance2) return;
    if (mapInstance) {
      var bounds = L.latLngBounds(L.latLng(-89.98155760646617, -180), L.latLng(89.99346179538875, 180));
      mapInstance.setMaxBounds(bounds);
      mapInstance.on('drag', function() {
        mapInstance.panInsideBounds(bounds, { animate: false });
      });
      mapInstance.on('zoomstart', () => {
        console.log('Zooming1!!!');
      });
    }
    if (mapInstance2) {
      mapInstance2.setMaxBounds(bounds);
      mapInstance2.on('drag', function() {
        mapInstance2.panInsideBounds(bounds, { animate: false });
      });
      mapInstance2.on('zoomstart', () => {
        console.log('Zooming2!!!');
      });
    }
    mapInstance.eachLayer(function (layer) {
      mapInstance.removeLayer(layer);
    });
    mapInstance2.eachLayer(function (layer) {
      mapInstance2.removeLayer(layer);
    });
    var map_base = L.layerGroup([tileRef.current]);
    var map2_base = L.layerGroup([tileRef2.current]);
    map_base.addTo(mapInstance);
    map2_base.addTo(mapInstance2);
    L.geoJSON(landcells, { style: style, onEachFeature: onEachFeature }).addTo(mapInstance);
    L.geoJSON(landcells, { style: style2, onEachFeature: onEachFeature }).addTo(mapInstance2);
    
    //mapInstance.addControl(legend);
    mapInstance.sync(mapInstance2);
    mapInstance2.sync(mapInstance);
  }, [mapInstance, mapInstance2, mapData, mapData2]);

  function highlightFeature(e) {
    var layer = e.target;
    setCountryDisplay(e.sourceTarget.feature.id);
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
    layer.setStyle({
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    });
  }

  function setCountry(e) {
    setdashboardReg(e.sourceTarget.feature.id);
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
    <div className="slider grid-border">
      <div className="slider-container">
        <div className="image-container">
          <div className="choropleth-data-info">
            {country}
            {country===""?"":" - " + getChoroplethValue(mapData, country).toFixed(2)}
          </div>
          <ChoroplethControl/>
          <div id="map" />
          <ReactCompareSlider
            itemOne={
              <div id={mapkey + '_1'} style={mapStyles} />
            }
            itemTwo={
              <div id={mapkey + '_2'} style={mapStyles} />
            }
            onlyHandleDraggable
            className="map-wrapper"
          />
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    color: state.choroplethColor,
    scale: state.choroplethScale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      setdashboardReg: (reg) => dispatch(setDashReg(reg)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeafletSync);
