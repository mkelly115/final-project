// import "../ProjectForm/ProjectForm.css";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QUERY_TEAMS } from "../../utils/queries";
import { ADD_PROJECT } from "../../utils/mutations";

const styles = {
  buttonStyle: {
    background: '#e4442b',
    margin: '1rem',
    padding: '.5rem',
    color: "white"
  },
};

const ProjectForm = ({ open, handleClose }) => {
  const {
    loading: teamsLoading,
    error: teamsError,
    data: teamsData,
  } = useQuery(QUERY_TEAMS);


  // set initial form state
  const initialState = {
    name: "",
    projectStatus: "",
    dateDue: "",
    teamId: "",
  };
  const [userFormData, setUserFormData] = useState(initialState);
  // set state for form validation
  const [validated, setValidated] = useState(null);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  // State to store selected date
  const [selectedDate, setSelectedDate] = useState(null);

  const [addProject] = useMutation(ADD_PROJECT);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update selected date state
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const input = {
        name: userFormData.name,
        projectStatus: userFormData.projectStatus,
        dateDue: selectedDate ? selectedDate.toISOString() : "", // Convert Date to ISO string format
        teamId: userFormData.teamId,
      };

      await addProject({ variables: { input } });


      setUserFormData({
        name: "",
        projectStatus: "",
        dateDue: "",
        teamId: "",
      });

      setValidated(true);

      // Reload the page to show the newly added project
      window.location.reload();
    } catch (err) {
      console.error("Error adding project", err.message);
      setShowAlert(true);

      setValidated(false);
    }
  };

  const handleTeamChange = (event) => {
    const teamValue = event.target.value;
    setUserFormData({ ...userFormData, teamId: teamValue });
  };

  const handleStatusChange = (event) => {
    const statusValue = event.target.value;
    setUserFormData({ ...userFormData, projectStatus: statusValue });
  };

  const handleCloseModal = () => {
    setUserFormData(initialState);
    handleClose();
  };

  if (teamsLoading) return <p>Loading...</p>;
  if (teamsError) return <p>Error: {teamsError.message}</p>;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Project</DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={handleFormSubmit}>
          <div style={{ display: "flex", gap: "10px" }}>
            <FormControl
              sx={{ m: 1, width: "50%", flex: 1 }}
              variant="outlined"
            >
              <TextField
                label="Project Name"
                type="text"
                placeholder="Project Name"
                name="name"
                onChange={handleInputChange}
                value={userFormData.name}
                required
                error={validated === false}
              />
            </FormControl>
            <FormControl
              sx={{ m: 1, width: "50%", flex: 1 }}
              variant="outlined"
            >
              <InputLabel className="status-select-label">
                Project Status
              </InputLabel>
              <Select
                labelId="status-select-label"
                className="status-select"
                value={userFormData.projectStatus}
                onChange={handleStatusChange}
                label="Status"
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="started">Started</MenuItem>
                <MenuItem value="inProgress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* Dropdown for selecting team */}
          <div style={{ display: "flex", gap: "10px" }}>
            <FormControl
              sx={{ m: 1, width: "50%", flex: 1 }}
              variant="outlined"
            >
              <InputLabel className="team-select-label">Team</InputLabel>
              <Select
                labelId="team-select-label"
                className="team-select"
                value={userFormData.teamId}
                onChange={handleTeamChange}
                label="Team"
              >
                {teamsData.teams.map((team) => (
                  <MenuItem key={team._id} value={team._id}>
                    {`${team.name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: "50%", flex: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  textField={(props) => <TextField {...props} fullWidth />}
                />
              </LocalizationProvider>
            </FormControl>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <Button style={styles.buttonStyle}
          onClick={handleFormSubmit}
          disabled={!userFormData.name || !userFormData.teamId}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
      {/* Show alert if showAlert is true */}
      {showAlert && (
        <Alert onClose={() => setShowAlert(false)} severity="error">
          {"Something went wrong with your signup!"}
        </Alert>
      )}
    </Dialog>
  );
};

ProjectForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ProjectForm;
