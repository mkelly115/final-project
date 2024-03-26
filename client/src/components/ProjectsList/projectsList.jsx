import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PROJECTS } from "../../utils/queries";
import webpulselogo from "/webpulselogo.png";

const theme = createTheme({
  typography: {
    h5: {
      fontSize: "1.5rem", // Default font size
      "@media (max-width:1200px)": {
        fontSize: "1.2rem", // Decrease font size on smaller screens
      },
    },
    subtitle1: {
      fontSize: "1rem", // Default font size
      "@media (max-width:1200px)": {
        fontSize: "0.8rem", // Decrease font size on smaller screens
      },
    },
    subtitle2: {
      fontSize: "0.8rem", // Default font size
      "@media (max-width:1200px)": {
        fontSize: "0.6rem", // Decrease font size on smaller screens
      },
    },
  },
});

const ProjectList = () => {
  const { loading, error, data } = useQuery(QUERY_PROJECTS, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.projects || data.projects.length === 0) {
    return <p>No projects found.</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {data.projects.map((project) => {
          return (
            <Grid item key={project._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                variant="outlined"
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  boxShadow: 3,
                  border: 3,
                  borderColor: "#e4442b",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch", // Ensure all cards have the same height
                  height: "100%", // Ensure cards take the full height of their container
                }}
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    alt="WebPulse Logo"
                    src={webpulselogo}
                    sx={{ width: "5rem", height: "5rem", alignSelf: "center", marginTop: 1 }}
                  />
                </div>
                <CardActionArea
                  component={RouterLink}
                  to={`/dashboard/projects/${project._id}`}
                  underline="none"
                  sx={{ display: "block" }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      gutterBottom
                      sx={{ fontWeight: "bold" }}
                    >
                      {project.name}
                    </Typography>
                    {project.team && typeof project.team === "object" && (
                      <div key={project.team[0]._id}>
                        <Typography
                          variant="subtitle1"
                          component="div"
                          gutterBottom
                          sx={{
                            textTransform: "uppercase",
                            fontWeight: "bold",
                          }}
                        >
                          {project.team[0].name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          sx={{
                            fontStyle: "italic",
                            fontWeight: "bold",
                            color: "#e4442b",
                          }}
                        >
                          Status: {project.projectStatus}
                        </Typography>
                        <Typography
                          variant="subtitle2"
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
                            {project.team[0].members &&
                              Array.isArray(project.team[0].members) &&
                              project.team[0].members.map((member, index) => (
                                <React.Fragment key={member._id}>
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
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </ThemeProvider>
  );
};

export default ProjectList;
