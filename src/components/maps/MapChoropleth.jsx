import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function getColor(density) {
  return density > 1000
    ? "#800026"
    : density > 500
    ? "#BD0026"
    : density > 200
    ? "#E31A1C"
    : density > 100
    ? "#FC4E2A"
    : density > 50
    ? "#FD8D3C"
    : density > 20
    ? "#FEB24C"
    : density > 10
    ? "#FED976"
    : "#FFEDA0";
}

function LegendControl() {
  const map = useMap();

  useEffect(() => {
    const legendControl = L.control({ position: "bottomright" });

    legendControl.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      const grades = [0, 10, 20, 50, 100, 200, 500, 1000];

      for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' +
          getColor(grades[i] + 1) +
          '"></i> ' +
          grades[i] +
          (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }

      return div;
    };

    legendControl.addTo(map);

    return () => {
      legendControl.remove();
    };
  }, [map]);

  return null;
}

function MapChoropleth({ width, height, data }) {
  const [highlightedFeature, setHighlightedFeature] = useState(null);

  const geoJSONStyle = (feature) => {
    const density = feature.properties.density;

    return {
      fillColor: getColor(density),
      weight: highlightedFeature === feature ? 5 : 2, // Increase border weight if highlighted
      opacity: 1,
      color: highlightedFeature === feature ? "#444" : "white", // Change border color if highlighted
      dashArray: highlightedFeature === feature ? null : "3", // Use null for solid line if highlighted
      fillOpacity: 0.7,
    };
  };

  const highlightFeature = (event) => {
    const layer = event.target;
    layer.bringToFront(); // Bring the highlighted shape to the front
    layer.setStyle({
      weight: 5,
      color: "#444",
      dashArray: null,
    });
    setHighlightedFeature(layer.feature);
  };

  const resetHighlight = (event) => {
    const layer = event.target;
    layer.setStyle({ fillColor: getColor(layer.feature.properties.density) });
    setHighlightedFeature(null);
  };

  return (
    <div className="chart-container">
      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        style={{ width: width, height: height }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <GeoJSON
          data={data}
          style={geoJSONStyle}
          onEachFeature={(feature, layer) => {
            layer.on({
              mouseover: (event) => {
                highlightFeature(event);
                layer.openPopup(); // Open the popup on mouseover
              },
              mouseout: (event) => {
                resetHighlight(event);
                layer.closePopup(); // Close the popup on mouseout
              },
            });

            const { name, density } = feature.properties;
            const popupContent = `<strong>${name}</strong><br>Density: ${density}`;

            layer.bindPopup(popupContent); // Add the popup content to the layer
          }}
        />

        <LegendControl />
      </MapContainer>
    </div>
  );
}

export default MapChoropleth;
