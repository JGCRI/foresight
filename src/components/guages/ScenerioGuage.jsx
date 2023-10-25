import React, { useEffect } from "react";
import Gauge from "justgage";

const ScenerioGuage = ({ guageText, guageValue }) => {
    const Text = guageText;
    const Value = guageValue;
    useEffect(() => {
        var prevGuage = new Gauge({id:Text});
        prevGuage.destroy();
        new Gauge({
            id: Text,
            value: Value,
            hideValue: false,
            hideMinMax: true,
            min: 0,
            max: 100,
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
                "#91d145"
            ],
        });
        // setInterval(() => {
        // const refreshValue = generateRandomValue(value, type);
        // gauge.refresh(refreshValue);
        // }, GAUGE_CONFIG[type].interval);
    }, [Value, Text]);
    return (
        <div id={Text} />
    );
};

export default ScenerioGuage;