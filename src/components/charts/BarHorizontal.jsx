import React, { useEffect, useState } from "react";
import { ResponsiveBar } from '@nivo/bar'
import { connect } from 'react-redux';
import { setDashSubs } from "../Store";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBar = ({ listKeys, data, scenerio, setdashboardSub }) => {
    const [scenerioName, setScenerio] = useState(scenerio);
    useEffect(() => {
        setScenerio(scenerio);
    }, [scenerio])
    return (
        <div className="nivo-wrapper">
            <div className="double-bar-text-wrapper">  {scenerioName} </div>
            <ResponsiveBar
                data={data}
                keys={listKeys}
                indexBy="country"
                margin={{ top: 0, right: 15, bottom: 42, left: 60 }}
                layout="horizontal"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'spectral' }}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    tickValues: 3,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                onClick={(data) => {
                    setdashboardSub(
                        `${data["id"]}`
                    );
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                enableLabel={false}
                legends={[]}
                role="application"
                theme={{
                    "text": {
                        "fontSize": 11,
                        "fill": "#333333",
                        "outlineWidth": 0,
                        "outlineColor": "transparent"
                    },
                    "axis": {
                        "domain": {
                            "line": {
                                "stroke": "#DADADA",
                                "strokeWidth": 1
                            }
                        },
                        "legend": {
                            "text": {
                                "fontSize": 12,
                                "fill": "#DADADA",
                                "outlineWidth": 0,
                                "outlineColor": "transparent"
                            }
                        },
                        "ticks": {
                            "line": {
                                "stroke": "#DADADA",
                                "strokeWidth": 1
                            },
                            "text": {
                                "fontSize": 11,
                                "fill": "#DADADA",
                                "outlineWidth": 0,
                                "outlineColor": "transparent"
                            }
                        }
                    },
                    "grid": {
                        "line": {
                            "stroke": "#DADADA",
                            "strokeWidth": 1
                        }
                    },
                    "legends": {
                        "title": {
                            "text": {
                                "fontSize": 11,
                                "fill": "#333333",
                                "outlineWidth": 0,
                                "outlineColor": "transparent"
                            }
                        },
                        "text": {
                            "fontSize": 11,
                            "fill": "#333333",
                            "outlineWidth": 0,
                            "outlineColor": "transparent"
                        },
                        "ticks": {
                            "line": {},
                            "text": {
                                "fontSize": 10,
                                "fill": "#333333",
                                "outlineWidth": 0,
                                "outlineColor": "transparent"
                            }
                        }
                    },
                    "annotations": {
                        "text": {
                            "fontSize": 13,
                            "fill": "#333333",
                            "outlineWidth": 2,
                            "outlineColor": "#DADADA",
                            "outlineOpacity": 1
                        },
                        "link": {
                            "stroke": "#000000",
                            "strokeWidth": 1,
                            "outlineWidth": 2,
                            "outlineColor": "#DADADA",
                            "outlineOpacity": 1
                        },
                        "outline": {
                            "stroke": "#000000",
                            "strokeWidth": 2,
                            "outlineWidth": 2,
                            "outlineColor": "#DADADA",
                            "outlineOpacity": 1
                        },
                        "symbol": {
                            "fill": "#000000",
                            "outlineWidth": 2,
                            "outlineColor": "#DADADA",
                            "outlineOpacity": 1
                        }
                    },
                    "tooltip": {
                        "container": {
                            "background": "#DADADA",
                            "fontSize": 12
                        },
                        "basic": {},
                        "chip": {},
                        "table": {},
                        "tableCell": {},
                        "tableCellValue": {}
                    }
                }}
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
            />
        </div>
    );
}

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        setdashboardSub: (subs) => dispatch(setDashSubs(subs)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyResponsiveBar);