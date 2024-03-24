import ProfileForm from "../components/ProfileForm/ProfileForm.jsx";
import { Grid } from "@mui/material";

export default function Profile() {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="space-around"
    >
      <Grid item sx={{ py: 2 }}>
        <h1>Profile Settings</h1>
      </Grid>
      <Grid item sx={{ py: 2 }}>
        <ProfileForm />
      </Grid>
    </Grid>
  );
}
