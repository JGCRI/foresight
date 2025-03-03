import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaChalkboard } from "react-icons/fa";
import "./css/Tutorial.css";

const steps = [
  {
    intro: true,
    message:
      "Welcome to the Foresight Dashboard! This guide will walk you through the key parts of the dashboard. Click Next to begin.",
  },
  {
    targetId: "dataset-dropdown",
    message: "The currently selected dataset can be toggled from the datasets dropdown. Foresight by default loads data from GCAM version 7.0.",
  },
  {
    targetId: "dashboard-guagebar",
    message: "The dashboard will load its default parameters selected from a variety of datatypes across energy, land, and water.",
  },
  {
    targetId: "guage-row-open",
    message: "The currently selected parameter will be highlighted. Each pair of guages represents the change in the parameter between a start and end date for the two selected scenarios.",
  },
  {
    targetId: "date-dropdown-bar",
    message: "This range of years can be selected by using the bar at the top of the dashboard.",
  },
  {
    targetId: "date-dropdown-start",
    message: "Clicking this menu selects the start date for the gauges.",
  },
  {
    targetId: "date-dropdown-end",
    message: "Clicking this menu selects the end date for the gauges.",
  },
  {
    targetId: "scenario-selector",
    message: "Clicking these dropdowns controls which scenario is currently being used for each row of parameters.",
  },
  {
    targetId: "dashboard-guagebar",
    message: "To add/remove parameters from the guage bar or to add parameters currently not shown on the bar, click the dropdown on the right end of the guage bar.",
  },
  {
    targetId: "dashboard-guagebar",
    message: "To change the parameter, click on the parameter you would like to select from the guage bar.",
  },
  {
    targetId: "guage-selector-dropdown",
    message: "This can also be changed from this dropdown in the dashboard info-bar.",
  },
  {
    targetId: "parameter-visualizations",
    message: "The dashboard includes three visualizations at different aggregation levels displaying the currently selected parameter between the currently selected scenarios.",
  },
  {
    targetId: "graph-line",
    message: "The line chart compares the values of the parameter over time with a default aggregation between all regions and subcategories.",
  },
  {
    targetId: "graph-line",
    message: "Clicking a point will change the selected year. Only one year can be selected at a time and the other visualizations will only show data for that year.",
  },
  {
    targetId: "graph-choropleth",
    message: "The choropleth compares data from the selected parameter at a regional level between the two scenarios. The map is fully interactive and can be zoomed and slided.",
  },
  {
    targetId: "graph-choropleth",
    message: "Clicking on a region changes the selected region. The line chart will then only show data from that region.",
  },
  {
    targetId: "graph-choropleth-settings",
    message: "To change the scale and color settings for the choropleth, click the settings dropdown.",
  },
  {
    targetId: "graph-bar",
    message: "The bar chart compares by default the top 10 regions between the two scenarios and the global totals at the bottom.",
  },
  {
    targetId: "graph-bar",
    message: "Clicking a subcategory in the top countries will change the selected subcategory and region.",
  },
  {
    targetId: "graph-bar",
    message: "Clicking a subcategory in the global totals will change the selected subcategory. The line and choropleth will only show data from this subcategory.",
  },
  {
    targetId: "graph-bar-settings",
    message: "To change which regions are compared, click the settings dropdown.",
  },
  {
    targetId: "floater-change-selection",
    message: "To change the selected date, region, or subcategory manually, you can use these dropdowns.",
  },
  {
    targetId: "floater-change-reset",
    message: "To reset the selected date, region, or subcategory manually, you can press this button.",
  },
  {
    targetId: "guage-selector-dropdown",
    message: "The currently selected data can be downloaded by clicking the download button. Depending on the size of the dataset it can take up to 30 seconds.",
  },
  {
    intro: true,
    message:
      "Thank you for using Foresight! If you encounter any issues or questions, please reach out to the Foresight team. More information can be found at the help icon on the top right of the screen.",
  },
];

const TutorialOverlay = ({ step, onNext, onPrev, onExit }) => {
  const currentStep = steps[step];
  const [targetRect, setTargetRect] = useState(null);

  useEffect(() => {
    if (!currentStep.intro) {
      const checkElement = () => {
        const element = document.getElementById(currentStep.targetId);
        if (element) {
          // Scroll the element into view first.
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          // Wait until the scroll is likely finished before getting the position.
          setTimeout(() => {
            setTargetRect(element.getBoundingClientRect());
          }, 300);
        } else {
          setTimeout(checkElement, 500);
        }
      };
      checkElement();
    } else {
      // For the intro step, no target element is used.
      setTargetRect(null);
    }
  }, [currentStep]);

  if (currentStep.intro) {
    return (
      <>
        <div
          className="tutorial-mask"
          style={{ top: 0, left: 0, width: "100%", height: "100%" }}
        />
        <div className="tutorial-message intro-message">
          <p>{currentStep.message}</p>
          <div className="tutorial-controls">
            <Button variant="primary" onClick={onNext}>
              Next
            </Button>
            <Button variant="danger" onClick={onExit}>
              Exit
            </Button>
          </div>
        </div>
      </>
    );
  }

  // If the element's position is not determined yet, do not render the overlay.
  if (!targetRect) return null;

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  return (
    <>
      {/* Masks placed around the target element */}
      <div
        className="tutorial-mask"
        style={{ top: 0, left: 0, width: "100%", height: targetRect.top }}
      />
      <div
        className="tutorial-mask"
        style={{
          top: targetRect.top,
          left: 0,
          width: targetRect.left,
          height: targetRect.height,
        }}
      />
      <div
        className="tutorial-mask"
        style={{
          top: targetRect.top,
          left: targetRect.right,
          width: screenWidth - targetRect.right,
          height: targetRect.height,
        }}
      />
      <div
        className="tutorial-mask"
        style={{
          top: targetRect.bottom,
          left: 0,
          width: "100%",
          height: screenHeight - targetRect.bottom,
        }}
      />
      {/* Tutorial message box positioned relative to the target */}
      <div
        className="tutorial-message"
        style={{ top: targetRect.bottom + 10, left: targetRect.left }}
      >
        <p>{currentStep.message}</p>
        <div className="tutorial-controls">
          {step > 0 && (
            <Button variant="secondary" onClick={onPrev}>
              Previous
            </Button>
          )}
          <Button variant="primary" onClick={onNext}>
            {step === steps.length - 1 ? "Finish" : "Next"}
          </Button>
          <Button variant="danger" onClick={onExit}>
            Exit
          </Button>
        </div>
      </div>
    </>
  );
};

const DashboardTutorial = () => {
  const [tutorialActive, setTutorialActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const startTutorial = () => {
    console.log("Starting tutorial!");
    setTutorialActive(true);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep === steps.length - 1) {
      setTutorialActive(false);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const exitTutorial = () => {
    setTutorialActive(false);
  };

  // Prevent scrolling while the tutorial is active.
  useEffect(() => {
    document.body.style.overflow = tutorialActive ? "hidden" : "auto";
  }, [tutorialActive]);

  return (
    <>
      <Button
        variant="outline-light"
        className="tutorial-button"
        onClick={startTutorial}
      >
        <FaChalkboard /> Tutorial
      </Button>

      {tutorialActive && (
        <TutorialOverlay
          step={currentStep}
          onNext={nextStep}
          onPrev={prevStep}
          onExit={exitTutorial}
        />
      )}
    </>
  );
};

export default DashboardTutorial;
