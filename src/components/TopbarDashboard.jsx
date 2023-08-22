import { setdashboardSelection } from "./Store";
import { connect } from "react-redux";
import Button from 'react-bootstrap/Button';

function TopbarDashboard({selection, openGuages, updateCurrentGuage }) {
  return (
    <div className="scenerio-dropdown">
      {openGuages.map((gauge, index) => (
          <Button
            variant={gauge.title === selection ? "secondary" : "dark"}
            disabled={gauge.title === selection ? true : false}
            onClick={() => updateCurrentGuage(gauge.title)}
            className = { "w-100" }
          >
            {gauge.title}
          </Button>
      ))}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    selection: state.dashboardSelection,
    openGuages: state.guages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateCurrentGuage: (guage) => dispatch(setdashboardSelection(guage))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopbarDashboard);