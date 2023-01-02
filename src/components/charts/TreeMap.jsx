import React from "react";
import { ResponsiveTreeMap } from '@nivo/treemap'

const data = {
        "name": "nivo",
        "color": "hsl(96, 70%, 50%)",
        "children": [
          {
            "name": "viz",
            "color": "hsl(332, 70%, 50%)",
            "children": [
              {
                "name": "stack",
                "color": "hsl(216, 70%, 50%)",
                "children": [
                  {
                    "name": "cchart",
                    "color": "hsl(23, 70%, 50%)",
                    "loc": 100135
                  },
                  {
                    "name": "xAxis",
                    "color": "hsl(237, 70%, 50%)",
                    "loc": 24695
                  },
                  {
                    "name": "yAxis",
                    "color": "hsl(171, 70%, 50%)",
                    "loc": 99766
                  },
                  {
                    "name": "layers",
                    "color": "hsl(249, 70%, 50%)",
                    "loc": 25572
                  }
                ]
              },
              {
                "name": "ppie",
                "color": "hsl(336, 70%, 50%)",
                "children": [
                  {
                    "name": "chart",
                    "color": "hsl(259, 70%, 50%)",
                    "children": [
                      {
                        "name": "pie",
                        "color": "hsl(63, 70%, 50%)",
                        "children": [
                          {
                            "name": "outline",
                            "color": "hsl(223, 70%, 50%)",
                            "loc": 130853
                          },
                          {
                            "name": "slices",
                            "color": "hsl(288, 70%, 50%)",
                            "loc": 82158
                          },
                          {
                            "name": "bbox",
                            "color": "hsl(352, 70%, 50%)",
                            "loc": 148117
                          }
                        ]
                      },
                      {
                        "name": "donut",
                        "color": "hsl(322, 70%, 50%)",
                        "loc": 159156
                      },
                      {
                        "name": "gauge",
                        "color": "hsl(228, 70%, 50%)",
                        "loc": 133941
                      }
                    ]
                  },
                  {
                    "name": "legends",
                    "color": "hsl(149, 70%, 50%)",
                    "loc": 127395
                  }
                ]
              }
            ]
          },
          {
            "name": "colors",
            "color": "hsl(290, 70%, 50%)",
            "children": [
              {
                "name": "rgb",
                "color": "hsl(100, 70%, 50%)",
                "loc": 18628
              },
              {
                "name": "hsl",
                "color": "hsl(239, 70%, 50%)",
                "loc": 133033
              }
            ]
          },
          {
            "name": "utils",
            "color": "hsl(55, 70%, 50%)",
            "children": [
              {
                "name": "randomize",
                "color": "hsl(207, 70%, 50%)",
                "loc": 118242
              },
              {
                "name": "resetClock",
                "color": "hsl(327, 70%, 50%)",
                "loc": 95960
              },
              {
                "name": "noop",
                "color": "hsl(136, 70%, 50%)",
                "loc": 121488
              },
              {
                "name": "tick",
                "color": "hsl(22, 70%, 50%)",
                "loc": 129958
              },
              {
                "name": "forceGC",
                "color": "hsl(19, 70%, 50%)",
                "loc": 16068
              },
              {
                "name": "stackTrace",
                "color": "hsl(29, 70%, 50%)",
                "loc": 151545
              },
              {
                "name": "dbg",
                "color": "hsl(105, 70%, 50%)",
                "loc": 42083
              }
            ]
          },
          {
            "name": "generators",
            "color": "hsl(59, 70%, 50%)",
            "children": [
              {
                "name": "address",
                "color": "hsl(79, 70%, 50%)",
                "loc": 186441
              },
              {
                "name": "city",
                "color": "hsl(330, 70%, 50%)",
                "loc": 177246
              },
              {
                "name": "animal",
                "color": "hsl(355, 70%, 50%)",
                "loc": 162238
              },
              {
                "name": "movie",
                "color": "hsl(196, 70%, 50%)",
                "loc": 109367
              },
              {
                "name": "user",
                "color": "hsl(308, 70%, 50%)",
                "loc": 142642
              }
            ]
          },
          {
            "name": "set",
            "color": "hsl(268, 70%, 50%)",
            "children": [
              {
                "name": "clone",
                "color": "hsl(129, 70%, 50%)",
                "loc": 178209
              },
              {
                "name": "intersect",
                "color": "hsl(67, 70%, 50%)",
                "loc": 194611
              },
              {
                "name": "merge",
                "color": "hsl(303, 70%, 50%)",
                "loc": 189273
              },
              {
                "name": "reverse",
                "color": "hsl(278, 70%, 50%)",
                "loc": 193708
              },
              {
                "name": "toArray",
                "color": "hsl(269, 70%, 50%)",
                "loc": 49913
              },
              {
                "name": "toObject",
                "color": "hsl(344, 70%, 50%)",
                "loc": 71968
              },
              {
                "name": "fromCSV",
                "color": "hsl(234, 70%, 50%)",
                "loc": 6884
              },
              {
                "name": "slice",
                "color": "hsl(59, 70%, 50%)",
                "loc": 78990
              },
              {
                "name": "append",
                "color": "hsl(212, 70%, 50%)",
                "loc": 25215
              },
              {
                "name": "prepend",
                "color": "hsl(101, 70%, 50%)",
                "loc": 21612
              },
              {
                "name": "shuffle",
                "color": "hsl(14, 70%, 50%)",
                "loc": 84769
              },
              {
                "name": "pick",
                "color": "hsl(146, 70%, 50%)",
                "loc": 105663
              },
              {
                "name": "plouc",
                "color": "hsl(178, 70%, 50%)",
                "loc": 106504
              }
            ]
          },
          {
            "name": "text",
            "color": "hsl(214, 70%, 50%)",
            "children": [
              {
                "name": "trim",
                "color": "hsl(355, 70%, 50%)",
                "loc": 96658
              },
              {
                "name": "slugify",
                "color": "hsl(190, 70%, 50%)",
                "loc": 191178
              },
              {
                "name": "snakeCase",
                "color": "hsl(180, 70%, 50%)",
                "loc": 40594
              },
              {
                "name": "camelCase",
                "color": "hsl(235, 70%, 50%)",
                "loc": 65464
              },
              {
                "name": "repeat",
                "color": "hsl(256, 70%, 50%)",
                "loc": 161454
              },
              {
                "name": "padLeft",
                "color": "hsl(322, 70%, 50%)",
                "loc": 5024
              },
              {
                "name": "padRight",
                "color": "hsl(36, 70%, 50%)",
                "loc": 170288
              },
              {
                "name": "sanitize",
                "color": "hsl(91, 70%, 50%)",
                "loc": 34348
              },
              {
                "name": "ploucify",
                "color": "hsl(233, 70%, 50%)",
                "loc": 194549
              }
            ]
          },
          {
            "name": "misc",
            "color": "hsl(229, 70%, 50%)",
            "children": [
              {
                "name": "greetings",
                "color": "hsl(244, 70%, 50%)",
                "children": [
                  {
                    "name": "hey",
                    "color": "hsl(39, 70%, 50%)",
                    "loc": 96967
                  },
                  {
                    "name": "HOWDY",
                    "color": "hsl(325, 70%, 50%)",
                    "loc": 52854
                  },
                  {
                    "name": "aloha",
                    "color": "hsl(244, 70%, 50%)",
                    "loc": 141451
                  },
                  {
                    "name": "AHOY",
                    "color": "hsl(270, 70%, 50%)",
                    "loc": 55893
                  }
                ]
              },
              {
                "name": "other",
                "color": "hsl(38, 70%, 50%)",
                "loc": 25262
              },
              {
                "name": "path",
                "color": "hsl(144, 70%, 50%)",
                "children": [
                  {
                    "name": "pathA",
                    "color": "hsl(291, 70%, 50%)",
                    "loc": 42212
                  },
                  {
                    "name": "pathB",
                    "color": "hsl(290, 70%, 50%)",
                    "children": [
                      {
                        "name": "pathB1",
                        "color": "hsl(359, 70%, 50%)",
                        "loc": 165619
                      },
                      {
                        "name": "pathB2",
                        "color": "hsl(165, 70%, 50%)",
                        "loc": 195888
                      },
                      {
                        "name": "pathB3",
                        "color": "hsl(288, 70%, 50%)",
                        "loc": 76794
                      },
                      {
                        "name": "pathB4",
                        "color": "hsl(39, 70%, 50%)",
                        "loc": 154170
                      }
                    ]
                  },
                  {
                    "name": "pathC",
                    "color": "hsl(73, 70%, 50%)",
                    "children": [
                      {
                        "name": "pathC1",
                        "color": "hsl(43, 70%, 50%)",
                        "loc": 70817
                      },
                      {
                        "name": "pathC2",
                        "color": "hsl(285, 70%, 50%)",
                        "loc": 120693
                      },
                      {
                        "name": "pathC3",
                        "color": "hsl(265, 70%, 50%)",
                        "loc": 17190
                      },
                      {
                        "name": "pathC4",
                        "color": "hsl(347, 70%, 50%)",
                        "loc": 134275
                      },
                      {
                        "name": "pathC5",
                        "color": "hsl(110, 70%, 50%)",
                        "loc": 33869
                      },
                      {
                        "name": "pathC6",
                        "color": "hsl(145, 70%, 50%)",
                        "loc": 134674
                      },
                      {
                        "name": "pathC7",
                        "color": "hsl(91, 70%, 50%)",
                        "loc": 113431
                      },
                      {
                        "name": "pathC8",
                        "color": "hsl(68, 70%, 50%)",
                        "loc": 187505
                      },
                      {
                        "name": "pathC9",
                        "color": "hsl(284, 70%, 50%)",
                        "loc": 125227
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      };


const MyChart = ({ data }) => (
<ResponsiveTreeMap
        data={data}
        identity="name"
        value="loc"
        valueFormat=".02s"
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        labelSkipSize={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.2
                ]
            ]
        }}
        parentLabelPosition="left"
        parentLabelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.1
                ]
            ]
        }}
    />
);

function TreeMap() {
  return (
    <div className="treemap chart">
          <MyChart data={data} />
    </div>
  );
}

export default TreeMap;