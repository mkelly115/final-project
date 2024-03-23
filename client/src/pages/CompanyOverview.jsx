import ProjectForm from "../components/ProjectForm/ProjectForm";
import ProjectList from "../components/ProjectsList/projectsList";
import { useState } from "react";
import { Button } from "@mui/material";

export default function CompanyOverview() {
    const [open, setOpen] = useState(false);

    const handleOpenModal = () => {
      setOpen(true);
    };
  
    const handleCloseModal = () => {
      setOpen(false);
    };
    return(
        <>
        <h1>Company Overview</h1>
        <ProjectList />
        <Button onClick={handleOpenModal}>Add Project</Button>
      <ProjectForm open={open} handleClose={handleCloseModal} />
        </>
    )
}