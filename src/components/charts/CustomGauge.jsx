import React from "react";
import GaugeChart from "react-gauge-chart";
import PropTypes from "prop-types";

const CustomGauge = ({ value, height }) => {
  const percentValue = (value + 100) / 200;

  let colors = ["#ff0000", "#ffa500", "#ffff00", "#00ff00"]; // Red, Orange, Yellow, Green
  let needleColor = colors[0];
  let needleBaseColor = colors[0];

  if (value >= -50 && value < 0) {
    needleColor = colors[1]; // Orange
    needleBaseColor = colors[1];
  } else if (value >= 0 && value < 50) {
    needleColor = colors[2]; // Yellow
    needleBaseColor = colors[2];
  } else if (value >= 50 && value <= 100) {
    needleColor = colors[3]; // Green
    needleBaseColor = colors[3];
  }

  const containerStyle = {
    width: `${2 * height}px`, // Width is always 2 times the height
    height: `${height}px`, // Container height based on input
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "30px",
  };

  const gaugeSize = 0.8 * height; // Adjust the multiplier to change the gauge size

  const wrapperSize = 1.2 * gaugeSize; // Adjust the multiplier to change the wrapper size

  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#464A4F",
    borderRadius: "10px",
    width: `${wrapperSize}px`, // Wrapper width is based on the wrapperSize
    height: `${wrapperSize}px`, // Wrapper height is based on the wrapperSize
    paddingTop: "20px"
  };

  const gaugeStyle = {
    position: "relative",
    width: `${gaugeSize}px`, // Gauge width is based on the gaugeSize
    height: `${gaugeSize}px`, // Gauge height is based on the gaugeSize
  };

  const zeroDivStyle = {
    position: "absolute",
    top: "-5px",
    left: "50%",
    transform: "translate(-50%, 0)",
    display: "flex",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#FFF",
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        <div style={gaugeStyle}>
          <GaugeChart
            id="custom-gauge"
            nrOfLevels={4}
            arcWidth={0.1}
            percent={percentValue}
            needleColor={needleColor + "80"}
            needleBaseColor={needleBaseColor + "CC"}
            colors={colors}
            arcPadding={0.02}
            hideText
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "20px", // Font size is based on the fontSize
              fontWeight: "bold",
              color: "#FFF",
            }}
          >
            {value}
          </div>
          <div style={zeroDivStyle}>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

CustomGauge.propTypes = {
  value: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default CustomGauge;
