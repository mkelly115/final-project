import { Card, CardActionArea, CardContent, Typography, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../../utils/queries';

const ProjectList = () => {
  const { loading, error, data } = useQuery(QUERY_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.projects || data.projects.length === 0) {
    return <p>No projects found.</p>;
  }

  return (
    <Grid container>
      {data.projects?.map((project) => (
        <Grid item   key={project._id}>
        <Card
          variant='outlined'
          sx={{ height: '300px', width: '300px' }}
        >
          <CardActionArea
            component={RouterLink}
            to={`/dashboard/projects/${project._id}`}
            underline='none'
            sx={{ display: 'block', height: '100%', width: '100%' }}
          >
            <CardContent>
              <Typography id='card-description'>{project.name}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </ Grid>
      ))}
  </Grid>
  );
};

export default ProjectList;


