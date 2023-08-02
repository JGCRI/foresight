import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import { setStartDate, setEndDate } from "../Store";
import { connect } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/DashboardDate.css';

function DashboardDate({ year, isOrNotStart, updateStart, updateEnd, start, end }) {
    const [startDate, setStartDate] = useState(new Date().setFullYear(year));
    const isStart = isOrNotStart
    function dateHandler(date, isStart) {
        setStartDate(date);
        if (isStart == 0) {
            console.log(start);
            updateStart(date.getFullYear());
        }
        else {
            console.log(end);
            updateEnd(date.getFullYear());
        }
    }

    function getYear(isStart) {
        if (isStart == 0)
            return new Date().setFullYear(start);
        return new Date().setFullYear(end);
    }
    return (
        <DatePicker
            selected={getYear(isStart)}
            onChange={(date) => dateHandler(date, isStart)}
            showYearPicker
            dateFormat="yyyy"
        />
    );
}

function mapStateToProps(state) {
    return {
        start: state.start_date,
        end: state.end_date,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateStart: (start) => dispatch(setStartDate(start)),
        updateEnd: (end) => dispatch(setEndDate(end)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardDate);
