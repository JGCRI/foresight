import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';
import { useState } from 'react';
import { getColorsFromPalette } from '../data/GcamColors';

/**
 * An expandable legend on the bottom-left of the choropleth.
 * 
 * @param {object} props - The component props.
 * @param {object[]} props.data - Choropleth data for the first scenario.
 * @param {object[]} props.data2 - Choropleth data for the second scenario.
 * @param {string} props.mapRegion - Map region type.
 * @param {string} props.color - Name of the currently selected color palette.
 * @param {number} props.divisions - The number of colors currently shown.
 * The default is an 8 group split.
 * @returns {ReactElement} The rendered component.
 */
export default function ChoroplethLegend({ data, data2, mapRegion, color, divisions }) {
  const [opened, setOpened] = useState(true);
  function getColorValues(color, number, n) {
    const colors = getColorsFromPalette(color);
    return colors[Math.floor(((Object.keys(colors).length - 1) / n) * (n - number))];
  }


  function getMaxValueByColor(targetColor, data) {
    const filteredCountries = data.filter(country => country.color === targetColor);
    const values = filteredCountries.map(country => country.value);
    const maxValue = Math.max(...values);
    return maxValue < 10 ? Math.round(maxValue * 100) / 100 : Math.round(maxValue);
  }

  const digitsBeforeDecimal = (num) => {
    if (!Number.isFinite(num)) return 0;
    return Math.abs(num.toString().split('.')[0]).toString().length;
  }

  const getDisplayValues = (num) => {
    let numLength = digitsBeforeDecimal(num);
    if(numLength > 9)
      return (num / 1000000000).toFixed(2) + "B";
    else if(numLength > 6)
      return (num / 1000000).toFixed(2) + "M";
    else if (numLength > 5)
      return (num / 100000).toFixed(2) + "K";
    return num.toString();
  }

  const rows = () => {
    let rowHTML = [];
    let isNegative = getMaxValueByColor(getColorValues(color, 0, divisions), data) < 0;
    let min = 0;
    rowHTML.push(opened ? (<MdArrowDownward className="choropleth-legend-arrow-closed" onClick={() => setOpened(false)} />) : (<MdArrowUpward key={"choroplethlegend01"} className="choropleth-legend-arrow" onClick={() => setOpened(true)} />))
    rowHTML.push(opened ? (<div className="choropleth-legend-text-closed" onClick={() => setOpened(false)}> Legend </div>) : (<div className="choropleth-legend-text-closed" onClick={() => setOpened(true)}> Legend </div>))
    if ((mapRegion === 'region' && data.length < 32) || ((mapRegion === 'glu' || mapRegion === 'basin') && data.length < 235)) {
      rowHTML.push(<div className={opened ? "choropleth-legend-color" : "choropleth-legend-closed"} style={{ backgroundColor: "#666666" }}></div>);
      rowHTML.push(<div className={opened ? "choropleth-legend-text" : "choropleth-legend-closed"}> <strong>No Data</strong> </div>);
    }
    for (let index = divisions; index >= 0; index--) {
      let max = Math.max(getMaxValueByColor(getColorValues(color, index, divisions), data), getMaxValueByColor(getColorValues(color, index, divisions), data2));
      //console.log(data, color, max);
      if (max !== -Infinity) {
        rowHTML.push(<div key={index + "2choroplethlegend"} className={opened ? "choropleth-legend-color" : "choropleth-legend-closed"} style={{ backgroundColor: getColorValues(color, index, divisions) }}></div>);
        rowHTML.push(!isNegative ? <div key={index + "3choroplethlegend"} className={opened ? "choropleth-legend-text" : "choropleth-legend-closed"}> <strong>{getDisplayValues(min)}</strong> to <strong>{getDisplayValues(max)}</strong> </div> : <div key={index + "3choroplethlegend"} className={opened ? "choropleth-legend-text" : "choropleth-legend-closed"}> <strong>{getDisplayValues(max)}</strong> to <strong>{getDisplayValues(min)}</strong> </div>);
        min = max;
      }
    }
    return (
      <div className={"choropleth-legend-grid"}>
        {rowHTML}
      </div>
    )
  };

  return (
    <div title="Map legend" className="choropleth-legend-container">
      {rows()}
    </div>
  );
}