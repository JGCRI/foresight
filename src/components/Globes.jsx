import React from "react";
import ImageGallery from "react-image-gallery";
import mapLandmarkThumbnail from "../assets/img/icon_map_landmark.svg";
import mapChoroplethThumbnail from "../assets/img/icon_map_choropleth.svg";
import SidebarExperiment from "./SidebarExperiment.jsx";
import { connect } from "react-redux";
import MapPoint from "./maps/MapPoint";
import MapChoropleth from "./maps/MapChoropleth";
import World from "./globes/World";

/* Import example Data */
import countryData from "./maps/data/countryData.js"
import usstateData from "./maps/data/uststateData.js"

function Globes({ open, toggleOpen }) {
  const images = [
    {
      originalClass: "globe-container-experiment", // Add custom CSS class to the slide container
      renderItem: () => (
        <div>
          <World />
        </div>
      ),
      thumbnail: mapLandmarkThumbnail,
    },
    {
      originalClass: "chart-container-experiment", // Add custom CSS class to the slide container
      renderItem: () => (
        <div>
          <MapChoropleth width={"100vw"} height={"50vh"} data={usstateData} />
        </div>
      ),
      thumbnail: mapChoroplethThumbnail,
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

export default connect(mapStateToProps, mapDispatchToProps)(Globes);
