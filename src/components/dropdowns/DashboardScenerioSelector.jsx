import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { setScenerios } from "../Store";
import { connect } from 'react-redux';
import ScenerioGuage from "../guages/ScenerioGuage"
import ScenerioGuageNegative from "../guages/ScenerioGuageNegative"
import Dropdown from 'react-bootstrap/Dropdown';

function DashboardScenerioSelector({ curIndex, curOpen, scenerios, current, updateScenerios, guages, openGuage, update }) {
    const list = scenerios; //List of all possible scenerios
    const cIndex = curIndex; //Number of current row
    const cOpen = curOpen; //Currently open scenerios
    const guageLists = guages; //All open guages
    const openGuages = openGuage; //Currently selected guage category
    const updateSelect = update; //Function to update selected guage
    const [value, setValue] = useState(current); //Currently selected scenerio

    const dummyData = [
        {
            scenerio: "Scenerio X",
            field: "runoff",
            data: -75
        },
        {
            scenerio: "Scenerio X",
            field: "yields",
            data: 50
        },
        {
            scenerio: "Scenerio X",
            field: "temp",
            data: 25
        },
        {
            scenerio: "Scenerio X",
            field: "emiss",
            data: 75
        },
        {
            scenerio: "Scenerio X",
            field: "pop",
            data: -50
        },
        {
            scenerio: "Scenerio X",
            field: "gdp",
            data: -35
        },
        {
            scenerio: "Scenerio Y",
            field: "runoff",
            data: -45
        },
        {
            scenerio: "Scenerio Y",
            field: "yields",
            data: 30
        },
        {
            scenerio: "Scenerio Y",
            field: "temp",
            data: 45
        },
        {
            scenerio: "Scenerio Y",
            field: "emiss",
            data: 85
        },
        {
            scenerio: "Scenerio Y",
            field: "pop",
            data: -50
        },
        {
            scenerio: "Scenerio Y",
            field: "gdp",
            data: -35
        },
        {
            scenerio: "1.5 Degrees",
            field: "runoff",
            data: -50
        },
        {
            scenerio: "1.5 Degrees",
            field: "yields",
            data: 20
        },
        {
            scenerio: "1.5 Degrees",
            field: "temp",
            data: 50
        },
        {
            scenerio: "1.5 Degrees",
            field: "emiss",
            data: 90
        },
        {
            scenerio: "1.5 Degrees",
            field: "pop",
            data: -25
        },
        {
            scenerio: "1.5 Degrees",
            field: "gdp",
            data: -40
        },
        {
            scenerio: "2.0 Degrees",
            field: "runoff",
            data: -55
        },
        {
            scenerio: "2.0 Degrees",
            field: "yields",
            data: -30
        },
        {
            scenerio: "2.0 Degrees",
            field: "temp",
            data: 95
        },
        {
            scenerio: "2.0 Degrees",
            field: "emiss",
            data: 90
        },
        {
            scenerio: "2.0 Degrees",
            field: "pop",
            data: -80
        },
        {
            scenerio: "2.0 Degrees",
            field: "gdp",
            data: -70
        },
        {
            scenerio: "2.5 Degrees",
            field: "runoff",
            data: -80
        },
        {
            scenerio: "2.5 Degrees",
            field: "yields",
            data: -70
        },
        {
            scenerio: "2.5 Degrees",
            field: "temp",
            data: 150
        },
        {
            scenerio: "2.5 Degrees",
            field: "emiss",
            data: 200
        },
        {
            scenerio: "2.5 Degrees",
            field: "pop",
            data: -99
        },
        {
            scenerio: "2.5 Degrees",
            field: "gdp",
            data: -80
        },
        {
            scenerio: "3.0 Degrees",
            field: "runoff",
            data: -150
        },
        {
            scenerio: "3.0 Degrees",
            field: "yields",
            data: -200
        },
        {
            scenerio: "3.0 Degrees",
            field: "temp",
            data: 300
        },
        {
            scenerio: "3.0 Degrees",
            field: "emiss",
            data: 500
        },
        {
            scenerio: "3.0 Degrees",
            field: "pop",
            data: -500
        },
        {
            scenerio: "3.0 Degrees",
            field: "gdp",
            data: -150
        }
    ]

    const handlePress = (scenerioTitle) => {
        setValue(scenerioTitle);
        updateScenerios(cIndex, scenerioTitle, cOpen);
    }



    //This function gets data from a current dummy set. It searches the dummy
    //set for a parameter matching the passed in scenerio and guage title.
    //If the vlaue is found it is returned. Otherwise the function returns -1.
    const getDataValue = (fieldTitle) => {
        const field = fieldTitle;
        var ans = -1;
        for (var i = 0; i < dummyData.length; ++i) {
            var element = dummyData[i];
            if (element.scenerio === value && element.field === field) {
                ans = element.data;
                break;
            }
        }
        return ans;
    };

    //This function creates guages. Positive guages are created with ScenerioGuage and
    //negative values are created with ScenerioGuageNegative. Each guage asks for three
    //values, the guage if which is [GUAGE_TITLE][ROW_NUMBER] with no spaces, the text
    //to display below the guage which is given by the guage title, and the value of the
    //guage, given by the number, num.
    const guageNumber = (number, guageTitle) => {
        const num = number;
        const title = guageTitle;
        if (number < 0) {
            return (
                <ScenerioGuageNegative
                    guageText={'' + title + cIndex}
                    bottomText={title}
                    guageValue={num}
                />
            )
        }
        return (
            <ScenerioGuage
                guageText={'' + title + cIndex}
                bottomText={title}
                guageValue={num}
            />
        )
    };

    //Puts together the columns of the dashboard-grid. Triggers once per row to place the guages.
    //Takes in the current row number and title of the scenerio as parameters. Then each individual
    //guage is added using a map along the list of guages. The current selected guage is given the
    //CSS class name of guageOpen. All other guages will be styled as guageDefault. The guage is
    //created with two nested functions. The function guageNumber decides which guage to use depending
    //on if the number passed in is negative and takes in the number, row, and title of the guage for
    //guage creation. The getDataValue function retrieves the number from the current dataset.

    const getGuageCSS = (title) => {
        if (title === openGuages) {
            switch (cIndex) {
                case 0:
                    return "guageOpenTop";
                case 1:
                    return "guageOpenBottom";
                default:
                    return "guageOpen";
            }
        }
        return "guageDefault";
    }

    const col = () => {
        return (
            guageLists.map((guage, index) => (
                <div className={getGuageCSS(guage.title)} key={index} onClick={() => updateSelect(guage.title)}>
                    {guageNumber(getDataValue(guage.title), guage.title)}
                </div>
            ))
        )
    };

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
        <>
            <Dropdown as={ButtonGroup} className={"dashboard-scenerio-selector"}>
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
            {col()}
        </>
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