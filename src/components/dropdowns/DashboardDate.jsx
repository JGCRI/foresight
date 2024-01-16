import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import { setStartDate, setEndDate } from "../Store";
import { connect } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/DashboardDate.css';
import { isValidDate, getFirstDate, getLastDate } from "../../assets/data/DataManager";

function DashboardDate({ year, isOrNotStart, updateStart, updateEnd, start, end, dataRegSub }) {
    const [startDate, setStartDate] = useState(new Date().setFullYear(year));
    const isStart = isOrNotStart
    function dateHandler(date, isStart) {
        date = checkStartDate(date, isStart);
        setStartDate(date);
        var selectedYear = 1;
        if(date != null)
            selectedYear = date.getFullYear();
        if (isStart === 0) {
            updateStart(selectedYear);
        }
        else {
            updateEnd(selectedYear);
        }
    }

    function getYear(isStart) {
        let tempDate = new Date().setFullYear(end);
        if (isStart === 0)
            tempDate = new Date().setFullYear(start);
        return tempDate;
    }

    const getBounds = (date) => {
        var selectedYear = 1;
        if(date != null)
            selectedYear = date.getFullYear();
        if (isStart === 0)
            return selectedYear < end && selectedYear > 0 && isValidDate(dataRegSub, selectedYear);
        return selectedYear > start && selectedYear > 0 && isValidDate(dataRegSub, selectedYear);
    }

    const checkStartDate = (date, isStart) => {
        if(!isValidDate(dataRegSub, date.getFullYear())) {
            if(isStart)
                return getFirstDate(dataRegSub);
            return getLastDate(dataRegSub);
        }
        return date;
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
