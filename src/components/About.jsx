import { React, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import GlobeAbove from '../assets/img/globe_above.jpg'
import CroplandAbove from '../assets/img/cropland_above.jpg'
import MountainsAbove from '../assets/img/mountains_above.jpg'
import './css/About.css';

const scrollHandler = (event) => {
  let background = document.querySelector('.about-page');
  let about1 = document.querySelector('.about-page-text');
  let crop_fade = document.querySelector('.fade-in-text');
  let x = background.scrollTop;
  let y = window.scrollY + about1.getBoundingClientRect().bottom;
  console.log(y);
  if (y > 530) {
    background.style.backgroundSize = '' + (100 + x / 10) + '%';
  }
  if (y <= 100 && y > -500) {
    background.style.backgroundSize = '' + ((5100 - y) / 50) + '%';
  }
  if (y < 250 && background.style.backgroundPositionY !== '0px' ) {
    background.style.backgroundImage = "url(" + CroplandAbove + ")";
    background.style.backgroundColor = 'rgb(91, 143, 94, 1)';
    background.style.backgroundPositionY = '0px';
    background.style.backgroundSize = '100%';
    about1.style.opacity = '0';
    crop_fade.style.opacity = '1';
  }
  if (y > 249 && background.style.backgroundPositionY === '0px') {
    background.style.backgroundColor = 'rgb(0, 0, 0, 1)';
    background.style.backgroundPositionY = '225px';
    background.style.backgroundSize = '' + (100 + x / 10) + '%';
    background.style.backgroundImage = 'url(' + GlobeAbove + ')';
    about1.style.opacity = '1';
    crop_fade.style.opacity = '0';
  }
  if (y < -500 && background.style.backgroundPositionY !== '2px' ) {
    background.style.backgroundImage = "url(" + MountainsAbove + ")";
    background.style.backgroundColor = 'rgb(91, 143, 94, 1)';
    background.style.backgroundPositionY = '2px';
    crop_fade.style.opacity = '0';
  }
  if (y > -499 && background.style.backgroundPositionY === '2px' ) {
    background.style.backgroundImage = "url(" + CroplandAbove + ")";
    background.style.backgroundColor = 'rgb(142, 169, 198, 1)';
    background.style.backgroundPositionY = '0px';
    crop_fade.style.opacity = '1';
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
            Foresight is a community dashboard that curates key insights from the Joint Global Change Research Institute <a href="https://www.pnnl.gov/projects/jgcri" target="_blank" rel="noreferrer">(JGCRI)</a>
          </div>
        </Row>
        <hr className="about-home-hr  lower-hr" />
        <Row className="justify-content-between">
          <div className="about-page-text">
            As scientific models continue to grow in complexity and the amount of detail they capture, so too does the size and complexity of their data outputs. Managing the overwhelming amounts of data and curating it into key insights and messages is a big responsibility for any scientific team. Foresight is an online community platform to visualize and interact with data outputs from the <a href="https://gcims.pnnl.gov/global-change-intersectoral-modeling-system" target="_blank" rel="noreferrer">Global Change Intersectoral Modeling System (GCIMS)</a>. 
          </div>
          <div className="fade-in-text">
            User-Focused Design 
          </div>
          <div className="page-text-green">
            Development of Foresight is a continuous process with regular feedback solicited from the community to improve its features. With Foresight, our team is addressing the challenges of managing data storage, selecting and curating key visualizations, as well as trying to strike a balance between providing simplified digestible results while still ensuring transparency and access to reproducible data and workflows.
          </div>
        </Row>
        <Row className="justify-content-between">
          <hr className="section-break-hr" />
          <h2 className="page-section-break">Design Philosophy</h2>
          <hr className="lower-section-break-hr" />
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
              Community
            </h3>

          </div>
          <div>
            <hr className="about-home-hr" />
            <h3 className="about-grid-title">
              Gold Standard of Visualization
            </h3>

          </div>
          <div>
            <hr className="about-home-hr" />
            <h3 className="about-grid-title">
              AI data insights
            </h3>

          </div>
        </Row>
        <Row className="about-grid">
          <div className="about-grid-text">
            We will have a landing page for each dataset/paper with key highlights but then behind that will be the full suite of insights across our tools of water, energy, land etc. This way we always benefit from our truly harmonized, integrated system.
          </div>
          <div className="about-grid-text">
            Each figure/page will be shareable (twitter, facebook, linkedin) and will allow community feedback, likes, and comments. This will let us improve our figures and gauge what works and doesn't.
          </div>
          <div className="about-grid-text">
            Each figure is going to be a separate component and we will make sure each figure is the best in class out there. We will achieve this by building appropriate, simple/minimalistic, interactive figures that get the point across (Chord diagrams, sankeys, waterfall charts, maps with flows and globes). That title is something that will have to be earned but we will aim for this.
          </div>
          <div className="about-grid-text">
            We will use Artificial Intelligence to simplify searching for data, and to assist in generating new analysis.
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