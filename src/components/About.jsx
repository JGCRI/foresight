import { React } from "react";
import { Container, Row } from "react-bootstrap";
import './css/About.css';

const scrollHandler = (event) => {
  let background = document.querySelector('.about-page');
  let about1 = document.querySelector('.about-grid');
  let bottom_margin = document.querySelector('.small-home-hr');
  let x = background.scrollTop;
  let y = window.scrollY + about1.getBoundingClientRect().bottom;
  if(bottom_margin.style.marginBottom === '0px') {
    bottom_margin.style.marginBottom = "" + window.outerHeight/2 + 'px';
  }
  if (y > 530) {
    background.style.backgroundSize = '' + (100 + x / 10) + '%';
  }
};

function About() {
  return (
    <div className="body-page about-page " onScroll={scrollHandler}>
      <Container>
        <Row className="justify-content-between">
          <h1 className="about-title">About Foresight</h1>
          <hr className="about-home-hr" />
          <div className="about-page-subtitle">
          Foresight is a community dashboard to share complex science through simplified, interactive visualizations
          </div>
        </Row>
        <hr className="about-home-hr  lower-hr" />
        <Row className="justify-content-between">
          <hr className="about-section-break-hr" />
          <h2 className="page-section-break">Design Philosophy</h2>
          <hr className="about-lower-section-break-hr" />
        </Row>
        <Row className="about-grid">
          <div>
            <hr className="about-home-hr" />
            <h3 className="about-grid-title">
              Single Point of Access
            </h3>

          </div>
          <div>
            <hr className="about-home-hr" />
            <h3 className="about-grid-title">
              Community: Share and engage! 
            </h3>

          </div>
          <div>
            <hr className="about-home-hr" />
            <h3 className="about-grid-title">
              Visual Excellence
            </h3>

          </div>
          <div>
            <hr className="about-home-hr" />
            <h3 className="about-grid-title">
              AI-Driven Insights
            </h3>

          </div>
        </Row>
        <Row className="about-grid">
          <div className="about-grid-text">
            Access key highlights on intial landing pages, then dive deeper into insights across water, energy, land, and many other systems leveraging the power of our integrated suite of tools
          </div>
          <div className="about-grid-text">
            All figures are shareable across platforms, inviting feedback and comments from the community to drive continuous improvement.
          </div>
          <div className="about-grid-text">
            We strive to make each figure stand out as the best in class, featuring interactive, minimalistic, and powerful designs customized for to convey each insight most effectively
          </div>
          <div className="about-grid-text">
            Leverage AI-driven interactions to "talk" to our datasets and extract personalized insights and generate customize graphics.
          </div>
        </Row>
        <Row className="about-grid">
          <div className="small-home-hr" />
          <div className="small-home-hr" />
          <div className="small-home-hr" />
          <div className="small-home-hr" />
        </Row>
      </Container>
    </div>

  );

}
export default About;