import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';
import { getColorsFromPalette } from '../../assets/data/GcamColors';
import { useState } from 'react';

export default function ChoroplethLegend({ data, color, scale, divisions }) {
  const [opened, setOpened] = useState(true);

  function getColorValues(color, number, n) {
    const colors = getColorsFromPalette(color);
    return colors[Math.floor(((Object.keys(colors).length - 1) / n) * (n - number))];
  }


  function getMaxValueByColor(targetColor) {
    const filteredCountries = data.filter(country => country.color === targetColor);
    const values = filteredCountries.map(country => country.value);
    const maxValue = Math.max(...values);
    return maxValue < 10 ? Math.round(maxValue * 100) / 100 : Math.round(maxValue);
  }

  const rows = () => {
    let rowHTML = [];
    let min = 0;
    rowHTML.push(opened ? (<MdArrowDownward className="choropleth-legend-arrow-closed" onClick={() => setOpened(false)} />) : (<MdArrowUpward key={"choroplethlegend01"} className="choropleth-legend-arrow" onClick={() => setOpened(true)} />))
    rowHTML.push(opened ? (<div className="choropleth-legend-text-closed" onClick={() => setOpened(false)}> Legend </div>) : (<div className="choropleth-legend-text-closed" onClick={() => setOpened(true)}> Legend </div>))
    for (let index = divisions; index >= 0; index--) {
      let max = getMaxValueByColor(getColorValues(color, index, divisions));
      if (max !== -Infinity) {
        rowHTML.push(<div key={index + "2choroplethlegend"} className={opened ? "choropleth-legend-color" : "choropleth-legend-closed"} style={{ backgroundColor: getColorValues(color, index, divisions) }}></div>);
        rowHTML.push(<div key={index + "3choroplethlegend"} className={opened ? "choropleth-legend-text" : "choropleth-legend-closed"}> <strong>{min}</strong> to <strong>{max}</strong> </div>);
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
    <div className="choropleth-legend-container">
      {rows()}
    </div>
  );
}