import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import TaskTable from '../components/TaskList/taskList';
import UpdateProject from '../components/UpdateProject/UpdateProject';
import { QUERY_SINGLE_PROJECT } from '../utils/queries';

export default function ProjectTask() {
  const { projectId } = useParams();
  const { loading, error, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId }, // Pass projectId to the useQuery hook
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract the project name from the data
  const projectName = data && data.project && data.project.name;
  const projectStatus = data && data.project && data.project.projectStatus;
  const dueDate = data && data.project && data.project.dateDue;
  const team = data && data.project && data.project.team[0].name;
  console.log(team)

  return (
    <Grid container spacing={2} direction="column" alignItems="center" justifyContent="space-around">
      <Grid item sx={{ py: 2 }}>
        <Typography variant="h2" align="center" gutterBottom>
          {projectName}
        </Typography>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          Status: {projectStatus}
        </Typography>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          Due Date: {dueDate}
        </Typography>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          Team: {team}
        </Typography>
      </Grid>
      <Grid item sx={{ py: 2 }}>
        <UpdateProject />
      </Grid>
      <Grid item sx={{ py: 2 }}>
        <TaskTable />
      </Grid>
    </Grid>
  );
}

