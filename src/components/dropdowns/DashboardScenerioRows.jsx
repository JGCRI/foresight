import React, { useState } from 'react';
import { connect } from 'react-redux';
import DashboardScenerioSelector from "./DashboardScenerioSelector";
import ScenerioGuage from "../guages/ScenerioGuage"
import ScenerioGuageNegative from "../guages/ScenerioGuageNegative"

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

//This function gets data from a current dummy set. It searches the dummy
//set for a parameter matching the passed in scenerio and guage title.
//If the vlaue is found it is returned. Otherwise the function returns -1.
const getDataValue = (scenerioTitle, fieldTitle) => {
    const scenerio = scenerioTitle;
    const field = fieldTitle;
    var ans = -1;
    for (var i = 0; i < dummyData.length; ++i) {
        var element = dummyData[i];
        if (element.scenerio === scenerio && element.field === field) {
            ans = element.data;
            break;
        }
    }
    return ans;
}

//This function creates guages. Positive guages are created with ScenerioGuage and
//negative values are created with ScenerioGuageNegative. Each guage asks for three
//values, the guage if which is [GUAGE_TITLE][ROW_NUMBER] with no spaces, the text
//to display below the guage which is given by the guage title, and the value of the
//guage, given by the number, num.
const guageNumber = (number, rowNum, guageTitle) => {
    const num = number;
    const row = rowNum;
    const title = guageTitle;
    if (number < 0) {
        return (
            <ScenerioGuageNegative
                guageText={'' + title + row}
                bottomText={title}
                guageValue={num}
            />
        )
    }
    return (
        <ScenerioGuage
            guageText={'' + title + row}
            bottomText={title}
            guageValue={num}
        />
    )
}

function DashboardScenerioRows({ Scenarios, openScenerio, guageList, openGuage }) {

    const list = Scenarios;

    //Puts together the columns of the dashboard-grid. Triggers once per row to place the guages.
    //Takes in the current row number and title of the scenerio as parameters. Then each individual
    //guage is added using a map along the list of guages. The current selected guage is given the
    //CSS class name of guageOpen. All other guages will be styled as guageDefault. The guage is
    //created with two nested functions. The function guageNumber decides which guage to use depending
    //on if the number passed in is negative and takes in the number, row, and title of the guage for
    //guage creation. The getDataValue function retrieves the number from the current dataset.
    const col = (rowIndex, scenerioTitle) => {
        const row = rowIndex;
        const scenerio = scenerioTitle;
        return (
            guageList.map((guage, index) => (
                <div className={guage.title === openGuage ? "guageOpen" : "guageDefault"} key={index}>
                    {guageNumber(getDataValue(scenerio, guage.title), row, guage.title)}
                </div>
            ))
        )
    }

    //Puts together the rows of the dashboard grid. Uses a map to go through every scenerio
    //and generates a row for each. A dashboard row begins with a DashboardScenerioSelector
    //object and then preceds with the list of user selected guages provided by the col
    //function.
    const rows = openScenerio.map((open, index) => (
        <>
            <div className="dashboard-scenerio-selector" key={index}>
                <DashboardScenerioSelector
                    test={list}
                    current={open.title}
                    curIndex={index}
                    curOpen={openScenerio}
                    className="dashboard-scenerio-selector"
                />
            </div>
            {col(index, open.title)}
        </>

    ))

    //Returns the completed dashboard grid.
    return (
        <div id="dash-grid" className="dashboard-data-grid">
            {rows}
        </div>
    );

    function updateGrid() {
        let grid = document.querySelector("dash-grid");
        grid.innerHTML = rows;
    }
}

//Gets open scenerios, open guages, and the current selected guage from storage.
function mapStateToProps(state) {
    return {
        openScenerio: state.scenerios,
        guageList: state.guages,
        openGuage: state.currentGuage,
    };
}

export default connect(mapStateToProps)(DashboardScenerioRows);