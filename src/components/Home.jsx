import React, { useState, useEffect } from "react";
import Globe from "react-globe.gl";

const N = 50;
const arcsData = [...Array(N).keys()].map(() => ({
  startLat: (Math.random() - 0.5) * 180,
  startLng: (Math.random() - 0.5) * 360,
  endLat: (Math.random() - 0.5) * 180,
  endLng: (Math.random() - 0.5) * 360,
  color: [
    ["#B43632", "#EEB649", "#CCD556"][Math.round(Math.random() * 3)],
    ["#B43632", "#EEB649", "#CCD556"][Math.round(Math.random() * 3)],
  ],
}));

// Set window dimensions //
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  
  let adjustedWidth = width;
  let adjustedHeight = height;
  
  if (width > 900) {
    // Adjust for large screens
    adjustedWidth *= 2;
    adjustedHeight *= 2;
  } else {
    // Adjust for small screens
    adjustedWidth *= 1.1;
    adjustedHeight *= 1.1;
  }
  
  return {
    width: adjustedWidth,
    height: adjustedHeight
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function Home() {
  const globeElement = React.useRef();
  const { height, width } = useWindowDimensions();

  React.useEffect(() => {
    // Auto-rotate
    globeElement.current.controls().autoRotate = true;
    globeElement.current.controls().autoRotateSpeed = 0.2;
    globeElement.current.controls().enableZoom = false;
    globeElement.current.controls().enabled = true;
    globeElement.current.controls().enableRotate = true;
  }, []);

  return (
    <div className="home">
      <div className="home-globe">
        <Globe
          width={width}
          height={height}
          waitForGlobeReady={false}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          arcAltitude={0.2}
          arcsData={arcsData}
          arcColor={"color"}
          arcDashLength={() => Math.random()}
          arcDashGap={() => Math.random()}
          arcStroke={0.2}
          animateIn={false}
          arcDashAnimateTime={() => Math.random() * 4000 + 5000}
          ref={globeElement}
          enablePointerInteraction={true}
          backgroundColor={"rgba(0,0,0,0)"} // transparent background
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        />
      </div>
      <div className="home-title">Foresight
      <div className="home-subtitle">Global Change Analytics</div>
      </div>
      
    </div>
  );
}

export default Home;