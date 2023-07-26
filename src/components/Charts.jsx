import React from "react";
import ImageGallery from "react-image-gallery";
import Imageslider from "./charts/Imageslider";
import first_img from "../assets/img/rice_oli_2021247_lrg.jpg";
import second_img from "../assets/img/rice_oli_2022259_lrg.jpg";
import Chord from "./charts/Chord";
import Sankey from "./charts/Sankey";
import chordThumbnail from "../assets/img/icon_chord.svg";
import sankeyThumbnail from "../assets/img/icon_sankey.svg";
import sliderThumbnail from "../assets/img/icon_slider.svg";
import gaugeThumbnail from "../assets/img/icon_chart_gauge.svg";
import SidebarExperiment from "./SidebarExperiment.jsx";
import CustomGauge from "./charts/CustomGauge.jsx";
import { connect } from "react-redux";

function Charts({ open, toggleOpen }) {
  const images = [
    {
      originalClass: "chart-container-experiment", // Add custom CSS class to the slide container
      renderItem: () => (
        <div>
          <Chord width={"50vw"} height={"50vh"} />
        </div>
      ),
      thumbnail: chordThumbnail,
    },
    {
      originalClass: "chart-container-experiment",
      renderItem: () => (
        <Imageslider
          firstImage={first_img}
          secondImage={second_img}
          href="https://earthobservatory.nasa.gov/images/150412/a-rough-year-for-rice-in-california"
          linkText="NASA"
        />
      ),
      thumbnail: sliderThumbnail,
    },
    {
      originalClass: "chart-container-experiment", // Add custom CSS class to the slide container
      renderItem: () => (
        <div>
          <Sankey width={"60vw"} height={"50vh"} />
        </div>
      ),
      thumbnail: sankeyThumbnail,
    },
    {
      originalClass: "chart-container-experiment", // Add custom CSS class to the slide container
      renderItem: () => (
        <div>
          <CustomGauge height={"50vh"} value={-30}/>
        </div>
      ),
      thumbnail: gaugeThumbnail,
    },
  ];

  const galleryOptions = {
    showThumbnails: true, // Hide thumbnail images
    thumbnailPosition: "top", // Display thumbnails on top
    showFullscreenButton: true, // Show the fullscreen button
    useBrowserFullscreen: true, // Enable fullscreen mode using the browser's built-in functionality
    autoPlay: false, // Enable automatic slideshow
    slideInterval: 2000, // Set the interval between slides (in milliseconds)
    showNav: false, // Hide the navigation arrows
    showBullets: true, // Show bullet navigation
    disableSwipe: false, // Disable swipe gestures
    slideOnThumbnailHover: true, // Switch slides on thumbnail hover
    startIndex: 0, // Set the initial slide index
    additionalClass: "image-gallery-experiment", // Add custom CSS class to the gallery container
    // More options can be found in the documentation
  };

  return (
    <div className="body-page">
      <SidebarExperiment />
      <div className={open ? "dashboard" : "dashboardClosed"}>
        <ImageGallery items={images} {...galleryOptions} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
