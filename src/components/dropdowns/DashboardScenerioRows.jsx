import React, { useState } from 'react';
import { connect } from 'react-redux';
import DashboardScenerioSelector from "./DashboardScenerioSelector";
import ScenerioGuage from "../guages/ScenerioGuage"
import ScenerioGuageNegative from "../guages/ScenerioGuageNegative"

function DashboardScenerioRows({ Scenarios, openScenerio, guageList, openGuage }) {

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
    const list = Scenarios;

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

    const col = (rowIndex, scenerioTitle) => {
        const row = rowIndex;
        const scenerio = scenerioTitle;
        return (
            guageList.map((guage, index) => (
                <div className={guage.title === openGuage ? "guageOpen" : "guageDefault"} key={index}>
                    <div id={guage.title}></div>
                    {guageNumber(getDataValue(scenerio, guage.title), row, guage.title)}
                </div>
            ))
        )
    }
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

    return (
        <div className="dashboard-data-grid">
            {rows}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        openScenerio: state.scenerios,
        guageList: state.guages,
        openGuage: state.currentGuage,
    };
}

export default connect(mapStateToProps)(DashboardScenerioRows);