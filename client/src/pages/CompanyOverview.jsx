import ProjectForm from "../components/ProjectForm/ProjectForm";
import ProjectList from "../components/ProjectsList/projectsList";
import { useState } from "react";
import { Button, Grid } from "@mui/material";

const styles = {
  buttonStyle: {
    background: '#e4442b',
    margin: '1.5rem',
    padding: '.5rem'
  },
};

export default function CompanyOverview() {
    const [open, setOpen] = useState(false);

    const handleOpenModal = () => {
      setOpen(true);
    };
  
    const handleCloseModal = () => {
      setOpen(false);
    };
    return(
      <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="space-around"
    >
        <h1>Company Overview</h1>
        <ProjectList />
        <Button style={styles.buttonStyle} variant="contained" onClick={handleOpenModal}>Add Project</Button>
      <ProjectForm open={open} handleClose={handleCloseModal} />
        </Grid>
    )
}