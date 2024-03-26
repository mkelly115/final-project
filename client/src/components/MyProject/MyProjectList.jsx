import { useQuery } from "@apollo/client";
import { Link as RouterLink } from "react-router-dom";
import { QUERY_ME, QUERY_SINGLE_USER } from "../../utils/queries";
import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Avatar,
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
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
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  borderRadius: 8,
  border: `3px solid #e4442b`, 
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  height: "100%",
}));


const MyProjectList = () => {
  const {
    loading: meLoading,
    error: meError,
    data: meData,
  } = useQuery(QUERY_ME);

  const { loading, error, data: projectsData } = useQuery(QUERY_SINGLE_USER, {
    variables: { userId: meData?.me?._id },
  });

  if (meLoading || loading) return <p>Loading...</p>;
  if (meError || error) return <p>Error fetching data...</p>;
  if (!meData || !projectsData || !projectsData.user || !projectsData.user.projects) return <p>No user data or projects found...</p>;

  const projects = projectsData.user.projects;

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {projects.map((project) => (
          <Grid item key={project._id}>
            <StyledCard variant="outlined">
              <Avatar
                alt="WebPulse Logo"
                src={webpulselogo}
                sx={{ width: "5rem", height: "5rem", alignSelf: "center", marginTop: 1 }}
              />
              <CardActionArea
                component={RouterLink}
                to={`/dashboard/projects/${project._id}`}
                underline="none"
                sx={{ display: "block" }}
              >
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: "bold" }}>
                    {project.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontStyle: "italic", fontWeight: "bold", color: "#e4442b" }}>
                    Status: {project.projectStatus}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: "bold" }}>
                    <ul style={{ listStyleType: "none", padding: 0, display: "flex", flexDirection: "row", justifyContent: "center" }}>
                      {project.team && Array.isArray(project.team) && project.team[0].members.map((member, index) => (
                        <React.Fragment key={member._id}>
                          {index !== 0 && (
                            <li style={{ display: "inline", margin: "0 5px" }}>&nbsp;|&nbsp;</li>
                          )}
                          <li>{member.firstName} {member.lastName}</li>
                        </React.Fragment>
                      ))}
                    </ul>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
};

export default MyProjectList;