import "../UpdateProject/UpdateProject.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  Typography,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QUERY_SINGLE_PROJECT, QUERY_TEAMS } from "../../utils/queries";
import { UPDATE_PROJECT } from "../../utils/mutations";

const UpdateProject = () => {
  const { projectId } = useParams();
  const { loading, error, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId },
  });

  const {
    loading: teamsLoading,
    error: teamsError,
    data: teamsData,
  } = useQuery(QUERY_TEAMS);
  console.log(teamsData);

  const [projectData, setProjectData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (data.project) {
      setProjectData({
        ...data.project,
        teamId: data.project.teamId ? data.project.teamId : "",
      });
    }
  }, [data]);

  const [updateProject] = useMutation(UPDATE_PROJECT);

  const handleEditClick = () => {
    setIsEditing(true);
    // Find the team corresponding to the teamId in the project data
    const team = teamsData.teams.find(
      (team) => team._id === data.project.team[0]._id
    );
    // Update projectData with team name and other project data
    setProjectData({ ...data.project, team: team ? team.name : "" });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update selected date state
  };

  const handleSaveClick = async () => {
    try {
      // Extract only the necessary fields from projectData
      const { name, projectStatus, teamId } = projectData;

      // Find the selected team object
      const selectedTeam = teamsData.teams.find((team) => team._id === teamId);

      // Construct the input object to pass to the mutation
      const input = {
        name,
        projectStatus,
        dateDue: selectedDate ? selectedDate.toISOString() : "",
        teamId,
      };

      // Call the updateProject mutation with the projectId and input
      await updateProject({
        variables: {
          projectId: projectId,
          input: input,
        },
      });

      // Update projectData with the selected team
      setProjectData({ ...projectData, team: selectedTeam });

      setIsEditing(false);
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  if (loading || teamsLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (teamsError) return <p>Error: {teamsError.message}</p>;

  const team = teamsData.teams.find((team) => team._id === projectData.teamId);
  const teamName = team ? team.name : "No Team";

  return (
    <div className="grid-container">
      {/* <Typography variant="h4" gutterBottom>
        Edit Project
      </Typography> */}
      {isEditing ? (
        <Grid className="grid-grid-container" container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Name"
              value={projectData.name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              name="projectStatus"
              labelId="status-select-label"
              value={projectData.projectStatus}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Started">Started</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="dateDue"
                label="Due Date"
                type="date"
                value={projectData.dateDue}
                onChange={handleDateChange}
                fullWidth
                textField={(props) => <TextField {...props} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <InputLabel className="team-select-label">Team</InputLabel>
            <Select
              name="teamId"
              label="Team"
              value={projectData.team ? projectData.team._id : ""}
              onChange={handleChange}
              fullWidth
            >
              {teamsData.teams.map((team) => (
                <MenuItem key={team._id} value={team._id}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveClick}
            >
              Save
            </Button>
            <Button variant="contained" onClick={handleCancelClick}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      ) : (
        <div>
          <Typography
            className="project-info project-name"
            variant="h4"
            gutterBottom
          >
            Project Name: {data.project.name}
          </Typography>
          <Typography
            className="project-info project-status"
            variant="h4"
            gutterBottom
          >
            Status: {data.project.projectStatus}
          </Typography>
          <Typography
            className="project-info project-due-date"
            variant="h4"
            gutterBottom
          >
            Due Date: {data.project.dateDue}
          </Typography>
          <Typography
            className="project-info project-team"
            variant="h4"
            gutterBottom
          >
            Team: {teamName}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpdateProject;
