import Dropdown from 'react-bootstrap/Dropdown';

import { MdSettings } from "react-icons/md";

/**
 * A dropdown menu for Choropleth settings.
 * 
 * @param {object} props - The component props.
 * @param {string} props.palette - Currently selected color palette.
 * @param {string} props.interpolation - Currently selected interpolation.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.changePalette - Function 
 * modifying the current color palette.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.changeInterpolation - Function 
 * modifying the current interpolation.
 * @returns {ReactElement} The rendered component.
 */
function ChoroplethControl({palette, interpolation, changePalette, changeInterpolation}) {
  //console.log(color, scale);
  const colorList = ["pal_16", "pal_spectral", "pal_basic", "pal_hot", "pal_wet", "pal_green", "pal_div_wet", "pal_div_BlRd", "pal_div_RdBl", "pal_div_BrGn", "pal_div_GnBr", "pal_div_BluRd", "pal_div_RdBlu"];
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
    <Dropdown title="Choropleth settings" className = "choropleth-control" id="graph-choropleth-settings">
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