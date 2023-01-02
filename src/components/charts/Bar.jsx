import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const data = [
  {
    country: "AD",
    "param 1": 81,
    "param 1Color": "hsl(154, 70%, 50%)",
    "param 2": 193,
    "param 2Color": "hsl(304, 70%, 50%)",
    "param 3": 50,
    "param 3Color": "hsl(222, 70%, 50%)",
    "param 4": 154,
    "param 4Color": "hsl(241, 70%, 50%)",
    "param 5": 68,
    "param 5Color": "hsl(331, 70%, 50%)",
    "param 6": 49,
    "param 6Color": "hsl(259, 70%, 50%)"
  },
  {
    country: "AE",
    "param 1": 46,
    "param 1Color": "hsl(33, 70%, 50%)",
    "param 2": 96,
    "param 2Color": "hsl(70, 70%, 50%)",
    "param 3": 10,
    "param 3Color": "hsl(348, 70%, 50%)",
    "param 4": 18,
    "param 4Color": "hsl(191, 70%, 50%)",
    "param 5": 93,
    "param 5Color": "hsl(262, 70%, 50%)",
    "param 6": 54,
    "param 6Color": "hsl(118, 70%, 50%)"
  },
  {
    country: "AF",
    "param 1": 123,
    "param 1Color": "hsl(17, 70%, 50%)",
    "param 2": 24,
    "param 2Color": "hsl(122, 70%, 50%)",
    "param 3": 12,
    "param 3Color": "hsl(35, 70%, 50%)",
    "param 4": 141,
    "param 4Color": "hsl(102, 70%, 50%)",
    "param 5": 33,
    "param 5Color": "hsl(191, 70%, 50%)",
    "param 6": 8,
    "param 6Color": "hsl(183, 70%, 50%)"
  }
];
const MyChart = ({ data }) => (
    <ResponsiveBar
    data={data}
    keys={[
        'param 1',
        'param 2',
        'param 3',
        'param 4',
        'param 5',
        'param 6'
    ]}
    indexBy="country"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={{ scheme: 'nivo' }}
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
        }
    ]}
    fill={[
        {
            match: {
                id: 'param 5'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'param 3'
            },
            id: 'lines'
        }
    ]}
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
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 32
    }}
    axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'params',
        legendPosition: 'middle',
        legendOffset: -40
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                1.6
            ]
        ]
    }}
    legends={[
        {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemOpacity: 1
                    }
                }
            ]
        }
    ]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
/>
);

function Bar() {
  return (
    <div className="bar chart">
          <MyChart data={data} />
    </div>
  );
}

export default Bar;