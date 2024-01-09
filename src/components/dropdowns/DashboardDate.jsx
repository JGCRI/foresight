import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import { setStartDate, setEndDate } from "../Store";
import { connect } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/DashboardDate.css';
import { isValidDate } from "../../assets/data/DataManager";

function DashboardDate({ year, isOrNotStart, updateStart, updateEnd, start, end, dataRegSub }) {
    const [startDate, setStartDate] = useState(new Date().setFullYear(year));
    const isStart = isOrNotStart
    function dateHandler(date, isStart) {
        setStartDate(date);
        var selectedYear = 1;
        if(date != null)
            selectedYear = date.getFullYear();
        if (isStart == 0) {
            updateStart(selectedYear);
        }
        else {
            updateEnd(selectedYear);
        }
    }

    function getYear(isStart) {
        if (isStart == 0)
            return new Date().setFullYear(start);
        return new Date().setFullYear(end);
    }

    const getBounds = (date) => {
        var selectedYear = 1;
        if(date != null)
            selectedYear = date.getFullYear();
        if (isStart == 0)
            return selectedYear < end && selectedYear > 0 && isValidDate(dataRegSub, selectedYear);
        return selectedYear > start && selectedYear > 0 && isValidDate(dataRegSub, selectedYear);
    }

    return (
        <DatePicker
            selected={getYear(isStart)}
            onChange={(date) => dateHandler(date, isStart)}
            showYearPicker
            dateFormat="yyyy"
            filterDate={getBounds}
        />
    );
}

function mapStateToProps(state) {
    return {
        start: state.startDate,
        end: state.endDate,
        dataRegSub: state.parsedDataRegSub,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateStart: (start) => dispatch(setStartDate(start)),
        updateEnd: (end) => dispatch(setEndDate(end)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardDate);
