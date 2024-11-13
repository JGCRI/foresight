import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import { setStartDate, setEndDate } from "../Store";
import { connect } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/DashboardDate.css';
import { isValidDate, getFirstDate, getLastDate } from "../../assets/data/DataManager";
import { updateHash } from "../sharing/DashboardUrl";

function DashboardDate({ year, isOrNotStart, updateStart, updateEnd, start, end, data }) {
    const [startDate, setStartDate] = useState(new Date().setFullYear(year));
    const isStart = isOrNotStart
    function dateHandler(date, isStart) {
        date = checkStartDate(date, isStart);
        setStartDate(date);
        var selectedYear = 1;
        if (date != null)
            selectedYear = date.getFullYear();
        if (isStart === 0) {
            updateHash("start", selectedYear);
            updateStart(selectedYear);
        }
        else {
            updateHash("end", selectedYear);
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
        if (date != null)
            selectedYear = date.getFullYear();
        if (isStart === 0)
            return selectedYear < end && selectedYear > 0 && isValidDate(data, selectedYear);
        return selectedYear > start && selectedYear > 0 && isValidDate(data, selectedYear);
    }

    const checkStartDate = (date, isStart) => {
        if (!isValidDate(data, date.getFullYear())) {
            if (isStart)
                return getFirstDate(data);
            return getLastDate(data);
        }
        return date;
    }
    return (
        (data === "i" || data.length === 0) ? (
            <div> "Loading..." </div>
        ) : (
            <DatePicker
                selected={getYear(isStart)}
                onChange={(date) => dateHandler(date, isStart)}
                showYearPicker
                dateFormat="yyyy"
                filterDate={getBounds}
            />
        )
    );
}

function mapStateToProps(state) {
    return {
        start: state.startDate,
        end: state.endDate,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateStart: (start) => dispatch(setStartDate(start)),
        updateEnd: (end) => dispatch(setEndDate(end)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardDate);
