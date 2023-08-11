import React from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
  ReactCompareSliderImage,
} from "react-compare-slider";

function Imageslider({ firstImage, secondImage, href, linkText }) {
  return (
    <div className="slider">
      <div className="slider-container">
        <div className="image-container">
          <ReactCompareSlider
            handle={<ReactCompareSliderHandle />}
            itemOne={<ReactCompareSliderImage src={firstImage} alt="First Image" />}
            itemTwo={<ReactCompareSliderImage src={secondImage} alt="Second Image" />}
            style={{
              height: '100%',
              width: '100%'
            }}
          />
          <div className="image-citation">
            Images from{" "}
            <a href={href} target="_blank" rel="noreferrer">
              {linkText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Imageslider;
