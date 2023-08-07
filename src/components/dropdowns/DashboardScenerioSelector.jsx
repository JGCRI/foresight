import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { setScenerios } from "../Store";
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';

function DashboardScenerioSelector({curIndex, curOpen, scenerios, current, updateScenerios}) {
    const list = scenerios;
    const starting = current;
    const cIndex= curIndex;
    const cOpen = curOpen;
    const [value, setValue] = useState(starting);

    const handlePress = (scenerioTitle) => {
        setValue(scenerioTitle);
        updateScenerios(cIndex, scenerioTitle, cOpen);
    }

    //Maps the dropdown menu. Takes in the vector of all scenerios and creates 
    //a Dropdown.Item for each.
    const links = list.map((scenerio) => (
        <div key={scenerio.title}>
            <Dropdown.Item as="button" onClick={() => handlePress(scenerio.title)}>
                {scenerio.title}
            </Dropdown.Item>
        </div>
    ))

    return (
        <div>
            <Dropdown as={ButtonGroup}>
                <Button variant="outline-light">{value}</Button>

                <Dropdown.Toggle 
                    split 
                    variant="outline-warning" 
                    id="dropdown-split-basic" 

                />

                <Dropdown.Menu>
                    {links}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

//Maps the newly selected scenerio to storage. Also takes the current index
//and the list of current open scenerios for positioning purposes.
function mapDispatchToProps(dispatch) {
    return {
        updateScenerios: (newIndex, newTitle, openScenerio) => dispatch(setScenerios(newIndex, newTitle, openScenerio))
    };
}

export default connect(null, mapDispatchToProps)(DashboardScenerioSelector);