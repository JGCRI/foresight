import Dropdown from 'react-bootstrap/Dropdown';

import { MdSettings } from "react-icons/md";

function ChoroplethControl({palette, interpolation, changePalette, changeInterpolation}) {
  //console.log(color, scale);
  const colorList = ["pal_16", "pal_spectral", "pal_basic", "pal_hot", "pal_wet", "pal_green"];
  const scaleList = ["VALUE - LINEAR", "VALUE - LOG", "VALUE - CUBIC", "DATA - EQUAL", "DATA - SIGMOID"];
  let colors = [];
  let scales = [];
  for (let i = 0; i < colorList.length; i++) {
    if(colorList[i] === palette) {
      colors.push(
        <Dropdown.Item as="button" key={colorList[i]} active onClick={() => changePalette(colorList[i])}>
          {colorList[i]}
        </Dropdown.Item>
      )
    }
    else {
      colors.push(
        <Dropdown.Item as="button" key={colorList[i]} onClick={() => changePalette(colorList[i])}>
          {colorList[i]}
        </Dropdown.Item>
      )
    }
  }

  for (let i = 0; i < scaleList.length; i++) {
    if(scaleList[i] === interpolation) {
      scales.push(
        <Dropdown.Item as="button" key={scaleList[i]} active onClick={() => changeInterpolation(scaleList[i])}>
          {scaleList[i]}
        </Dropdown.Item>
      )
    }
    else {
      scales.push(
        <Dropdown.Item as="button" key={scaleList[i]} onClick={() => changeInterpolation(scaleList[i])}>
          {scaleList[i]}
        </Dropdown.Item>
      )
    }
  }

  return (
    <Dropdown className = "choropleth-control">
      <Dropdown.Toggle variant="outline-secondary" size="sm" id="dropdown-basic">
        <MdSettings/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Header>Colors</Dropdown.Header>
        {colors}
        <Dropdown.Divider />
        <Dropdown.Header>Scales</Dropdown.Header>
        {scales}
      </Dropdown.Menu>
    </Dropdown>
  );
}


export default ChoroplethControl;