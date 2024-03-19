import { Card, CardActionArea, CardContent, Typography, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../../utils/queries';

const ProjectList = () => {
  const { loading, error, data } = useQuery(QUERY_PROJECTS, {
    fetchPolicy: 'cache-and-network', // Ensure fresh data
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.projects || data.projects.length === 0) {
    return <p>No projects found.</p>;
  }

  return (
    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
      {data.projects.map((project) => (
        <Grid item key={project.name}>
          <Card variant='outlined' sx={{ width: 400 }}>
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
                  Teams:
                </Typography>
                {project.teams.map((team) => (
                  <div key={team.name}>
                    <Typography variant="subtitle2" component="div" gutterBottom>
                      {team.name}
                    </Typography>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      {team.members.map((member) => (
                        <li key={`${member.firstName}-${member.lastName}`}>
                          {member.firstName} {member.lastName}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectList;