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
            "country": "AD",
            "hot dog": 101,
            "hot dogColor": "hsl(41, 70%, 50%)",
            "burger": 196,
            "burgerColor": "hsl(284, 70%, 50%)",
            "sandwich": 82,
            "sandwichColor": "hsl(324, 70%, 50%)",
            "kebab": 95,
            "kebabColor": "hsl(150, 70%, 50%)",
            "fries": 116,
            "friesColor": "hsl(66, 70%, 50%)",
            "donut": 111,
            "donutColor": "hsl(209, 70%, 50%)"
        },
        {
            "country": "AE",
            "hot dog": 110,
            "hot dogColor": "hsl(133, 70%, 50%)",
            "burger": 140,
            "burgerColor": "hsl(343, 70%, 50%)",
            "sandwich": 80,
            "sandwichColor": "hsl(319, 70%, 50%)",
            "kebab": 138,
            "kebabColor": "hsl(140, 70%, 50%)",
            "fries": 40,
            "friesColor": "hsl(3, 70%, 50%)",
            "donut": 136,
            "donutColor": "hsl(232, 70%, 50%)"
        },
        {
            "country": "AF",
            "hot dog": 128,
            "hot dogColor": "hsl(188, 70%, 50%)",
            "burger": 136,
            "burgerColor": "hsl(107, 70%, 50%)",
            "sandwich": 105,
            "sandwichColor": "hsl(168, 70%, 50%)",
            "kebab": 25,
            "kebabColor": "hsl(242, 70%, 50%)",
            "fries": 42,
            "friesColor": "hsl(359, 70%, 50%)",
            "donut": 158,
            "donutColor": "hsl(283, 70%, 50%)"
        },
        {
            "country": "AG",
            "hot dog": 169,
            "hot dogColor": "hsl(188, 70%, 50%)",
            "burger": 8,
            "burgerColor": "hsl(129, 70%, 50%)",
            "sandwich": 123,
            "sandwichColor": "hsl(221, 70%, 50%)",
            "kebab": 12,
            "kebabColor": "hsl(244, 70%, 50%)",
            "fries": 14,
            "friesColor": "hsl(343, 70%, 50%)",
            "donut": 162,
            "donutColor": "hsl(46, 70%, 50%)"
        },
        {
            "country": "AI",
            "hot dog": 173,
            "hot dogColor": "hsl(145, 70%, 50%)",
            "burger": 119,
            "burgerColor": "hsl(51, 70%, 50%)",
            "sandwich": 145,
            "sandwichColor": "hsl(238, 70%, 50%)",
            "kebab": 25,
            "kebabColor": "hsl(280, 70%, 50%)",
            "fries": 146,
            "friesColor": "hsl(174, 70%, 50%)",
            "donut": 119,
            "donutColor": "hsl(212, 70%, 50%)"
        },
        {
            "country": "AL",
            "hot dog": 152,
            "hot dogColor": "hsl(91, 70%, 50%)",
            "burger": 76,
            "burgerColor": "hsl(208, 70%, 50%)",
            "sandwich": 175,
            "sandwichColor": "hsl(164, 70%, 50%)",
            "kebab": 98,
            "kebabColor": "hsl(297, 70%, 50%)",
            "fries": 101,
            "friesColor": "hsl(359, 70%, 50%)",
            "donut": 88,
            "donutColor": "hsl(127, 70%, 50%)"
        },
        {
            "country": "AM",
            "hot dog": 86,
            "hot dogColor": "hsl(53, 70%, 50%)",
            "burger": 123,
            "burgerColor": "hsl(235, 70%, 50%)",
            "sandwich": 153,
            "sandwichColor": "hsl(146, 70%, 50%)",
            "kebab": 153,
            "kebabColor": "hsl(303, 70%, 50%)",
            "fries": 13,
            "friesColor": "hsl(13, 70%, 50%)",
            "donut": 74,
            "donutColor": "hsl(179, 70%, 50%)"
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
                <BarHorizontal data={dataBar} />
            )}
        </div>
    </>
);
}

export default DashboardGraphs;