import React from 'react';
import Imageslider from "./charts/Imageslider";
import first_img from "../assets/img/rice_oli_2021247_lrg.jpg";
import second_img from "../assets/img/rice_oli_2022259_lrg.jpg";
import Bump from "./charts/Bump";
import BarHorizontal from "./charts/BarHorizontal";
import Choropleth from './charts/Choropleth';
import ChoroplethImageSlider from './charts/ChoroplethImageSlider';

import DashboardChoropleth from './charts/DashboardChoropleth';
import getDashboardData from "./DashboardDummyData";

import Line from './charts/Line';
function DashboardGraphs() {

    const dataBar = [
        {
            "country": "USA",
            "Category 1": 101,
            "Category 1 Color": "hsl(41, 70%, 50%)",
            "Category 2": 196,
            "Category 2 Color": "hsl(284, 70%, 50%)",
            "Category 3": 82,
            "Category 3 Color": "hsl(324, 70%, 50%)",
            "Category 4": 95,
            "Category 4 Color": "hsl(150, 70%, 50%)"
        },
        {
            "country": "Russia",
            "Category 1": 110,
            "Category 1 Color": "hsl(133, 70%, 50%)",
            "Category 2": 140,
            "Category 2 Color": "hsl(343, 70%, 50%)",
            "Category 3": 80,
            "Category 3 Color": "hsl(319, 70%, 50%)",
            "Category 4": 138,
            "Category 4 Color": "hsl(140, 70%, 50%)"
        },
        {
            "country": "Mexico",
            "Category 1": 128,
            "Category 1 Color": "hsl(188, 70%, 50%)",
            "Category 2": 136,
            "Category 2 Color": "hsl(107, 70%, 50%)",
            "Category 3": 105,
            "Category 3 Color": "hsl(168, 70%, 50%)",
            "Category 4": 25,
            "Category 4 Color": "hsl(242, 70%, 50%)"
        },
        {
            "country": "Japan",
            "Category 1": 169,
            "Category 1 Color": "hsl(188, 70%, 50%)",
            "Category 2": 8,
            "Category 2 Color": "hsl(129, 70%, 50%)",
            "Category 3": 123,
            "Category 3 Color": "hsl(221, 70%, 50%)",
            "Category 4": 12,
            "Category 4 Color": "hsl(244, 70%, 50%)"
        },
        {
            "country": "India",
            "Category 1": 173,
            "Category 1 Color": "hsl(145, 70%, 50%)",
            "Category 2": 119,
            "Category 2 Color": "hsl(51, 70%, 50%)",
            "Category 3": 145,
            "Category 3 Color": "hsl(238, 70%, 50%)",
            "Category 4": 25,
            "Category 4 Color": "hsl(280, 70%, 50%)"
        },
        {
            "country": "France",
            "Category 1": 152,
            "Category 1 Color": "hsl(91, 70%, 50%)",
            "Category 2": 76,
            "Category 2 Color": "hsl(208, 70%, 50%)",
            "Category 3": 175,
            "Category 3 Color": "hsl(164, 70%, 50%)",
            "Category 4": 98,
            "Category 4 Color": "hsl(297, 70%, 50%)"
        },
        {
            "country": "China",
            "Category 1": 86,
            "Category 1 Color": "hsl(53, 70%, 50%)",
            "Category 2": 123,
            "Category 2 Color": "hsl(235, 70%, 50%)",
            "Category 3": 153,
            "Category 3 Color": "hsl(146, 70%, 50%)",
            "Category 4": 153,
            "Category 4 Color": "hsl(303, 70%, 50%)"
        }
    ]

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
            {!dataBump ? (
                "Loading..."
            ) : (
                <Line data={test} />
            )}
            <Imageslider
                firstImage={first_img}
                secondImage={second_img}
                href="https://earthobservatory.nasa.gov/images/150412/a-rough-year-for-rice-in-california"
                linkText="NASA"
            />
            {!dataBar ? (
                "Loading..."
            ) : (
                <div className='bar-grid'>
                    <BarHorizontal data={dataBar} scenerioName={'Scenerio 1'}/>
                    <BarHorizontal data={dataBar} scenerioName={'Scenerio 2'}/>
                </div>
            )}
        </div>
    </>
);
}

export default DashboardGraphs;