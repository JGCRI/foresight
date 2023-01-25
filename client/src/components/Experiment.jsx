import { useState, useEffect } from "react";
import Bar from "./charts/Bar";

function DataLoad() {
  
  // Check fetching data from different within a file
  const [dataIn, setDataIn] = useState("a");
  const [dataInOut, setDataInOut] = useState(null);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((x) => setDataInOut(x[dataIn].name));
  }, [dataIn]);

  // Check fetching data from different files
  const [chartData, setChartData] = useState("/api/exampleBarData1");
  const [chartDataOut, setChartDataOut] = useState(null);

  useEffect(() => {
    fetch(`${chartData}`)
      .then((res) => res.json())
      .then((chartDataOut) => setChartDataOut(chartDataOut));
  }, [chartData]);

  return (
    <div className="experiment">
      <h2> Check data fetching from different keys inside single JSON (single API endpoint)</h2>
      <button onClick={() => setDataIn("a")}>a</button>
      <button onClick={() => setDataIn("b")}>b</button>
      <p>{!dataInOut ? "Loading..." : dataInOut}</p>
      <h2> Check data fetching from different files (multiple API endpoints)</h2>
      <button onClick={() => setChartData("/api/exampleBarData1")}>
        chart data 1
      </button>
      <button onClick={() => setChartData("/api/exampleBarData2")}>
        chart data 2
      </button>
      <div className="bar chart">
        {!chartDataOut ? "Loading..." : <Bar data={chartDataOut} />}
      </div>
    </div>
  );
}

export default DataLoad;
