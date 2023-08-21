import React from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import countries from "./geopolitical_regions.json";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
//<div style={isLeft?{textAlign:'left'}:{textAlign:'right'}}>{scenarioTitle}</div>
const DashboardChoropleth = ({ data }) => (
    <>
        
        <div className="nivo-wrapper">
            <ResponsiveChoropleth
                data={data}
                features={countries.features}
                margin={{ top: 25, right: 0, bottom: 0, left: 0 }}
                colors="YlGn"
                domain={[0, 1000000]}
                unknownColor="#666666"
                label="properties.name"
                valueFormat=".2s"
                projectionScale={50}
                projectionTranslation={[0.5, 0.5]}
                projectionRotation={[0, 0, 0]}
                borderWidth={0.5}
                borderColor="#152538"
                legends={[]}
            />
        </div>
    </>
)

export default DashboardChoropleth;