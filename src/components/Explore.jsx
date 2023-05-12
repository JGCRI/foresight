import React from "react";
import { Container, Row } from "react-bootstrap";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import first_img from "../assets/img/rice_oli_2021247_lrg.jpg";
import second_img from "../assets/img/rice_oli_2022259_lrg.jpg";

function Explore() {
  const FIRST_IMAGE = {
    imageUrl: first_img,
  };

  const SECOND_IMAGE = {
    imageUrl: second_img,
  };

  return (
    <div className="body-page explore">
      <Container fluid>
        <Row className="justify-content-center">
          <div className="slider">
              <ReactBeforeSliderComponent
                firstImage={FIRST_IMAGE}
                secondImage={SECOND_IMAGE}
              />
              <div className="image-citation">Images from <a href="https://earthobservatory.nasa.gov/images/150412/a-rough-year-for-rice-in-california" target="_blank" rel="noreferrer">NASA</a></div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Explore;
