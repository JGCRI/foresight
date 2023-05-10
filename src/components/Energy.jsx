import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import awsconfig from "../aws-exports";
import { listForesightData } from "../graphql/queries";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

Amplify.configure(awsconfig);
Chart.register(CategoryScale);

function Energy({ open, toggleOpen }) {
  const [foresightData, setForesightData] = useState([]);

  useEffect(() => {
    const fetchForesightData = async () => {
      try {
        const { data } = await API.graphql(graphqlOperation(listForesightData));
        setForesightData(
          data.listForesightData.items.sort((a, b) => a.id - b.id)
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchForesightData();
  }, []);

  // prepare data for charting
  const regions = Array.from(new Set(foresightData.map((item) => item.region))); // get unique regions
  const chartData = {
    labels: regions,
    datasets: [
      {
        label: "Scenario 1",
        data: regions.map(
          (region) =>
            foresightData.find(
              (item) => item.region === region && item.scenario === "scen1"
            ).value
        ),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Scenario 2",
        data: regions.map(
          (region) =>
            foresightData.find(
              (item) => item.region === region && item.scenario === "scen2"
            ).value
        ),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="body-page"> 
      <Sidebar />
      <div className={open ? "dashboard" : "dashboardClosed"}>
        <Container fluid>
          <Row className="row">
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className="chart-sector">
                <h2>Bar Chart Energy</h2>
                <Bar data={chartData} />
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className="chart-sector">
                <h2>Bar Chart Energy</h2>
                <Bar data={chartData} />
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
