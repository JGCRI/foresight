import React, { useState, useEffect, useCallback } from "react";
import { Bar, Line } from "react-chartjs-2";
import { API, graphqlOperation } from "aws-amplify";
import { connect } from "react-redux";
import { Container, Row, Col, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";

// GraphQL query for retrieving parameter options
const queryParamOptions = `
  query {
    listGcamDataTableAggParamGlobals {
      items {
        param
      }
    }
  }
`;

// GraphQL query for retrieving data
const queryData = `
  query MyQuery($param: String!) {
    listGcamDataTableAggParamGlobals(filter: {param: {eq: $param}}, limit: 100000) {
      items {
        id
        value
        x
        scenario
        param
      }
    }
  }
`;

function Energy({ open, toggleOpen }) {
  const [foresightData, setForesightData] = useState([]);
  const [paramOptions, setParamOptions] = useState([]);
  const [selectedParam, setSelectedParam] = useState(null);
  const [highlightedScenario, setHighlightedScenario] = useState(null);

  const fetchParamOptions = useCallback(async () => {
    try {
      const { data } = await API.graphql(graphqlOperation(queryParamOptions));
      const uniqueOptions = [
        ...new Set(
          data.listGcamDataTableAggParamGlobals.items.map((item) => item.param)
        ),
      ];
      setParamOptions(uniqueOptions);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchForesightData = useCallback(async () => {
    try {
      const { data } = await API.graphql(
        graphqlOperation(queryData, {
          param: selectedParam,
        })
      );
      setForesightData(data.listGcamDataTableAggParamGlobals.items);
    } catch (error) {
      console.log(error);
    }
  }, [selectedParam]);

  useEffect(() => {
    fetchParamOptions();
  }, [fetchParamOptions]);

  useEffect(() => {
    if (paramOptions.length > 0) {
      setSelectedParam(paramOptions[0]);
    }
  }, [paramOptions]);

  useEffect(() => {
    if (selectedParam) {
      fetchForesightData();
    }
  }, [selectedParam, fetchForesightData]);

  const handleParamChange = (event) => {
    setSelectedParam(event.target.value);
    setHighlightedScenario(null);
  };

  const colorPalette = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];

  const hexToRGBA = (hex, opacity) => {
    const shorthandRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    const result = shorthandRegex.exec(hex);
    const rgb = result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  
    if (rgb) {
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
    }
  
    return hex;
  };

  const prepareChartData = () => {
    const uniqueXValues = Array.from(
      new Set(foresightData.map((item) => item.x))
    ).sort();
  
    const uniqueScenarios = Array.from(
      new Set(foresightData.map((item) => item.scenario))
    );
  
    const chartData = {
      labels: uniqueXValues,
      datasets: uniqueScenarios.map((scenario, index) => {
        const isHighlighted = highlightedScenario === scenario;
        const opacity = isHighlighted ? 1 : (highlightedScenario ? 0.1 : 0.5);
        const color = colorPalette[index % colorPalette.length];
        const backgroundColor = isHighlighted
          ? color
          : hexToRGBA(color, opacity);
        const borderColor = isHighlighted
          ? color
          : hexToRGBA(color, opacity);
  
        return {
          label: scenario,
          data: foresightData
            .filter((item) => item.scenario === scenario)
            .map((item) => item.value),
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1,
          fill: false,
        };
      }),
    };
  
    return chartData;
  };
  

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (event, chartElements) => {
      if (chartElements && chartElements.length > 0) {
        const clickedDatasetIndex = chartElements[0].datasetIndex;
        const clickedDataset = event.chart.data.datasets[clickedDatasetIndex];

        if (clickedDataset) {
          const clickedDatasetLabel = clickedDataset.label;

          setHighlightedScenario((prevHighlightedScenario) => {
            if (prevHighlightedScenario === clickedDatasetLabel) {
              return null;
            } else {
              return clickedDatasetLabel;
            }
          });
        }
      } else {
        setHighlightedScenario(null);
      }
    },
    onHover: (event, chartElements) => {
      if (chartElements && chartElements.length > 0) {
        const hoveredDatasetIndex = chartElements[0].datasetIndex;
        const hoveredDataset = event.chart.data.datasets[hoveredDatasetIndex];

        if (hoveredDataset) {
          const hoveredDatasetLabel = hoveredDataset.label;

          setHighlightedScenario(hoveredDatasetLabel);
        }
      } else {
        setHighlightedScenario(null);
      }
    },
      onLeave: (event, chartElements) => {
    setHighlightedScenario(null);
  },
  };


  const handleChartClick = (elems, chartData) => {
    if (elems && elems.length > 0) {
      const clickedDatasetIndex = elems[0].datasetIndex;
      const clickedDatasetLabel =
        chartData.datasets[clickedDatasetIndex].label;
  
      setHighlightedScenario((prevHighlightedScenario) => {
        if (prevHighlightedScenario === clickedDatasetLabel) {
          return null;
        } else {
          return clickedDatasetLabel;
        }
      });
    } else {
      setHighlightedScenario(null);
    }
  };

  return (
    <div className="body-page">
      <Sidebar />
      <div className={open ? "dashboard" : "dashboardClosed"}>
        <Container fluid>
          <Row className="row">
            <Form.Group>
              <Form.Label>Select Parameter:</Form.Label>
              <Form.Control
                as="select"
                onChange={handleParamChange}
                value={selectedParam}
              >
                {paramOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Row>
          <Row className="row">
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <div className="chart-sector">
                <h2>Energy Chart</h2>
              </div>
            </Col>
          </Row>
          <Row className="row">
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className="chart-sector">
                <h2>Bar Chart Energy</h2>
                {selectedParam && (
                  <div className="chart-container">
                    <Bar
                      data={prepareChartData()}
                      options={chartOptions}
                      getElementAtEvent={(elems) =>
                        handleChartClick(elems, prepareChartData())
                      }
                    />
                  </div>
                )}
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className="chart-sector">
                <h2>Line Chart Energy</h2>
                {selectedParam && (
                  <div className="chart-container">
                    <Line
                      data={prepareChartData()}
                      options={chartOptions}
                      getElementAtEvent={(elems) =>
                        handleChartClick(elems, prepareChartData())
                      }
                    />
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    open: state.open,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleOpen: () => dispatch({ type: "toggleOpen" }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Energy);
