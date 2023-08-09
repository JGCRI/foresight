import React, { useEffect } from "react";
import Gauge from "justgage";
import { getIcon } from "../Dashboard";


const ScenerioGuageNegative = ({ guageText, bottomText, guageValue }) => {
    const Text = guageText;
    const Bottom = bottomText;
    const Value = guageValue;
    useEffect(() => {
        var prevGuage = new Gauge({id:Text});
        prevGuage.destroy();
        new Gauge({
            id: Text,
            value: Value,
            hideValue: false,
            hideMinMax: true,
            min: -100,
            max: 0,
            reverse: true,
            symbol: "%",
            pointer: false,
            startAnimationTime: 120,
            startAnimationType: ">",
            refreshAnimationTime: 120,
            refreshAnimationType: "bounce",
            showInnerShadow: true,
            shadowSize: 7,
            shadowVerticalOffset: 5,
            shadowOpacity: 0.9,
            relativeGaugeSize: true,
            valueMinFontSize: 26,
            gaugeWidthScale: 0.6,
            counter: true,
            valueFontColor: "#DADADA",
            valueFontFamily: "Geneva",
            formatNumber: true,
            levelColors: [
                "#f27e35"
            ],
        });
        // setInterval(() => {
        // const refreshValue = generateRandomValue(value, type);
        // gauge.refresh(refreshValue);
        // }, GAUGE_CONFIG[type].interval);
    }, [Value, Text]);
    return (
        <>
            <div id={Text} />
            <div className="guageText"> {getIcon(Bottom)}  {Bottom}</div>
        </>
    );
};

export default ScenerioGuageNegative;