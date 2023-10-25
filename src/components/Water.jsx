import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Amplify} from "aws-amplify";
import awsconfig from "../aws-exports";
import { useState} from "react";
import SidebarDashboard from "./SidebarDashboard.jsx";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

Amplify.configure(awsconfig);
Chart.register(CategoryScale);

function Water({ open, toggleOpen }) {
  const [highlightedScenario, setHighlightedScenario] = useState(null);

  const data = {
    labels: ["X1", "X2", "X3", "X4", "X5"],
    datasets: [
      {
        label: "Scenario 1",
        data: [10, 8, 6, 4, 2],
        backgroundColor:
          highlightedScenario === "Scenario 1"
            ? "rgba(255, 99, 132, 1)"
            : "rgba(255, 99, 132, " + (highlightedScenario ? "0.1" : "0.5") + ")",
        borderColor:
          highlightedScenario === "Scenario 1"
            ? "rgba(255, 99, 132, 1)"
            : "rgba(255, 99, 132, " + (highlightedScenario ? "0.1" : "0.5") + ")",
        borderWidth: 1,
      },
      {
        label: "Scenario 2",
        data: [3, 6, 9, 12, 15],
        backgroundColor:
          highlightedScenario === "Scenario 2"
            ? "rgba(54, 162, 235, 1)"
            : "rgba(54, 162, 235, " + (highlightedScenario ? "0.1" : "0.5") + ")",
        borderColor:
          highlightedScenario === "Scenario 2"
            ? "rgba(54, 162, 235, 1)"
            : "rgba(54, 162, 235, " + (highlightedScenario ? "0.1" : "0.5") + ")",
        borderWidth: 1,
      },
      {
        label: "Scenario 3",
        data: [5, 10, 15, 10, 5],
        backgroundColor:
          highlightedScenario === "Scenario 3"
            ? "rgba(255, 206, 86, 1)"
            : "rgba(255, 206, 86, " + (highlightedScenario ? "0.1" : "0.5") + ")",
        borderColor:
          highlightedScenario === "Scenario 3"
            ? "rgba(255, 206, 86, 1)"
            : "rgba(255, 206, 86, " + (highlightedScenario ? "0.1" : "0.5") + ")",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (event, chartElements) => {
      if (chartElements.length > 0) {
        const clickedDatasetIndex = chartElements[0].datasetIndex;
        const clickedDatasetLabel = data.datasets[clickedDatasetIndex].label;

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
    },
  };


  return (
    <div className="body-page">
      <SidebarDashboard />
      <div className={open ? "dashboard" : "dashboardClosed"}>
        <Container fluid>
          <Row className="row">
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className="chart-sector">
                <h2>Bar Chart Water</h2>
                <div className="chart-container">
                  <Bar data={data} options={options} />
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className="chart-sector">
                <h2>Bar Chart Water</h2>
                <div className="chart-container">
                  <Bar data={data} options={options} />
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Water);
