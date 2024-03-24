import MyProjectList from "../components/MyProject/MyProjectList";
import { Grid } from "@mui/material";

export default function MyProject() {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="space-around"
    >
      <Grid item sx={{ py: 2 }}>
        <h1>My Projects</h1>
        <MyProjectList />
      </Grid>
    </Grid>
  );
}
