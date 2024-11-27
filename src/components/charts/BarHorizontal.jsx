import React, { useEffect, useState } from "react";
import { ResponsiveBar } from '@nivo/bar'
import { connect } from 'react-redux';
import { getBarHorizontal } from "../data/DataManager.jsx";
import { updateHash } from "../sharing/DashboardUrl.jsx";

/**
 * Unused test Nivo TreeMap component.
 * 
 * @param {object} props - The component props.
 * @param {object[]} props.csv - Dataset to generate the BarHorizontal.
 * @param {string[]} props.color - List of colors in hex.
 * @param {string[]} props.listKeys - List of all possible subcategories.
 * @param {string} props.scenerio - Current scenario.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setdashboardSub - Updates the selected subsector.
 * @param {boolean} props.left - Boolean value of whether the bar should be displayed on the left.
 * @param {string[]} props.countries - List of currently selected countries.
 * @param {string} props.subcat - Stored subcategory value.
 * @param {string} props.selectedGuage - Currently selected data variable.
 * @returns {ReactElement} The rendered component.
 */
const MyResponsiveBar = ({ csv, color, listKeys, scenerio, setdashboardSub, left, countries, subcat, selectedGuage, maxVal }) => {
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
    //console.log(selectedGuage, subcat);
    return (
        <div className="bar-wrapper">
            <div className="double-bar-text-wrapper">  {scenerioName} </div>
            <ResponsiveBar
                data={barData}
                keys={listKeys}
                indexBy="country"
                margin={{ top: 0, right: 15, bottom: 42, left: 70 }}
                layout="horizontal"
                valueScale={{ type: 'linear', max: maxVal }}
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
                    format: (v) => {
                        return v.toString().length > 5 ? (
                            v.toString().substring(0, 1) + "." + v.toString().substring(1, 3) + "e" + (Math.round(v).toString().length - 1)
                        ) : (
                            v
                        );
                    },
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    tickValues: 2,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                onClick={(data) => {
                    if (data.id !== 'class1') {
                        setdashboardSub(
                            `${data["id"]}`
                        );
                        updateHash("sub", `${data["id"]}`);
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
                                        <strong>{e.label.replace('class1', selectedGuage).split('-')[1].substring(1)}</strong>
                                    </span>
                                </div>
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
                                        {e.label.replace('class1', selectedGuage).split('-')[0]}:{" "}
                                        <strong>{e.value.toFixed(2)}</strong>
                                        {(subcat !== 'Aggregate of Subsectors') ? " (Current)" : ""}
                                    </span>
                                </div>
                                {(subcat !== "Aggregate of Subsectors" && subcat !== e.label.split(" ")[0]) ?
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
                                            {(e.data[subcat] !== undefined) ? (subcat === 'class1' || subcat === 'Aggregate of Subsectors' ? selectedGuage + ": " : subcat + ": ") : "No data for selection: " + subcat}
                                            <strong>{(e.data[subcat] !== undefined) ? e.data[subcat].toFixed(2) : <div></div>}</strong>
                                            {(e.data[subcat] !== undefined && subcat !== 'Aggregate of Subsectors') ? " (Selected)" : ""}
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
    };
}

export default connect(mapStateToProps)(MyResponsiveBar);