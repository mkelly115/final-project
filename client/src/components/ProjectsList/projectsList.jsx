import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../../utils/queries';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ProjectList = () => {
    const { loading, error, data } = useQuery(QUERY_PROJECTS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.projects || data.projects.length === 0) {
      return <p>No projects found.</p>;
    }
  
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {data.projects.map(project => (
          <Box key={project._id} m={2} minWidth={275}>
            <Card variant="outlined">
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {project.name}
                </Typography>
                <Typography variant="h5" component="div">
                  Project Status: {project.projectStatus}
                </Typography>
                {project.teams.map(team => (
                  <div key={team._id}>
                    <Typography variant="body2">
                      Team Name: {team.name}
                    </Typography>
                    <Typography variant="body2">
                      Team Members:
                      {team.members ? (
                        team.members.map(member => (
                          <span key={member._id}> {member.firstName},</span>
                        ))
                      ) : (
                        <span>No members found</span>
                      )}
                    </Typography>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    );
  };
  
  export default ProjectList;