import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/dashboarddate.css';

export default function DashboardDate({year}) {
    const [startDate, setStartDate] = useState(new Date().setFullYear(year));
    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showYearPicker
            dateFormat="yyyy"
        />
    );
}
