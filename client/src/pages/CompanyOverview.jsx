import ProjectForm from "../components/ProjectForm/ProjectForm";
import ProjectList from "../components/ProjectsList/projectsList";
import { useState } from "react";
import { Button, Grid } from "@mui/material";

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
        <Button onClick={handleOpenModal}>Add Project</Button>
      <ProjectForm open={open} handleClose={handleCloseModal} />
        </Grid>
    )
}