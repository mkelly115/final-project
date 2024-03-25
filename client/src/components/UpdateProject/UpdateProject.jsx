import "../UpdateProject/UpdateProject.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
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
  const { loading, error, data, refetch } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId },
  });

  const {
    loading: teamsLoading,
    error: teamsError,
    data: teamsData,
  } = useQuery(QUERY_TEAMS);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [projectData, setProjectData] = useState({});

  useEffect(() => {
    if (data.project) {
      setProjectData({
        ...data.project,
        teamId: data.project.teamId ? data.project.teamId : "",
      });
    }
  }, [data]);

  const [updateProject] = useMutation(UPDATE_PROJECT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const { name, projectStatus, teamId } = projectData;

      const input = {
        name,
        projectStatus,
        dateDue: selectedDate ? selectedDate.toISOString() : "",
        teamId,
      };

      await updateProject({
        variables: {
          projectId: projectId,
          input: input,
        },
      });

      setIsEditing(false);

      // Refetch project data after the update is successful
      refetch();
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  if (loading || teamsLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (teamsError) return <p>Error: {teamsError.message}</p>;

  return (
    <div className="grid-container">
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
              label="Status"
              value={projectData.projectStatus}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Created">Created</MenuItem>
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
                value={selectedDate}
                onChange={handleDateChange}
                fullWidth
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          {data.project.tasks.every(
            (task) => task.taskStatus === "Completed"
          ) && (
            <Grid item xs={12}>
              <InputLabel>Team</InputLabel>
              <Select
                name="teamId"
                label="Team"
                value={projectData.teamId}
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
          )}
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
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpdateProject;
