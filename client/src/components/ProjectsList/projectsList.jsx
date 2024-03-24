import { Card, CardActionArea, CardContent, Typography, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../../utils/queries';

const ProjectList = () => {
  const { loading, error, data } = useQuery(QUERY_PROJECTS, {
    fetchPolicy: 'cache-and-network', 
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.projects || data.projects.length === 0) {
    return <p>No projects found.</p>;
  }

  return (
    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
      {data.projects.map((project) => {
        return (
          <Grid item key={project._id} xs={12} sm={6} md={4} lg={3}>
            <Card variant='outlined' sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}>
              <CardActionArea
                component={RouterLink}
                to={`/dashboard/projects/${project._id}`}
                underline='none'
                sx={{ display: 'block' }}
              >
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {project.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Status: {project.projectStatus}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Team:
                  </Typography>
                  {project.team && typeof project.team === 'object' && (
              <div key={project.team[0]._id}>
                <Typography variant="subtitle2" component="div" gutterBottom>
                  {project.team[0].name}
                </Typography>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {project.team[0].members && Array.isArray(project.team[0].members) && project.team[0].members.map((member) => (
                    <li key={member._id}>
                      {member.firstName} {member.lastName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProjectList;
