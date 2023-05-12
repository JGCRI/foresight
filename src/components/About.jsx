import React from "react";
import { Container, Row } from "react-bootstrap";

function About() {
  return (
    <div className="body-page about-page">
      <Container>
        <Row>
          <h1 className="page-title">About Foresight</h1>
          <hr className="home-hr" />
          <div className="page-subtitle">
            Foresight is a community dashboard that curates key insights from the Joint Global Change Research Institute <a href="https://www.pnnl.gov/projects/jgcri" target="_blank" rel="noreferrer">(JGCRI)</a>
          </div>
        </Row>
        <hr className="home-hr lower-hr" />
        <Row>
            <div className="page-text">
              As scientific models continue to grow in complexity and the amount of detail they capture, so too does the size and complexity of their data outputs. Managing the overwhelming amounts of data and curating it into key insights and messages is a big responsibility for any scientific team. Foresight is an online community platform to visualize and interact with data outputs from the <a href="https://gcims.pnnl.gov/global-change-intersectoral-modeling-system" target="_blank" rel="noreferrer">Global Change Intersectoral Modeling System (GCIMS)</a>. Development of Foresight is a continuous process with regular feedback solicited from the community to improve its features. With Foresight, our team is addressing the challenges of managing data storage, selecting and curating key visualizations, as well as trying to strike a balance between providing simplified digestible results while still ensuring transparency and access to reproducible data and workflows.
            </div>
        </Row>
      </Container>
    </div>
  );
}

export default About;
