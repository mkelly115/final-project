import ProfileForm from "../components/ProfileForm/ProfileForm.jsx";
import { Grid, Typography } from "@mui/material";

export default function Profile() {
  return (
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="space-around">
        <Grid item sx={{ py: 2 }}>
          <Typography variant="h2" align="center" gutterBottom>
            Profile Settings
          </Typography>
        </Grid>
        <Grid item sx={{ py: 2 }}>
          <ProfileForm />
        </Grid>
      </Grid>
  );
}
