import "../ProjectForm/ProjectForm.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  TextField,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ADD_PROJECT } from "../../utils/mutations";

const ProjectForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    name: "",
    projectStatus: "",
    dateDue: "",
    teamIds: "",
  });
  // set state for form validation
  const [validated, setValidated] = useState(null);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  // State to store selected date
  const [selectedDate, setSelectedDate] = useState(null);
  // const [errorMessage, setErrorMessage] = useState(null);

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
    console.log("Selected Date:", selectedDate);
    try {
      const { data } = await addProject({ variables: { input: userFormData } });

      console.log("Project created successfully ", data);

      setUserFormData({
        name: "",
        projectStatus: "",
        dateDue: "",
        teamIds: "",
      });

      setValidated(true);
    } catch (err) {
      console.error("Error adding project", err);
      setShowAlert(true);

      setValidated(false);
    }
  };

  const handleTeamChange = (event) => {
    const teamValue = event.target.value;
    setUserFormData({ ...userFormData, teamIds: teamValue });
  };

  const handleStatusChange = (event) => {
    const statusValue = event.target.value;
    setUserFormData({ ...userFormData, projectStatus: statusValue });
  };

  return (
    <Box>
      <form noValidate onSubmit={handleFormSubmit}>
        <div style={{ display: "flex", gap: "10px" }}>
          <FormControl sx={{ m: 1, width: "50%", flex: 1 }} variant="outlined">
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
          <FormControl sx={{ m: 1, width: "50%", flex: 1 }} variant="outlined">
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
        <div style={{ display: "flex", gap: "10px" }}>
          <FormControl sx={{ m: 1, width: "50%", flex: 1 }} variant="outlined">
            <InputLabel className="team-select-label">Team</InputLabel>
            <Select
              labelId="team-select-label"
              className="team-select"
              value={userFormData.teamIds}
              onChange={handleTeamChange}
              label="Team"
            >
              <MenuItem value="65f6352262320f5d03db71c0">Team A</MenuItem>
              <MenuItem value="65f6352262320f5d03db71c1">Team B</MenuItem>
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
        <div className="buttonContainer">
          <Button
            sx={{ m: 1, width: "100%" }}
            disabled={
              !(
                userFormData.name
                // userFormData.projectStatus &&
                // userFormData.dateDue &&
                // userFormData.teamIds
              )
            }
            type="submit"
            variant="contained"
            color="success"
            size="large"
          >
            Submit
          </Button>
        </div>
      </form>
      {/* Show alert if showAlert is true */}
      {showAlert && (
        <Alert onClose={() => setShowAlert(false)} severity="error">
          {"Something went wrong with your signup!"}
        </Alert>
      )}
    </Box>
  );
};

export default ProjectForm;