import { useState } from "react";
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
import { QUERY_SINGLE_PROJECT } from "../../utils/queries";
import { UPDATE_PROJECT } from "../../utils/mutations";

const UpdateProject = () => {
  const { projectId } = useParams();
  const { loading, error, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId },
  });

  const [projectData, setProjectData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [updateProject] = useMutation(UPDATE_PROJECT);

  const handleEditClick = () => {
    setIsEditing(true);
    setProjectData(data.project);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update selected date state
  };

const handleSaveClick = async () => {
    try {
      // Extract only the necessary fields from projectData
      const { name, projectStatus, teamId } = projectData;
  
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
    setProjectData({ ...projectData, [name]: value });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Edit Project
      </Typography>
      {isEditing ? (
        <Grid container spacing={2}>
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
              label="Team ID"
              value={projectData.teamId}
              onChange={handleChange}
              fullWidth>
              <MenuItem value="65f6352262320f5d03db71c0">Team A</MenuItem>
              <MenuItem value="65f6352262320f5d03db71c1">Team B</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveClick}>
              Save
            </Button>
            <Button variant="contained" onClick={handleCancelClick}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      ) : (
        <div>
          <Typography variant="h5" gutterBottom>
            Name: {data.project.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Status: {data.project.projectStatus}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Due Date: {data.project.dateDue}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Team ID: {data.project.teamId}
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
