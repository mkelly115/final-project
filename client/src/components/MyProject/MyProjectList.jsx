// Import the necessary dependencies
import { useQuery } from "@apollo/client";
import { Link as RouterLink } from "react-router-dom";
import { QUERY_ME, QUERY_PROJECTS } from "../../utils/queries";
import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";

// Inside your component where you want to fetch and display the projects
const MyProjectList = () => {
  // Query to fetch the logged-in user's data
  const {
    loading: meLoading,
    error: meError,
    data: meData,
  } = useQuery(QUERY_ME);

  // Query to fetch projects
  const { loading, error, data } = useQuery(QUERY_PROJECTS, {
    variables: { userId: meData?.me?._id }, // Pass the logged-in user's ID as a variable
  });

  // Handle loading and error states
  if (meLoading || loading) return <p>Loading...</p>;
  if (meError || error) return <p>Error fetching data...</p>;

  // Verify that meData and data are populated
  if (!meData || !data) return <p>No user data or projects found...</p>;

  const userProjects = data.projects.filter((project) => {
    console.log("Project:", project);
    console.log("Team:", project.team);
    console.log("Members:", project.team[0]?.members); // Access the members of the first team object
    const isUserMember = project.team[0]?.members?.some(
      (member) => member._id === meData.me._id
    ); // Check if the user is a member of the first team
    console.log("Is user member:", isUserMember);
    return isUserMember;
  });

  return (
    <Grid container spacing={2} sx={{ justifyContent: "center" }}>
      {userProjects.map((project) => (
        <Grid item key={project._id} xs={12}>
          <Card variant="outlined" sx={{ width: '100%', borderRadius: 2, boxShadow: 3  }}>
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
                <Typography variant="h6" gutterBottom>
                  Team:
                </Typography>
                {project.team && typeof project.team === "object" && (
                  <div key={project.team[0]._id}>
                    <Typography
                      variant="subtitle2"
                      component="div"
                      gutterBottom
                    >
                      {project.team[0].name}
                    </Typography>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      {project.team[0].members &&
                        Array.isArray(project.team[0].members) &&
                        project.team[0].members.map((member) => (
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
      ))}
    </Grid>
  );
};

export default MyProjectList;