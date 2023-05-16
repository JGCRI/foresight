import React from "react";
import { Container, Row } from "react-bootstrap";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
  ReactCompareSliderImage,
} from "react-compare-slider";
import first_img from "../assets/img/rice_oli_2021247_lrg.jpg";
import second_img from "../assets/img/rice_oli_2022259_lrg.jpg";

function Experiment() {
  return (
    <div className="body-page experiment">
      <Container fluid>
        <Row className="justify-content-center">
          <div className="slider">
            <div className="slider-container">
              <div className="image-container">
                <ReactCompareSlider
                  handle={<ReactCompareSliderHandle />}
                  itemOne={<ReactCompareSliderImage src={first_img} alt="First Image" />}
                  itemTwo={<ReactCompareSliderImage src={second_img} alt="Second Image" />}
                />
                <div className="image-citation">Images from <a href="https://earthobservatory.nasa.gov/images/150412/a-rough-year-for-rice-in-california" target="_blank" rel="noreferrer">NASA</a></div>
            </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Experiment;
