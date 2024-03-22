import "../SignupForm/SignupForm.css";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  TextField,
  Button,
  Alert,
  FormControl,
  OutlinedInput,
  IconButton,
  InputLabel,
  InputAdornment,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Auth from "../../utils/auth";
import { validateEmail } from "../../utils/helpers";
import { QUERY_TEAMS } from "../../utils/queries";
import { ADD_USER } from "../../utils/mutations";

const SignupForm = () => {
  const {
    loading: teamsLoading,
    error: teamsError,
    data: teamsData,
  } = useQuery(QUERY_TEAMS);
  console.log(teamsData);

  // set initial form state
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    teamId: "",
  });
  // set state for form validation
  const [validated, setValidated] = useState(null);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [addUser] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(userFormData);

    // Validate email
    if (!validateEmail(userFormData.email)) {
      setErrorMessage("Invalid email address");
      setShowAlert(true);
      return;
    }

    // Validate password length
    if (userFormData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      setShowAlert(true);
      return;
    }

    try {
      const { data } = await addUser({
        variables: {
          input: userFormData,
        },
      });

      // Handle successful signup
      const { token, user } = data.addUser;
      Auth.login(token);
      console.log("User signed up successfully ", user);

      // Reset form data
      setUserFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        teamId: "",
      });

      setValidated(true);
    } catch (err) {
      console.error("Error signing up:", err);
      setShowAlert(true);
      setValidated(false);
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleTeamChange = (event) => {
    const teamValue = event.target.value;
    setUserFormData({ ...userFormData, teamId: teamValue });
  };

  if (teamsLoading) return <p>Loading...</p>;
  if (teamsError) return <p>Error: {teamsError.message}</p>;

  return (
    <Box>
      <form noValidate onSubmit={handleFormSubmit}>
        <div style={{ display: "flex", gap: "10px" }}>
          <FormControl sx={{ m: 1, width: "50%", flex: 1 }} variant="outlined">
            <TextField
              label="First Name"
              type="text"
              placeholder="Your first name"
              name="firstName"
              onChange={handleInputChange}
              value={userFormData.firstName}
              required
              error={validated === false}
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: "50%", flex: 1 }} variant="outlined">
            <TextField
              label="Last Name"
              type="text"
              placeholder="Your last name"
              name="lastName"
              onChange={handleInputChange}
              value={userFormData.lastName}
              required
              error={validated === false}
            />
          </FormControl>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <FormControl sx={{ m: 1, width: "50%", flex: 1 }} variant="outlined">
            <TextField
              label="Email"
              type="email"
              placeholder="Your email address"
              name="email"
              onChange={handleInputChange}
              value={userFormData.email}
              required
              error={validated === false}
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: "50%", flex: 1 }} variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              required
              error={validated === false}
            >
              Password
            </InputLabel>
            <OutlinedInput
              className="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              fullWidth
              label="Password"
              placeholder="Your password"
              name="password"
              onChange={handleInputChange}
              value={userFormData.password}
              required
              error={validated === false}
            />
          </FormControl>
        </div>
        {/* Dropdown for selecting team */}
        <div style={{ display: "flex", gap: "10px" }}>
          <FormControl sx={{ m: 1, width: "50%", flex: 1 }} variant="outlined">
            <InputLabel className="team-select-label">Team</InputLabel>
            <Select
              labelId="team-select-label"
              className="team-select"
              value={userFormData.teamId}
              onChange={handleTeamChange}
              label="Team"
            >
              {teamsData &&
                teamsData.teams &&
                teamsData.teams.map((team) => (
                  <MenuItem key={team._id} value={team._id}>
                    {`${team.name}`}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl
            sx={{ m: 1, width: "50%", flex: 1, justifyContent: "center" }}
          >
            <Button
              disabled={
                !(
                  userFormData.firstName &&
                  userFormData.lastName &&
                  userFormData.email &&
                  userFormData.password
                )
              }
              type="submit"
              variant="contained"
              color="success"
              size="large"
            >
              Submit
            </Button>
          </FormControl>
        </div>
      </form>
      {/* Show alert if showAlert is true */}
      {showAlert && (
        <Alert onClose={() => setShowAlert(false)} severity="error">
          {/* Display specific error messages */}
          {errorMessage || "Something went wrong with your signup!"}
        </Alert>
      )}
    </Box>
  );
};

export default SignupForm;
