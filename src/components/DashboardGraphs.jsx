import React, { useEffect, useState } from 'react';
import BarHorizontal from "./charts/BarHorizontal";
import ChoroplethImageSlider from './charts/ChoroplethImageSlider';
import getDashboardData from "./DashboardDummyData";
import { connect } from 'react-redux';
import { choroplethReduce, filterSubcat, getBarHorizontal } from '../assets/data/DataManager';

import Line from './charts/Line';
function DashboardGraphs({ openedScenerios, scenerioSpread, start, end, csvTest, selectedGuage }) {
    const csv = csvTest;
    const Scenerios = openedScenerios;
    const [startDate, setStartDate] = useState(start);
    const [endDate, setEndDate] = useState(end);
    useEffect(() => {
        setStartDate(start);
        setEndDate(end);
    }, [scenerioSpread, start, end]);
    const test = [{
        id: Scenerios.at(0).title,
        data: [
            {
                "x": 2015,
                "y": 10
            },
            {
                "x": 2020,
                "y": 10.7
            },
            {
                "x": 2025,
                "y": 9.3
            },
            {
                "x": 2030,
                "y": 11.2
            },
            {
                "x": 2035,
                "y": 9.6
            },
            {
                "x": 2040,
                "y": 10.6
            },
            {
                "x": 2045,
                "y": 12.2
            },
            {
                "x": 2050,
                "y": 10.8
            },
            {
                "x": 2055,
                "y": 9.4
            },
            {
                "x": 2060,
                "y": 12.25
            },
            {
                "x": 2065,
                "y": 12
            },
            {
                "x": 2070,
                "y": 11.1
            },
            {
                "x": 2075,
                "y": 10.5
            },
            {
                "x": 2080,
                "y": 8.8
            },
            {
                "x": 2085,
                "y": 12.7
            },
            {
                "x": 2090,
                "y": 8.9
            },
            {
                "x": 2095,
                "y": 14.3
            },
            {
                "x": 2100,
                "y": 13.15
            }
        ]
    },
    {
        id: Scenerios.at(1).title,
        data: [
            {
                "x": 2015,
                "y": 14.3
            },
            {
                "x": 2020,
                "y": 12
            },
            {
                "x": 2025,
                "y": 12.8
            },
            {
                "x": 2030,
                "y": 15.7
            },
            {
                "x": 2035,
                "y": 14.2
            },
            {
                "x": 2040,
                "y": 14
            },
            {
                "x": 2045,
                "y": 12.2
            },
            {
                "x": 2050,
                "y": 15.8
            },
            {
                "x": 2055,
                "y": 15.4
            },
            {
                "x": 2060,
                "y": 10.15
            },
            {
                "x": 2065,
                "y": 14
            },
            {
                "x": 2070,
                "y": 17.7
            },
            {
                "x": 2075,
                "y": 13.4
            },
            {
                "x": 2080,
                "y": 16.7
            },
            {
                "x": 2085,
                "y": 10.25
            },
            {
                "x": 2090,
                "y": 15
            },
            {
                "x": 2095,
                "y": 16.55
            },
            {
                "x": 2100,
                "y": 16
            }
        ]
    }];
    return (
        <>
            <div className="graph-grid">
                <div>Global Trends</div>
                <div>Spatial Composition</div>
                <div>Top 10 Countries -- By Subsector</div>
                {csv === 'i' ? (
                  "Loading Dataset..."
                ) : (
                <Line data={test} />
                )}
                {csv === 'i' ? (
                  "Loading Dataset..."
                ) : (
                <ChoroplethImageSlider
                    id={"Dashboard_Big"}
                    scenario_1={Scenerios.at(0).title}
                    scenario_2={Scenerios.at(1).title}
                    dataset={choroplethReduce(csv, "elecByTechTWh")}
                />
                )}
                {csv === 'i' ? (
                  "Loading Dataset..."
                ) : (
                <div className='bar-grid grid-border'>
                    <BarHorizontal data={getBarHorizontal(csv, "elecByTechTWh")} listKeys={filterSubcat(csv)} scenerio={Scenerios.at(0).title} />
                    <BarHorizontal data={getBarHorizontal(csv, "elecByTechTWh")} listKeys={filterSubcat(csv)} scenerio={Scenerios.at(1).title} />
                </div>
                )}
            </div>
            <div className="graph-grid-small">
                <div>Global Trends</div>
                {csv === 'i' ? (
                  "Loading Dataset..."
                ) : (
                <Line data={test} />
                )}
                <div>Spatial Composition</div>
                {csv === 'i' ? (
                  "Loading Dataset..."
                ) : (
                <ChoroplethImageSlider
                    id={"Dashboard_Small"}
                    scenario_1={Scenerios.at(0).title}
                    scenario_2={Scenerios.at(1).title}
                    dataset={choroplethReduce(csv, "elecByTechTWh")}
                />
                )}
                <div>Top 10 Countries -- By Subsector</div>
                {csv === 'i' ? (
                  "Loading Dataset..."
                ) : (
                <div className='bar-grid grid-border'>
                    <BarHorizontal data={getBarHorizontal(csv, "elecByTechTWh")} listKeys={filterSubcat(csv)} scenerio={Scenerios.at(0).title} />
                    <BarHorizontal data={getBarHorizontal(csv, "elecByTechTWh")} listKeys={filterSubcat(csv)} scenerio={Scenerios.at(1).title} />
                </div>
                )}
            </div>
        </>
    );
}

function mapStateToProps(state) {
    return {
        openedScenerios: state.scenerios,
        selectedGuage: state.dashboardSelection,
        scenerioSpread: { ...(state.scenerios) },
        start: state.startDate,
        end: state.endDate,
        csvTest: state.parsedData,
    };
}

export default connect(mapStateToProps)(DashboardGraphs);