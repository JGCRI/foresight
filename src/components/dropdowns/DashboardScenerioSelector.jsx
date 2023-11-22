import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { setDashDate, setDashReg, setDashSubs, setScenerios } from "../Store";
import { connect } from 'react-redux';
import ScenerioGuage from "../guages/ScenerioGuage"
import ScenerioGuageNegative from "../guages/ScenerioGuageNegative"
import Dropdown from 'react-bootstrap/Dropdown';
import { getIcon } from "../Dashboard";

function DashboardScenerioSelector({ curIndex, curOpen, scenerios, current, updateScenerios, guages, openGuage, update, updateDate, updateRegion, updateSubcat }) {
    const list = scenerios; //List of all possible scenerios
    const cIndex = curIndex; //Number of current row
    const cOpen = curOpen; //Currently open scenerios
    const guageLists = guages; //All open guages
    const openGuages = openGuage; //Currently selected guage category
    const updateSelect = update; //Function to update selected guage
    const [value, setValue] = useState(current); //Currently selected scenerio

    const dummyData = [
        {
            scenerio: "GCAM_SSP2",
            field: "elecByTechTWh",
            data: -75
        },
        {
            scenerio: "GCAM_SSP2",
            field: "pop",
            data: 50
        },
        {
            scenerio: "GCAM_SSP2",
            field: "test1",
            data: 25
        },
        {
            scenerio: "GCAM_SSP2",
            field: "test2",
            data: 75
        },
        {
            scenerio: "GCAM_SSP2",
            field: "test3",
            data: -50
        },
        {
            scenerio: "GCAM_SSP2",
            field: "test4",
            data: -35
        },
        {
            scenerio: "GCAM_SSP3",
            field: "elecByTechTWh",
            data: -45
        },
        {
            scenerio: "GCAM_SSP3",
            field: "pop",
            data: 30
        },
        {
            scenerio: "GCAM_SSP3",
            field: "test1",
            data: 45
        },
        {
            scenerio: "GCAM_SSP3",
            field: "test2",
            data: 85
        },
        {
            scenerio: "GCAM_SSP3",
            field: "test3",
            data: -50
        },
        {
            scenerio: "GCAM_SSP3",
            field: "test4",
            data: -35
        },
        {
            scenerio: "GCAM_SSP5",
            field: "elecByTechTWh",
            data: -50
        },
        {
            scenerio: "GCAM_SSP5",
            field: "pop",
            data: 20
        },
        {
            scenerio: "GCAM_SSP5",
            field: "test1",
            data: 50
        },
        {
            scenerio: "GCAM_SSP5",
            field: "test2",
            data: 90
        },
        {
            scenerio: "GCAM_SSP5",
            field: "test3",
            data: -25
        },
        {
            scenerio: "GCAM_SSP5",
            field: "test4",
            data: -40
        },
        {
            scenerio: "2.0 Degrees",
            field: "elecByTechTWh",
            data: -55
        },
        {
            scenerio: "2.0 Degrees",
            field: "pop",
            data: -30
        },
        {
            scenerio: "2.0 Degrees",
            field: "test1",
            data: 95
        },
        {
            scenerio: "2.0 Degrees",
            field: "test2",
            data: 90
        },
        {
            scenerio: "2.0 Degrees",
            field: "test3",
            data: -80
        },
        {
            scenerio: "2.0 Degrees",
            field: "test4",
            data: -70
        },
        {
            scenerio: "2.5 Degrees",
            field: "elecByTechTWh",
            data: -80
        },
        {
            scenerio: "2.5 Degrees",
            field: "pop",
            data: -70
        },
        {
            scenerio: "2.5 Degrees",
            field: "test1",
            data: 150
        },
        {
            scenerio: "2.5 Degrees",
            field: "test2",
            data: 200
        },
        {
            scenerio: "2.5 Degrees",
            field: "test3",
            data: -99
        },
        {
            scenerio: "2.5 Degrees",
            field: "test4",
            data: -80
        },
        {
            scenerio: "3.0 Degrees",
            field: "elecByTechTWh",
            data: -150
        },
        {
            scenerio: "3.0 Degrees",
            field: "pop",
            data: -200
        },
        {
            scenerio: "3.0 Degrees",
            field: "test1",
            data: 300
        },
        {
            scenerio: "3.0 Degrees",
            field: "test2",
            data: 500
        },
        {
            scenerio: "3.0 Degrees",
            field: "test3",
            data: -500
        },
        {
            scenerio: "3.0 Degrees",
            field: "test4",
            data: -150
        }
    ]

    const handlePress = (scenerioTitle) => {
        setValue(scenerioTitle);
        updateDate(2020);
        updateRegion("Global");
        updateSubcat("Aggregate of Subsectors");
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
                <>
                    <ScenerioGuageNegative
                        guageText={'' + title + cIndex}
                        guageValue={num}
                    />
                    <div className="guageText"> {getIcon(title)}  {title}</div>
                </>
            )
        }
        return (
            <>
                <ScenerioGuage
                    guageText={'' + title + cIndex}
                    guageValue={num}
                />
                <div className="guageText"> {getIcon(title)}  {title}</div>
            </>
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
                case cOpen.length - 1:
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
        updateDate: (date) => dispatch(setDashDate(date)),
        updateRegion: (reg) => dispatch(setDashReg(reg)),
        updateSubcat: (subcat) => dispatch(setDashSubs(subcat)),
        updateScenerios: (newIndex, newTitle, openScenerio) => dispatch(setScenerios(newIndex, newTitle, openScenerio))
    };
}

export default connect(null, mapDispatchToProps)(DashboardScenerioSelector);