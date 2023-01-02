import React from "react";
import { ResponsiveFunnel } from "@nivo/funnel";

const data = [
  {
    id: "step_sent",
    value: 68261,
    label: "Sent",
  },
  {
    id: "step_viewed",
    value: 44642,
    label: "Viewed",
  },
  {
    id: "step_clicked",
    value: 27970,
    label: "Clicked",
  },
  {
    id: "step_add_to_card",
    value: 25155,
    label: "Add To Card",
  },
  {
    id: "step_purchased",
    value: 15745,
    label: "Purchased",
  },
];

const MyChart = ({ data }) => (
  <ResponsiveFunnel
    data={data}
    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    valueFormat=">-.4s"
    colors={{ scheme: "spectral" }}
    borderWidth={20}
    labelColor={{
      from: "color",
      modifiers: [["darker", 3]],
    }}
    beforeSeparatorLength={100}
    beforeSeparatorOffset={20}
    afterSeparatorLength={100}
    afterSeparatorOffset={20}
    currentPartSizeExtension={10}
    currentBorderWidth={40}
    motionConfig="wobbly"
  />
);

function Funnel() {
  return (
    <div className="funnel chart">
      <MyChart data={data} />
    </div>
  );
}

export default Funnel;
