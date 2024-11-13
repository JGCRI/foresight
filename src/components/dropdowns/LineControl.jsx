import Dropdown from 'react-bootstrap/Dropdown';

import { MdSettings } from "react-icons/md";

function LineControl({setLineFilter, lineFilter}) {
  //console.log(color, scale);
  const lineList = ["Default", "By Region", "By Class", "By Region + Class"];
  let lineSettings = [];
  for (let i = 0; i < lineList.length; i++) {
    if(lineList[i] === lineFilter) {
      lineSettings.push(
        <Dropdown.Item as="button" key={lineList[i]} active onClick={() => setLineFilter(lineList[i])}>
          {lineList[i]}
        </Dropdown.Item>
      )
    }
    else {
      lineSettings.push(
        <Dropdown.Item as="button" key={lineList[i]} onClick={() => setLineFilter(lineList[i])}>
          {lineList[i]}
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
        <Dropdown.Header>Line Options</Dropdown.Header>
        {lineSettings}
      </Dropdown.Menu>
    </Dropdown>
  );
}


export default LineControl;