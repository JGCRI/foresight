import React from "react";
import { ResponsiveChord } from '@nivo/chord'

const data = [
    [
      1936,
      267,
      242,
      468,
      965
    ],
    [
      288,
      107,
      220,
      113,
      458
    ],
    [
      131,
      1933,
      515,
      602,
      271
    ],
    [
      163,
      1562,
      195,
      416,
      31
    ],
    [
      417,
      130,
      400,
      191,
      137
    ]
  ];


  const theme = {
    axis: {
        legend: {
          text: {
            fontSize: 12, // Specify the font size for axis labels
          },
        },
      },
    labels: {
        text: {
            fontSize: 16, // Specify the font size for chord labels
          },
    },
    legends: {
      text: {
        fontSize: 12, // Specify the font size for legends
      },
    },
  };
  

  const MyChart = ({ data, width=320, height=320 }) => (
    <div style={{ minWidth: '320px', minHeight: '100%', width, height }}>
      <ResponsiveChord
        data={data}
        keys={['Canada', 'India', 'USA', 'EU', 'Brazil']}
        margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
        valueFormat=".2f"
        padAngle={0.02}
        innerRadiusRatio={0.96}
        innerRadiusOffset={0.02}
        inactiveArcOpacity={0.25}
        arcBorderColor={{
          from: 'color',
          modifiers: [['darker', 0.6]]
        }}
        activeRibbonOpacity={0.75}
        inactiveRibbonOpacity={0.1}
        ribbonBorderColor={{
          from: 'color',
          modifiers: [['darker', 0.6]]
        }}
        labelRotation={0}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1]]
        }}
        colors={{ scheme: 'nivo' }}
        motionConfig="stiff"
        theme={theme}
      />
    </div>
  );
  
  function Chord({ width, height }) {
    return (
      <div className="chart-container">
        <MyChart data={data} width={width} height={height} />
      </div>
    );
  }
  
  export default Chord;