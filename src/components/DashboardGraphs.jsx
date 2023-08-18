import React from 'react';
import BarHorizontal from "./charts/BarHorizontal";
import ChoroplethImageSlider from './charts/ChoroplethImageSlider';
import getDashboardData from "./DashboardDummyData";
import { connect } from 'react-redux';

import Line from './charts/Line';
function DashboardGraphs({ openedScenerios }) {
    const Scenerios = openedScenerios;

    const dataBump = [
        {
            "id": "Scenerio X",
            "data": [
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
            "id": "Scenerio Y",
            "data": [
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
        },
        {
            "id": "1.5 Degrees",
            "data": [
                {
                    "x": 2015,
                    "y": 14.4
                },
                {
                    "x": 2020,
                    "y": 15.7
                },
                {
                    "x": 2025,
                    "y": 14.0
                },
                {
                    "x": 2030,
                    "y": 12.0
                },
                {
                    "x": 2035,
                    "y": 9.5
                },
                {
                    "x": 2040,
                    "y": 14.7
                },
                {
                    "x": 2045,
                    "y": 8.2
                },
                {
                    "x": 2050,
                    "y": 9.8
                },
                {
                    "x": 2055,
                    "y": 12.4
                },
                {
                    "x": 2060,
                    "y": 8.7
                },
                {
                    "x": 2065,
                    "y": 17.5
                },
                {
                    "x": 2070,
                    "y": 12.6
                },
                {
                    "x": 2075,
                    "y": 11.1
                },
                {
                    "x": 2080,
                    "y": 17.6
                },
                {
                    "x": 2085,
                    "y": 18.0
                },
                {
                    "x": 2090,
                    "y": 16.7
                },
                {
                    "x": 2095,
                    "y": 11.3
                },
                {
                    "x": 2100,
                    "y": 10.2
                }
            ]
        },
        {
            "id": "2.0 Degrees",
            "data": [
                {
                    "x": 2015,
                    "y": 16.7
                },
                {
                    "x": 2020,
                    "y": 16.6
                },
                {
                    "x": 2025,
                    "y": 11.8
                },
                {
                    "x": 2030,
                    "y": 12.8
                },
                {
                    "x": 2035,
                    "y": 15.5
                },
                {
                    "x": 2040,
                    "y": 13.7
                },
                {
                    "x": 2045,
                    "y": 8.6
                },
                {
                    "x": 2050,
                    "y": 12.9
                },
                {
                    "x": 2055,
                    "y": 11.9
                },
                {
                    "x": 2060,
                    "y": 12.1
                },
                {
                    "x": 2065,
                    "y": 16.3
                },
                {
                    "x": 2070,
                    "y": 16.5
                },
                {
                    "x": 2075,
                    "y": 17.7
                },
                {
                    "x": 2080,
                    "y": 15.8
                },
                {
                    "x": 2085,
                    "y": 10.4
                },
                {
                    "x": 2090,
                    "y": 12.5
                },
                {
                    "x": 2095,
                    "y": 11.5
                },
                {
                    "x": 2100,
                    "y": 10.1
                }
            ]
        },
        {
            "id": "2.5 Degrees",
            "data": [
                {
                    "x": 2015,
                    "y": 12.4
                },
                {
                    "x": 2020,
                    "y": 10.9
                },
                {
                    "x": 2025,
                    "y": 15.3
                },
                {
                    "x": 2030,
                    "y": 9.2
                },
                {
                    "x": 2035,
                    "y": 16.4
                },
                {
                    "x": 2040,
                    "y": 13.5
                },
                {
                    "x": 2045,
                    "y": 8.9
                },
                {
                    "x": 2050,
                    "y": 10.2
                },
                {
                    "x": 2055,
                    "y": 9.1
                },
                {
                    "x": 2060,
                    "y": 13.1
                },
                {
                    "x": 2065,
                    "y": 16.4
                },
                {
                    "x": 2070,
                    "y": 12.1
                },
                {
                    "x": 2075,
                    "y": 16.2
                },
                {
                    "x": 2080,
                    "y": 14.6
                },
                {
                    "x": 2085,
                    "y": 13.7
                },
                {
                    "x": 2090,
                    "y": 16.5
                },
                {
                    "x": 2095,
                    "y": 14.4
                },
                {
                    "x": 2100,
                    "y": 16.6
                }
            ]
        },
        {
            "id": "3.0 Degrees",
            "data": [
                {
                    "x": 2015,
                    "y": 12.0
                },
                {
                    "x": 2020,
                    "y": 8.5
                },
                {
                    "x": 2025,
                    "y": 12.3
                },
                {
                    "x": 2030,
                    "y": 13.2
                },
                {
                    "x": 2035,
                    "y": 14.2
                },
                {
                    "x": 2040,
                    "y": 10.3
                },
                {
                    "x": 2045,
                    "y": 14.1
                },
                {
                    "x": 2050,
                    "y": 10.9
                },
                {
                    "x": 2055,
                    "y": 13.0
                },
                {
                    "x": 2060,
                    "y": 15.5
                },
                {
                    "x": 2065,
                    "y": 12.3
                },
                {
                    "x": 2070,
                    "y": 9.8
                },
                {
                    "x": 2075,
                    "y": 15.8
                },
                {
                    "x": 2080,
                    "y": 16.5
                },
                {
                    "x": 2085,
                    "y": 10.1
                },
                {
                    "x": 2090,
                    "y": 17.7
                },
                {
                    "x": 2095,
                    "y": 17.4
                },
                {
                    "x": 2100,
                    "y": 11.7
                }
            ]
        }
    ];

    const test = [{
        id: "Scenerio X",
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
        id: "Scenerio Y",
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
                <Line data={test} />
                <ChoroplethImageSlider />
                <div className='bar-grid grid-border'>
                    <BarHorizontal data={getDashboardData(Scenerios.at(0).title, "top10Country")} scenerio={Scenerios.at(0).title} />
                    <BarHorizontal data={getDashboardData(Scenerios.at(1).title, "top10Country")} scenerio={Scenerios.at(1).title} />
                </div>
            </div>
            <div className="graph-grid-small">
                <div>Global Trends</div>
                <Line data={test} />
                <div>Spatial Composition</div>
                <ChoroplethImageSlider />
                <div>Top 10 Countries -- By Subsector</div>
                <div className='bar-grid grid-border'>
                    <BarHorizontal data={getDashboardData(Scenerios.at(0).title, "top10Country")} scenerio={Scenerios.at(0).title} />
                    <BarHorizontal data={getDashboardData(Scenerios.at(1).title, "top10Country")} scenerio={Scenerios.at(1).title} />
                </div>
            </div>
        </>
    );
}

function mapStateToProps(state) {
    console.log(state.startDate);
    return {
        openedScenerios: state.scenerios,
    };
}

export default connect(mapStateToProps)(DashboardGraphs);