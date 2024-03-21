// import ProjectList from "../components/ProjectsList/projectsList.jsx"
import ProjectForm from "../components/ProjectForm/ProjectForm";
import { useState } from "react";
import { Button } from "@mui/material";

export default function MyProject() {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  return (
    <>
      {/* <h1>My Projects</h1> */}
      <Button onClick={handleOpenModal}>Add Project</Button>
      <ProjectForm open={open} handleClose={handleCloseModal} />
    </>
  );
}
