import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/DashboardDate.css';

export default function DashboardDate({year}) {
    const [startDate, setStartDate] = useState(new Date().setFullYear(year));
    return (
        <DatePicker
            wrapperClassName="datePicker"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showYearPicker
            dateFormat="yyyy"
        />
    );
}
