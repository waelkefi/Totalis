// Layout.jsx
import React, { useState } from "react";
import dayjs from "dayjs";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import YearSelector from "./Year";
import MonthSelector from "./Month";
import WeekSelector from "./weeks";
import DayView from "./Day";
import DayViewWithTasks from "./DayWithTasks";

function LayoutPlan1() {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const myEvents = [];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container direction="row">

                <Grid item xs={12} md={3}>
                    {/* Vue du jour avec affichage des heures */}
                    <DayView
                        date={selectedDate}
                        onDateChange={setSelectedDate}
                        events={myEvents}
                    />
                </Grid>
                <Grid item xs={12} md={3} sx={{pl:0 , pt: 0}}>
                    {/* Sélecteur de semaine */}
                    <WeekSelector date={selectedDate} onDateChange={setSelectedDate} />
                </Grid>
                <Grid item xs={12} md={3}>
                    {/* Sélecteur de mois */}
                    <MonthSelector date={selectedDate} onDateChange={setSelectedDate} />
                </Grid>

                <Grid item xs={12} md={3}>
                    {/* Sélecteur d'année */}
                    <YearSelector date={selectedDate} onDateChange={setSelectedDate} />
                </Grid>

            </Grid>
        </Container>
    );
}

export default LayoutPlan1;
