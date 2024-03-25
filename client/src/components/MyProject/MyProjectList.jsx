// Import the necessary dependencies
import { useQuery } from "@apollo/client";
import { Link as RouterLink } from "react-router-dom";
import { QUERY_ME, QUERY_SINGLE_USER } from "../../utils/queries";
import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";

// Inside your component where you want to fetch and display the projects
const MyProjectList = () => {
  const {
    loading: meLoading,
    error: meError,
    data: meData,
  } = useQuery(QUERY_ME);

  // Query to fetch projects
  const { loading, error, data: projectsData } = useQuery(QUERY_SINGLE_USER, {
    variables: { userId: meData?.me?._id }, // Pass the logged-in user's ID as a variable
  });

  // Handle loading and error states
  if (meLoading || loading) return <p>Loading...</p>;
  if (meError || error) return <p>Error fetching data...</p>;

  // Verify that meData and projectsData are populated
  if (!meData || !projectsData || !projectsData.user || !projectsData.user.projects) return <p>No user data or projects found...</p>;

console.log(projectsData.user.projects);
const projects = projectsData.user.projects;

  return (
    <Grid container spacing={2} sx={{ justifyContent: "center" }}>
      {projects.map((project) => (
        <Grid item key={project._id}>
          <Card variant="outlined" sx={{ width: 400 }}>
            <CardActionArea
              component={RouterLink}
              to={`/dashboard/projects/${project._id}`}
              underline="none"
              sx={{ display: "block" }}
            >
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {project.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Status: {project.projectStatus}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Due Date: {project.dateDue}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MyProjectList;