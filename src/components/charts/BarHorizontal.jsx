import React, { useEffect, useState } from "react";
import { ResponsiveBar } from '@nivo/bar'
import { connect } from 'react-redux';
import { getBarHorizontal, getBasinAggregate } from "../../assets/data/DataManager";
import { updateHash } from "../sharing/DashboardUrl.jsx";
import { setBasinAggregation } from "../Store.jsx";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MyResponsiveBar = ({ csv, color, listKeys, scenerio, setdashboardSub, left, countries, subcat, basinAggregation }) => {
    //console.log("!!!!", listKeys); 
    const [scenerioName, setScenerio] = useState(scenerio);
    const [barData, setData] = useState(getBarHorizontal(countries, csv, scenerio));
    useEffect(() => {
        setScenerio(scenerio);
        //console.log("Scenario:", scenerio);
    }, [scenerio])
    useEffect(() => {
        setData(getBarHorizontal(countries, csv, scenerio));
        //console.log("BAR DATA:", barData);
    }, [countries, csv, scenerio])
    //console.log(csv, getBasinAggregate(csv, basinAggregation));
    return (
        <div className="bar-wrapper">
            <div className="double-bar-text-wrapper">  {scenerioName} </div>
            <ResponsiveBar
                data={barData}
                keys={listKeys}
                indexBy="country"
                margin={{ top: 0, right: 15, bottom: 42, left: 70 }}
                layout="horizontal"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={color.length === 0 ? { scheme: 'spectral' } : color}
                //colorBy="key"
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
                    tickValues: 2,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                onClick={(data) => {
                    if (data["id"] !== "class1") {
                        setdashboardSub(
                            `${data["id"]}`
                        );
                        updateHash("class", `${data["id"]}`)
                    }
                }}
                axisLeft={{
                    format: (v) => {
                        return v.length > 10 ? (
                            v.substring(0, 7) + "..."
                        ) : (
                            v
                        );
                    },
                    tickSize: 4,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                enableLabel={false}
                legends={[]}
                markers={[
                    {
                        axis: 'x',
                        value: 0,
                        lineStyle: {
                            stroke: 'white',
                        },
                    },
                ]}
                the value determine
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
                tooltip={e => {
                    return (
                        <div
                            style={(left) ? {
                                pointerEvents: "none",
                                position: "absolute",
                                zIndex: "9999",
                                top: "0px",
                                left: "0px"
                            } : {
                                pointerEvents: "none",
                                position: "absolute",
                                zIndex: "9999",
                                top: "0px",
                                right: "0px"
                            }}
                        >
                            <div
                                style={{
                                    background: "rgb(218, 218, 218)",
                                    color: "inherit",
                                    fontSize: "12px",
                                    borderRadius: "2px",
                                    boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 2px",
                                    padding: "5px 9px"
                                }}
                            >
                                <div
                                    style={{
                                        whiteSpace: "pre",
                                        display: "flex",
                                        alignItems: "center"
                                    }}
                                >
                                    <span style={{
                                        display: "block",
                                        width: "12px",
                                        height: "12px",
                                        background: e.color,
                                        marginRight: "7px"
                                    }} />
                                    <span>
                                        {e.label}:{" "}
                                        <strong>{e.value.toFixed(2)}</strong>
                                    </span>
                                </div>
                                {(subcat !== "Aggregate of Subsectors") ?
                                    <div
                                        style={{
                                            whiteSpace: "pre",
                                            display: "flex",
                                            alignItems: "center"
                                        }}
                                    >
                                        <span style={{
                                            display: "block",
                                            width: "12px",
                                            height: "12px",
                                            marginRight: "7px"
                                        }} />
                                        <span>
                                            {(e.data[subcat] !== undefined) ? subcat + ": " + e.data[subcat].toFixed(2) : "No data for " + subcat}
                                        </span>
                                    </div> : <></>
                                }

                            </div>
                        </div>
                    );
                }}
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
            />
        </div>

    );
}

function mapStateToProps(state) {
    return {
        subcat: state.dashboardSubsector,
        countries: state.barCountries,
        basinAggregation: state.basinAggregation,
    };
}

export default connect(mapStateToProps)(MyResponsiveBar);