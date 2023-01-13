import React from "react";
import { Container } from "react-bootstrap";
import MyChart from "./charts/Bar";
import * as d3 from "d3";
import { useState, useEffect } from "react";
import RiverInformation from "../prepData/prepData1";

function Experiment() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //Use.Effect is calling the data
  useEffect(() => {
    d3.json("foresight/chart-data.json").then((d) => {
      setData(d);
      setLoading(false);
    });
    return () => undefined;
  }, []);

  const [river, setRiver] = useState("nile");

  return (
    <div className="experiment">
      <Container fluid>
        {loading && <div>loading</div>}
        {!loading && <MyChart data={data} />}
      </Container>

      <div>
      <h1>World's Longest Rivers</h1>
      <button onClick={() => setRiver("nile")}>Nile</button>
      <button onClick={() => setRiver('amazon')}>Amazon</button>
      <button onClick={() => setRiver('yangtze')}>Yangtze</button>
      <button onClick={() => setRiver('mississippi')}>Mississippi</button>
      <RiverInformation name={river} />
      </div>

    </div>
  );
}

export default Experiment;
