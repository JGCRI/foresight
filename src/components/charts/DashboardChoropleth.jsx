import React from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import countries from "./world_countries.json";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const DashboardChoropleth = ({ data }) => (
    <div className="nivo-wrapper">
        <ResponsiveChoropleth
            data={data}
            features={countries.features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            colors="YlGn"
            domain={[0, 1000000]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={60}
            projectionTranslation={[0.5, 0.5]}
            projectionRotation={[0, 0, 0]}
            borderWidth={0.5}
            borderColor="#152538"
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                },
                {
                    id: 'gradient',
                    type: 'linearGradient',
                    colors: [
                        {
                            offset: 0,
                            color: '#000'
                        },
                        {
                            offset: 100,
                            color: 'inherit'
                        }
                    ]
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'CAN'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'CHN'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'ATA'
                    },
                    id: 'gradient'
                }
            ]}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: true,
                    translateX: 20,
                    translateY: -100,
                    itemsSpacing: 0,
                    itemWidth: 94,
                    itemHeight: 18,
                    itemDirection: 'left-to-right',
                    itemTextColor: '#444444',
                    itemOpacity: 0.85,
                    symbolSize: 18,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000000',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    </div>
)

export default DashboardChoropleth;