import Dropdown from 'react-bootstrap/Dropdown';

import { MdSettings } from "react-icons/md";
import { setChoroplethColor, setChoroplethScale } from '../Store';
import { connect } from 'react-redux';

function ChoroplethControl({color, scale, updateColor, updateScale}) {
  console.log(color, scale);
  const colorList = ["Spectral", "Rd-Yl-Gr", "Contrast", "Green"];
  const scaleList = ["Linear", "Log"];
  let colors = [];
  let scales = [];
  for (let i = 0; i < colorList.length; i++) {
    if(i === color) {
      colors.push(
        <Dropdown.Item as="button" active onClick={() => updateColor(i)}>
          {colorList[i]}
        </Dropdown.Item>
      )
    }
    else {
      colors.push(
        <Dropdown.Item as="button" onClick={() => updateColor(i)}>
          {colorList[i]}
        </Dropdown.Item>
      )
    }
  }

  for (let i = 0; i < scaleList.length; i++) {
    if(i === scale) {
      scales.push(
        <Dropdown.Item as="button" active onClick={() => updateScale(i)}>
          {scaleList[i]}
        </Dropdown.Item>
      )
    }
    else {
      scales.push(
        <Dropdown.Item as="button" onClick={() => updateScale(i)}>
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
        {colors.map((c) => (c))}
        <Dropdown.Divider />
        {scales.map((s) => (s))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

function mapDispatchToProps(dispatch) {
  return {
      updateColor: (color) => dispatch(setChoroplethColor(color)),
      updateScale: (scale) => dispatch(setChoroplethScale(scale)),
  };
}

//Gets open scenerios, open guages, and the current selected guage from storage.
function mapStateToProps(state) {
  return {
      color: state.choroplethColor,
      scale: state.choroplethScale,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoroplethControl);