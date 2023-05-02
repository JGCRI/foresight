import React from "react";
import { Container, Row } from "react-bootstrap";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

const FIRST_IMAGE = {
  imageUrl:
    "https://eoimages.gsfc.nasa.gov/images/imagerecords/90000/90062/trinity_oli_2015119_lrg.jpg",
};
const SECOND_IMAGE = {
  imageUrl:
    "https://eoimages.gsfc.nasa.gov/images/imagerecords/90000/90062/trinity_oli_2017092_lrg.jpg",
};

function Explore() {

  return (
    <div className="explore">
      <div className="slider">
        <Container fluid>
          <Row>
            <ReactBeforeSliderComponent
              firstImage={FIRST_IMAGE}
              secondImage={SECOND_IMAGE}
            />
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Explore;
