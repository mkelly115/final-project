import MyTasks from "../components/MyTasks/MyTasks";
import { Grid } from "@mui/material";

export default function MyTask() {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="space-around"
    >
      <Grid item sx={{ py: 2 }}>
        <h1>My Tasks</h1>
        <MyTasks />
      </Grid>
    </Grid>
  );
}
