import React from 'react';
import Imageslider from "./charts/Imageslider";
import first_img from "../assets/img/rice_oli_2021247_lrg.jpg";
import second_img from "../assets/img/rice_oli_2022259_lrg.jpg";

function DashboardGraphs() {
    return (
        <div className="graph-grid">
            <div>Global Trends</div>
            <div>Spatial Composition</div>
            <div>Top 10 Countries -- By Subsector</div>
            <Imageslider
                firstImage={first_img}
                secondImage={second_img}
                href="https://earthobservatory.nasa.gov/images/150412/a-rough-year-for-rice-in-california"
                linkText="NASA"
            />
            <Imageslider
                firstImage={first_img}
                secondImage={second_img}
                href="https://earthobservatory.nasa.gov/images/150412/a-rough-year-for-rice-in-california"
                linkText="NASA"
            />
            <Imageslider
                firstImage={first_img}
                secondImage={second_img}
                href="https://earthobservatory.nasa.gov/images/150412/a-rough-year-for-rice-in-california"
                linkText="NASA"
            />
        </div>
    );
}

export default DashboardGraphs;