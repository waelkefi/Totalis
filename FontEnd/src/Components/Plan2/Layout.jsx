import React, { useState } from "react";
import dayjs from "dayjs";
import YearSelector from './Year'
import MonthSelector from "./Month";
import DaysView from "./Days";
import DayView from "./Day";
import MainLayout from "../MainLayout";

function LayoutPlan2() {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const myEvents = [];
    return (
        <MainLayout>
            <div className="container-fluid p-2">
                <div className="row">
                    <div className="col-md-4">
                        <YearSelector date={selectedDate} onDateChange={setSelectedDate} />
                    </div>
                    <div className="col-md-8">
                        <MonthSelector date={selectedDate} onDateChange={setSelectedDate} />
                    </div>
                    <div className="col-md-12">
                        <DaysView date={selectedDate} onDateChange={setSelectedDate} />
                    </div>
                    <div className="col-md-6">
                        <DayView date={selectedDate} onDateChange={setSelectedDate} />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default LayoutPlan2