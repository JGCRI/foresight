import React from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import countries from "./world_countries.json";

const data = [
  {
    id: "AFG",
    value: 92820,
  },
  {
    id: "AGO",
    value: 534120,
  },
  {
    id: "ALB",
    value: 227935,
  },
  {
    id: "ARE",
    value: 959206,
  },
  {
    id: "ARG",
    value: 600182,
  },
  {
    id: "ARM",
    value: 198794,
  },
  {
    id: "ATA",
    value: 394355,
  },
  {
    id: "ATF",
    value: 770338,
  },
  {
    id: "AUT",
    value: 836632,
  },
  {
    id: "AZE",
    value: 812142,
  },
  {
    id: "BDI",
    value: 735506,
  },
  {
    id: "BEL",
    value: 441876,
  },
  {
    id: "BEN",
    value: 863379,
  },
  {
    id: "BFA",
    value: 329378,
  },
  {
    id: "BGD",
    value: 242170,
  },
  {
    id: "BGR",
    value: 574797,
  },
  {
    id: "BHS",
    value: 21070,
  },
  {
    id: "BIH",
    value: 158915,
  },
  {
    id: "BLR",
    value: 193903,
  },
  {
    id: "BLZ",
    value: 250139,
  },
  {
    id: "BOL",
    value: 806136,
  },
  {
    id: "BRN",
    value: 501826,
  },
  {
    id: "BTN",
    value: 595294,
  },
  {
    id: "BWA",
    value: 519620,
  },
  {
    id: "CAF",
    value: 823086,
  },
  {
    id: "CAN",
    value: 446155,
  },
  {
    id: "CHE",
    value: 260967,
  },
  {
    id: "CHL",
    value: 3047,
  },
  {
    id: "CHN",
    value: 114490,
  },
  {
    id: "CIV",
    value: 43610,
  },
  {
    id: "CMR",
    value: 379512,
  },
  {
    id: "COG",
    value: 240663,
  },
  {
    id: "COL",
    value: 814,
  },
  {
    id: "CRI",
    value: 282639,
  },
  {
    id: "CUB",
    value: 775700,
  },
  {
    id: "-99",
    value: 909993,
  },
  {
    id: "CYP",
    value: 291870,
  },
  {
    id: "CZE",
    value: 290317,
  },
  {
    id: "DEU",
    value: 140860,
  },
  {
    id: "DJI",
    value: 962076,
  },
  {
    id: "DNK",
    value: 98408,
  },
  {
    id: "DOM",
    value: 800212,
  },
  {
    id: "DZA",
    value: 144215,
  },
  {
    id: "ECU",
    value: 929128,
  },
  {
    id: "EGY",
    value: 977345,
  },
  {
    id: "ERI",
    value: 880388,
  },
  {
    id: "ESP",
    value: 953526,
  },
  {
    id: "EST",
    value: 939013,
  },
  {
    id: "ETH",
    value: 183280,
  },
  {
    id: "FIN",
    value: 609203,
  },
  {
    id: "FJI",
    value: 314241,
  },
  {
    id: "FLK",
    value: 14205,
  },
  {
    id: "FRA",
    value: 49455,
  },
  {
    id: "GAB",
    value: 96446,
  },
  {
    id: "GBR",
    value: 315488,
  },
  {
    id: "GEO",
    value: 518359,
  },
  {
    id: "GHA",
    value: 759288,
  },
  {
    id: "GIN",
    value: 333189,
  },
  {
    id: "GMB",
    value: 485686,
  },
  {
    id: "GNB",
    value: 89759,
  },
  {
    id: "GNQ",
    value: 854250,
  },
  {
    id: "GRC",
    value: 208979,
  },
  {
    id: "GTM",
    value: 138088,
  },
  {
    id: "GUY",
    value: 46630,
  },
  {
    id: "HND",
    value: 685460,
  },
  {
    id: "HRV",
    value: 769441,
  },
  {
    id: "HTI",
    value: 7386,
  },
  {
    id: "HUN",
    value: 688616,
  },
  {
    id: "IDN",
    value: 917352,
  },
  {
    id: "IND",
    value: 451708,
  },
  {
    id: "IRL",
    value: 728721,
  },
  {
    id: "IRN",
    value: 756794,
  },
  {
    id: "IRQ",
    value: 376824,
  },
  {
    id: "ISL",
    value: 682190,
  },
  {
    id: "ISR",
    value: 653837,
  },
  {
    id: "ITA",
    value: 68127,
  },
  {
    id: "JAM",
    value: 594890,
  },
  {
    id: "JOR",
    value: 996711,
  },
  {
    id: "JPN",
    value: 964717,
  },
  {
    id: "KAZ",
    value: 672207,
  },
  {
    id: "KEN",
    value: 278216,
  },
  {
    id: "KGZ",
    value: 308831,
  },
  {
    id: "KHM",
    value: 212679,
  },
  {
    id: "OSA",
    value: 196577,
  },
  {
    id: "KWT",
    value: 480077,
  },
  {
    id: "LAO",
    value: 353055,
  },
  {
    id: "LBN",
    value: 45518,
  },
  {
    id: "LBR",
    value: 729600,
  },
  {
    id: "LBY",
    value: 586331,
  },
  {
    id: "LKA",
    value: 33641,
  },
  {
    id: "LSO",
    value: 268049,
  },
  {
    id: "LTU",
    value: 758792,
  },
  {
    id: "LUX",
    value: 12978,
  },
  {
    id: "LVA",
    value: 612662,
  },
  {
    id: "MAR",
    value: 113278,
  },
  {
    id: "MDA",
    value: 980402,
  },
  {
    id: "MDG",
    value: 339836,
  },
  {
    id: "MEX",
    value: 828189,
  },
  {
    id: "MKD",
    value: 250101,
  },
  {
    id: "MLI",
    value: 729017,
  },
  {
    id: "MMR",
    value: 991014,
  },
  {
    id: "MNE",
    value: 133777,
  },
  {
    id: "MNG",
    value: 59912,
  },
  {
    id: "MOZ",
    value: 157417,
  },
  {
    id: "MRT",
    value: 114132,
  },
  {
    id: "MWI",
    value: 285746,
  },
  {
    id: "MYS",
    value: 263931,
  },
  {
    id: "NAM",
    value: 790789,
  },
  {
    id: "NCL",
    value: 555236,
  },
  {
    id: "NER",
    value: 403442,
  },
  {
    id: "NGA",
    value: 647141,
  },
  {
    id: "NIC",
    value: 519632,
  },
  {
    id: "NLD",
    value: 722529,
  },
  {
    id: "NOR",
    value: 560090,
  },
  {
    id: "NPL",
    value: 760458,
  },
  {
    id: "NZL",
    value: 607188,
  },
  {
    id: "OMN",
    value: 949121,
  },
  {
    id: "PAK",
    value: 665103,
  },
  {
    id: "PAN",
    value: 550321,
  },
  {
    id: "PER",
    value: 793594,
  },
  {
    id: "PHL",
    value: 318915,
  },
  {
    id: "PNG",
    value: 204446,
  },
  {
    id: "POL",
    value: 37653,
  },
  {
    id: "PRI",
    value: 509993,
  },
  {
    id: "PRT",
    value: 463230,
  },
  {
    id: "PRY",
    value: 987743,
  },
  {
    id: "QAT",
    value: 963303,
  },
  {
    id: "ROU",
    value: 695778,
  },
  {
    id: "RUS",
    value: 501627,
  },
  {
    id: "RWA",
    value: 429777,
  },
  {
    id: "ESH",
    value: 710020,
  },
  {
    id: "SAU",
    value: 578962,
  },
  {
    id: "SDN",
    value: 306310,
  },
  {
    id: "SDS",
    value: 90385,
  },
  {
    id: "SEN",
    value: 221628,
  },
  {
    id: "SLB",
    value: 943047,
  },
  {
    id: "SLE",
    value: 957095,
  },
  {
    id: "SLV",
    value: 255416,
  },
  {
    id: "ABV",
    value: 730851,
  },
  {
    id: "SOM",
    value: 114561,
  },
  {
    id: "SRB",
    value: 463429,
  },
  {
    id: "SUR",
    value: 461830,
  },
  {
    id: "SVK",
    value: 238282,
  },
  {
    id: "SVN",
    value: 112011,
  },
  {
    id: "SWZ",
    value: 767554,
  },
  {
    id: "SYR",
    value: 741049,
  },
  {
    id: "TCD",
    value: 748416,
  },
  {
    id: "TGO",
    value: 224524,
  },
  {
    id: "THA",
    value: 684696,
  },
  {
    id: "TJK",
    value: 703664,
  },
  {
    id: "TKM",
    value: 21786,
  },
  {
    id: "TLS",
    value: 433462,
  },
  {
    id: "TTO",
    value: 395065,
  },
  {
    id: "TUN",
    value: 150159,
  },
  {
    id: "TUR",
    value: 504348,
  },
  {
    id: "TWN",
    value: 858781,
  },
  {
    id: "TZA",
    value: 456733,
  },
  {
    id: "UGA",
    value: 542011,
  },
  {
    id: "UKR",
    value: 841525,
  },
  {
    id: "URY",
    value: 173269,
  },
  {
    id: "USA",
    value: 182740,
  },
  {
    id: "UZB",
    value: 78910,
  },
  {
    id: "VEN",
    value: 314789,
  },
  {
    id: "VNM",
    value: 572303,
  },
  {
    id: "VUT",
    value: 783368,
  },
  {
    id: "PSE",
    value: 462320,
  },
  {
    id: "YEM",
    value: 928514,
  },
  {
    id: "ZAF",
    value: 190987,
  },
  {
    id: "ZMB",
    value: 574828,
  },
  {
    id: "ZWE",
    value: 381709,
  },
  {
    id: "KOR",
    value: 257390,
  },
];

const MyChart = ({ data }) => (
  <ResponsiveChoropleth
    data={data}
    features={countries.features}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    colors="nivo"
    domain={[0, 1000000]}
    unknownColor="#666666"
    label="properties.name"
    valueFormat=".2s"
    projectionTranslation={[0.5, 0.5]}
    projectionRotation={[0, 0, 0]}
    enableGraticule={true}
    graticuleLineColor="#dddddd"
    borderWidth={0.5}
    borderColor="#152538"
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "#38bcb2",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "#eed312",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
      {
        id: "gradient",
        type: "linearGradient",
        colors: [
          {
            offset: 0,
            color: "#000",
          },
          {
            offset: 100,
            color: "inherit",
          },
        ],
      },
    ]}
    fill={[
      {
        match: {
          id: "CAN",
        },
        id: "dots",
      },
      {
        match: {
          id: "CHN",
        },
        id: "lines",
      },
      {
        match: {
          id: "ATA",
        },
        id: "gradient",
      },
    ]}
    legends={[
      {
        anchor: "bottom-left",
        direction: "column",
        justify: true,
        translateX: 20,
        translateY: -100,
        itemsSpacing: 0,
        itemWidth: 94,
        itemHeight: 18,
        itemDirection: "left-to-right",
        itemTextColor: "#444444",
        itemOpacity: 0.85,
        symbolSize: 18,
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000000",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

function Choropleth() {
  return (
    <div className="choropleth chart">
      <MyChart data={data} />
    </div>
  );
}

export default Choropleth;
