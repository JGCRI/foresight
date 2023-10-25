import React from "react";
import { ResponsiveSankey } from "@nivo/sankey";

const data = {
  nodes: [
    { id: "Brazil" },
    { id: "Portugal" },
    { id: "France" },
    { id: "Spain" },
    { id: "England" },
    { id: "Canada" },
    { id: "Mexico" },
    { id: "USA" },
    { id: "Angola" },
    { id: "Senegal" },
    { id: "Morocco" },
    { id: "South Africa" },
    { id: "China" },
    { id: "India" },
    { id: "Japan" },
    { id: "Mali" }
  ],
  links: [
    { source: "Brazil", target: "Portugal", value: 5 },
    { source: "Brazil", target: "France", value: 1 },
    { source: "Brazil", target: "Spain", value: 1 },
    { source: "Brazil", target: "England", value: 1 },
    { source: "Canada", target: "Portugal", value: 1 },
    { source: "Canada", target: "France", value: 5 },
    { source: "Canada", target: "England", value: 1 },
    { source: "Mexico", target: "Portugal", value: 1 },
    { source: "Mexico", target: "France", value: 1 },
    { source: "Mexico", target: "Spain", value: 5 },
    { source: "Mexico", target: "England", value: 1 },
    { source: "USA", target: "Portugal", value: 1 },
    { source: "USA", target: "France", value: 1 },
    { source: "USA", target: "Spain", value: 1 },
    { source: "USA", target: "England", value: 5 },
    { source: "Portugal", target: "Angola", value: 2 },
    { source: "Portugal", target: "Senegal", value: 1 },
    { source: "Portugal", target: "Morocco", value: 1 },
    { source: "Portugal", target: "South Africa", value: 3 },
    { source: "France", target: "Angola", value: 1 },
    { source: "France", target: "Senegal", value: 3 },
    { source: "France", target: "Mali", value: 3 },
    { source: "France", target: "Morocco", value: 3 },
    { source: "France", target: "South Africa", value: 1 },
    { source: "Spain", target: "Senegal", value: 1 },
    { source: "Spain", target: "Morocco", value: 3 },
    { source: "Spain", target: "South Africa", value: 1 },
    { source: "England", target: "Angola", value: 1 },
    { source: "England", target: "Senegal", value: 1 },
    { source: "England", target: "Morocco", value: 2 },
    { source: "England", target: "South Africa", value: 7 },
    { source: "South Africa", target: "China", value: 5 },
    { source: "South Africa", target: "India", value: 1 },
    { source: "South Africa", target: "Japan", value: 3 },
    { source: "Angola", target: "China", value: 5 },
    { source: "Angola", target: "India", value: 1 },
    { source: "Angola", target: "Japan", value: 3 },
    { source: "Senegal", target: "China", value: 5 },
    { source: "Senegal", target: "India", value: 1 },
    { source: "Senegal", target: "Japan", value: 3 },
    { source: "Mali", target: "China", value: 5 },
    { source: "Mali", target: "India", value: 1 },
    { source: "Mali", target: "Japan", value: 3 },
    { source: "Morocco", target: "China", value: 5 },
    { source: "Morocco", target: "India", value: 1 },
    { source: "Morocco", target: "Japan", value: 3 }
  ]
};


const theme = {
  fontFamily: "Arial, sans-serif",
  fontSize: 16,
  textColor: "#333",
  tooltip: {
    container: {
      background: "#fff",
      color: "#000"
    }
  }
};

const MyChart = ({ data, width=640, height=320 }) => (
  <div style={{ minWidth: '640px', minHeight: '300px', width, height }}>
    <ResponsiveSankey
    data={data}
    margin={{ top: 30, right: 50, bottom: 30, left: 50 }}
    align="justify"
    colors={{ scheme: "category10" }}
    nodeOpacity={1}
    nodeThickness={18}
    nodeInnerPadding={3}
    nodeSpacing={24}
    nodeBorderWidth={0}
    nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
    linkOpacity={0.8}
    linkHoverOthersOpacity={0.05}
    enableLinkGradient={true}
    labelPosition="inside"
    labelPadding={16}
    labelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
    animate={true}
    motionStiffness={140}
    motionDamping={13}
    theme={theme}
  />
  </div>
);

function Sankey({ width, height }) {
  return (
    <div className="chart-container">
      <MyChart data={data} width={width} height={height}/>
    </div>
  );
}

export default Sankey;
