import React from "react";
import "../TeamProjects/teamProjects.css";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_TEAMS, QUERY_PROJECTS } from "../../utils/queries";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import TeamTaskList from "../TeamTaskList/TeamTaskList";
import webpulselogo from "../../../public/webpulselogo.png";

const TeamProjectList = () => {
  const {
    loading: meLoading,
    error: meError,
    data: meData,
  } = useQuery(QUERY_ME);
  const {
    loading: teamsLoading,
    error: teamsError,
    data: teamsData,
  } = useQuery(QUERY_TEAMS);
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(QUERY_PROJECTS);

  if (meLoading || teamsLoading || projectsLoading) return <p>Loading...</p>;
  if (meError || teamsError || projectsError)
    return <p>Error fetching data...</p>;

  if (!meData || !teamsData || !projectsData || !projectsData.projects)
    return <p>No data found...</p>;

  console.log("Projects Data:", projectsData);
  console.log("Projects Data:", projectsData);

  let userTeams = [];
  if (meData.me && meData.me._id && teamsData.teams) {
    userTeams = teamsData.teams.filter((team) =>
      team.members.some((member) => member._id === meData.me._id)
    );
  }

  const userTeamIds = userTeams.map((team) => team._id);

  const userProjects = projectsData.projects.filter((project) => {
    const projectTeamIds = project.team.map((team) => team._id);
    return projectTeamIds.some((teamId) => userTeamIds.includes(teamId));
  });

  return (
    <div className="team-container">
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {userProjects.map((project) => (
          <Grid
            item
            key={project._id}
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Card
              variant="outlined"
              sx={{
                width: "100%",
                borderRadius: 2,
                border: 3,
                borderColor: "#e4442b",
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                
              }}
            >
              <Avatar
                alt="WebPulse Logo"
                src={webpulselogo}
                sx={{ width: "8rem", height: "8rem", marginLeft: 2 }}
              />
              <CardActionArea
                component={RouterLink}
                to={`/dashboard/projects/${project._id}`}
                underline="none"
                sx={{ display: "block", alignItems: "center", width: "100%" }}
              >
                <CardContent>
                  <Typography
                    variant="h4"
                    component="div"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    {project.name}
                  </Typography>
                  {project.team &&
                    Array.isArray(project.team) &&
                    project.team.map((team) => (
                      <div key={team._id}>
                        <Typography
                          variant="h5"
                          component="div"
                          gutterBottom
                          sx={{
                            textTransform: "uppercase",
                            fontWeight: "bold",
                          }}
                        >
                          {team.name}
                        </Typography>
                        <Typography
                          variant="h5"
                          gutterBottom
                          sx={{
                            fontStyle: "italic",
                            color: "#e4442b",
                            fontWeight: "bold",
                          }}
                        >
                          Status: {project.projectStatus}
                        </Typography>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ fontWeight: "bold" }}
                        >
                          <ul
                            style={{
                              listStyleType: "none",
                              padding: 0,
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                            }}
                          >
                            {team.members &&
                              Array.isArray(team.members) &&
                              team.members.map((member, index) => (
                                <React.Fragment key={member._id}>
                                  {/* Render the separator only after the first item */}
                                  {index !== 0 && (
                                    <li
                                      style={{
                                        display: "inline",
                                        margin: "0 5px",
                                      }}
                                    >
                                      &nbsp;|&nbsp;
                                    </li>
                                  )}
                                  <li>
                                    {member.firstName} {member.lastName}
                                  </li>
                                </React.Fragment>
                              ))}
                          </ul>
                        </Typography>
                      </div>
                    ))}
                </CardContent>
              </CardActionArea>
            </Card>
            <TeamTaskList tasks={project.tasks} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TeamProjectList;