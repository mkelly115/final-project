import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_TEAMS, QUERY_PROJECTS } from '../../utils/queries';
import { Card, CardActionArea, CardContent, Typography, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import TeamTaskList from '../TeamTaskList/TeamTaskList';

const TeamProjectList = () => {
  const { loading: meLoading, error: meError, data: meData } = useQuery(QUERY_ME);
  const { loading: teamsLoading, error: teamsError, data: teamsData } = useQuery(QUERY_TEAMS);
  const { loading: projectsLoading, error: projectsError, data: projectsData } = useQuery(QUERY_PROJECTS);

  if (meLoading || teamsLoading || projectsLoading) return <p>Loading...</p>;
  if (meError || teamsError || projectsError) return <p>Error fetching data...</p>;

  if (!meData || !teamsData || !projectsData || !projectsData.projects) return <p>No data found...</p>;

  console.log("Projects Data:", projectsData);

  let userTeams = [];
  if (meData.me && meData.me._id && teamsData.teams) {
    userTeams = teamsData.teams.filter(team => team.members.some(member => member._id === meData.me._id));
  }

  const userTeamIds = userTeams.map(team => team._id);

  const userProjects = projectsData.projects.filter(project => {
    const projectTeamIds = project.team.map(team => team._id);
    return projectTeamIds.some(teamId => userTeamIds.includes(teamId));
  });

  return (
    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
      {userProjects.map(project => (
        <Grid item key={project._id} xs={12} sm={6} md={4} lg={12}>
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
                {project.team && Array.isArray(project.team) && project.team.map((team) => (
                  <div key={team._id}>
                    <Typography variant="subtitle2" component="div" gutterBottom>
                      {team.name}
                    </Typography>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      {team.members && Array.isArray(team.members) && team.members.map((member) => (
                        <li key={member._id}>
                          {member.firstName} {member.lastName}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </CardActionArea>
          </Card>
          <TeamTaskList tasks={project.tasks} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TeamProjectList;