import React from "react";
import { ResponsiveLine } from '@nivo/line'
import { updateHash } from "../sharing/DashboardUrl";
import { MdOutlineWarning } from "react-icons/md";

const Line = ({ data, setDate, unit }) => (
    <div className="line_container">
        <div className="nivo-wrapper grid-border">
            <ResponsiveLine
                data={data}
                margin={{ top: 20, right: 15, bottom: 25, left: 80 }}
                xScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: false,
                    reverse: false
                }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: false,
                    reverse: false
                }}
                onClick={(data) => {
                    setDate(
                        parseInt(`${data["data"]["x"]}`)
                    );
                    updateHash("year", parseInt(`${data["data"]["x"]}`));
                }}
                tooltip={e => {
                    return (
                        <div
                            style={(e.point.index % data[0].data.length < data[0].data.length / 2) ? {
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
                                        background: e.point.serieColor,
                                        marginRight: "7px"
                                    }} />
                                    <span>
                                        {e.point.data.xFormatted}:{" "}
                                        <strong>{e.point.data.yFormatted}</strong>
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                }}
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
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    tickValues: 5,
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    format: (v) => {
                        return v.toString().length > 6 ? (
                            v.toString().substring(0, 1) + "." + v.toString().substring(1, 2) + "x10^" + (Math.round(v).toString().length - 1)
                        ) : (
                            v
                        );
                    },
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: unit,
                    legendOffset: -70,
                    legendPosition: 'middle'
                }}
                colors={["#E69F00", "#56B4E9"]}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}

                stacked={false}
                legends={[
                    {
                        anchor: 'top',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: -25,
                        itemWidth: 100,
                        itemHeight: 28,
                        itemsSpacing: 0,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        itemDirection: 'left-to-right',
                        itemTextColor: '#DADADA',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div >
        {
            (data[0].data.length === 0) ? (
                <div className="line-graph-no-data">
                    <div><MdOutlineWarning /> No Data <MdOutlineWarning /></div>
                    <div>Please pick another region.</div>
                </div>
            ) : (
                <div />
            )
        }
    </div >
)



export default Line;