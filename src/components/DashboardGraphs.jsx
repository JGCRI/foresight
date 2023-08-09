import React from 'react';
import Imageslider from "./charts/Imageslider";
import first_img from "../assets/img/rice_oli_2021247_lrg.jpg";
import second_img from "../assets/img/rice_oli_2022259_lrg.jpg";
import Bump from "./charts/Bump";
import BarHorizontal from "./charts/BarHorizontal";
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
            "id": "Serie 1",
            "data": [
                {
                    "x": 2000,
                    "y": 11
                },
                {
                    "x": 2001,
                    "y": 2
                },
                {
                    "x": 2002,
                    "y": 2
                },
                {
                    "x": 2003,
                    "y": 11
                },
                {
                    "x": 2004,
                    "y": 5
                }
            ]
        },
        {
            "id": "Serie 2",
            "data": [
                {
                    "x": 2000,
                    "y": 10
                },
                {
                    "x": 2001,
                    "y": 3
                },
                {
                    "x": 2002,
                    "y": 10
                },
                {
                    "x": 2003,
                    "y": 3
                },
                {
                    "x": 2004,
                    "y": 3
                }
            ]
        },
        {
            "id": "Serie 3",
            "data": [
                {
                    "x": 2000,
                    "y": 8
                },
                {
                    "x": 2001,
                    "y": 4
                },
                {
                    "x": 2002,
                    "y": 12
                },
                {
                    "x": 2003,
                    "y": 2
                },
                {
                    "x": 2004,
                    "y": 1
                }
            ]
        },
        {
            "id": "Serie 4",
            "data": [
                {
                    "x": 2000,
                    "y": 5
                },
                {
                    "x": 2001,
                    "y": 9
                },
                {
                    "x": 2002,
                    "y": 4
                },
                {
                    "x": 2003,
                    "y": 7
                },
                {
                    "x": 2004,
                    "y": 6
                }
            ]
        },
        {
            "id": "Serie 5",
            "data": [
                {
                    "x": 2000,
                    "y": 12
                },
                {
                    "x": 2001,
                    "y": 10
                },
                {
                    "x": 2002,
                    "y": 9
                },
                {
                    "x": 2003,
                    "y": 4
                },
                {
                    "x": 2004,
                    "y": 8
                }
            ]
        },
        {
            "id": "Serie 6",
            "data": [
                {
                    "x": 2000,
                    "y": 4
                },
                {
                    "x": 2001,
                    "y": 1
                },
                {
                    "x": 2002,
                    "y": 11
                },
                {
                    "x": 2003,
                    "y": 1
                },
                {
                    "x": 2004,
                    "y": 10
                }
            ]
        },
        {
            "id": "Serie 7",
            "data": [
                {
                    "x": 2000,
                    "y": 1
                },
                {
                    "x": 2001,
                    "y": 8
                },
                {
                    "x": 2002,
                    "y": 3
                },
                {
                    "x": 2003,
                    "y": 9
                },
                {
                    "x": 2004,
                    "y": 9
                }
            ]
        },
        {
            "id": "Serie 8",
            "data": [
                {
                    "x": 2000,
                    "y": 7
                },
                {
                    "x": 2001,
                    "y": 7
                },
                {
                    "x": 2002,
                    "y": 7
                },
                {
                    "x": 2003,
                    "y": 10
                },
                {
                    "x": 2004,
                    "y": 11
                }
            ]
        },
        {
            "id": "Serie 9",
            "data": [
                {
                    "x": 2000,
                    "y": 2
                },
                {
                    "x": 2001,
                    "y": 12
                },
                {
                    "x": 2002,
                    "y": 1
                },
                {
                    "x": 2003,
                    "y": 5
                },
                {
                    "x": 2004,
                    "y": 4
                }
            ]
        },
        {
            "id": "Serie 10",
            "data": [
                {
                    "x": 2000,
                    "y": 6
                },
                {
                    "x": 2001,
                    "y": 11
                },
                {
                    "x": 2002,
                    "y": 5
                },
                {
                    "x": 2003,
                    "y": 6
                },
                {
                    "x": 2004,
                    "y": 7
                }
            ]
        },
        {
            "id": "Serie 11",
            "data": [
                {
                    "x": 2000,
                    "y": 9
                },
                {
                    "x": 2001,
                    "y": 5
                },
                {
                    "x": 2002,
                    "y": 8
                },
                {
                    "x": 2003,
                    "y": 8
                },
                {
                    "x": 2004,
                    "y": 12
                }
            ]
        },
        {
            "id": "Serie 12",
            "data": [
                {
                    "x": 2000,
                    "y": 3
                },
                {
                    "x": 2001,
                    "y": 6
                },
                {
                    "x": 2002,
                    "y": 6
                },
                {
                    "x": 2003,
                    "y": 12
                },
                {
                    "x": 2004,
                    "y": 2
                }
            ]
        }
    ];

    return (
        <>
            <div className="graph-grid">
                <div>Global Trends</div>
                <div>Spatial Composition</div>
                <div>Top 10 Countries -- By Subsector</div>
                {!dataBump ? (
                    "Loading..."
                ) : (
                    <Bump data={dataBump} />
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
            <div className="graph-grid-small">
                <div>Global Trends</div>
                {!dataBump ? (
                    "Loading..."
                ) : (
                    <Bump data={dataBump} />
                )}
                <div>Spatial Composition</div>
                <Imageslider
                    firstImage={first_img}
                    secondImage={second_img}
                    href="https://earthobservatory.nasa.gov/images/150412/a-rough-year-for-rice-in-california"
                    linkText="NASA"
                />
                <div>Top 10 Countries -- By Subsector</div>
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