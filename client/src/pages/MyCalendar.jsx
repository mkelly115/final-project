import TeamCalendar from "../components/Calendar/calendar"
import { Grid } from "@mui/material"

export default function MyCalendar() {

    return (
        <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="space-around"
        >
            <Grid item sx={{ py: 2 }}>
                <h1>My Calendar</h1>
                <TeamCalendar />
            </Grid>
        </Grid>
    );
}