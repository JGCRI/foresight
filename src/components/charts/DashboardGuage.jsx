import React, { useState } from "react";
import {SemiCircleProgress} from 'react-semicircle-progressbar';

export default function DashboardGuage({ title, num }) {
    const guageText = title;
    const numGuages = num;
    console.log(document.documentElement.clientWidth);
    return (
        <div>
            <SemiCircleProgress
                percentage={80}
                size={{
                    width: (document.documentElement.clientWidth)/(100/(numGuages+1)) ,
                    height: 100,
                }}
                strokeWidth={15}
                strokeColor="#f00"
                hasBackground={true}
            />
            <div className="guageText"> {guageText}</div>
        </div>

    );
}