import "../SignupForm/SignupForm.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  TextField,
  Button,
  Alert,
  FormControl,
  OutlinedInput,
  IconButton,
  InputLabel,
  InputAdornment,
  FormHelperText,
  Box
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // team: "",
  });
  // set state for form validation
  const [validated, setValidated] = useState(null);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [addUser] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(userFormData);

    try {
      const { data } = await addUser({ variables: { input: userFormData } });

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
        // team: "",
      });

      setValidated(true);
    } catch (err) {
      console.error("Error signing up - You went to catch:", err);
      setShowAlert(true);

      setValidated(false);
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box>
      <form noValidate onSubmit={handleFormSubmit}>
        {/* Show alert if showAlert is true */}
        {showAlert && (
          <Alert onClose={() => setShowAlert(false)} severity="error">
            Something went wrong with your signup!
          </Alert>
        )}
<div style={{ display: 'flex', gap: '10px' }}>
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
          {!validated && !userFormData.firstName && (
            <FormHelperText sx={{ color: 'red', marginLeft: '10px' }}>First name is required!</FormHelperText>
          )}
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
          {!validated && !userFormData.lastName && (
            <FormHelperText sx={{ color: 'red', marginLeft: '10px' }}>Last name is required!</FormHelperText>
          )}
        </FormControl>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
        <FormControl sx={{ m: 1, width: "50%", flex: 1}} variant="outlined">
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
          {!validated && !userFormData.email && (
            <FormHelperText sx={{ color: 'red', marginLeft: '10px' }}>Email is required!</FormHelperText>
          )}
        </FormControl>

        <FormControl sx={{ m: 1, width: "50%", flex: 1}} variant="outlined">
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
          {!validated && !userFormData.password && (
            <FormHelperText sx={{ color: 'red', marginLeft: '10px' }}>Password is required!</FormHelperText>
          )}
        </FormControl>
        </div>
<div className="buttonContainer">
        <Button
        sx={{ m: 1, width: "100%" }}
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
        </div>
      </form>
    </Box>
  );
};

export default SignupForm;
