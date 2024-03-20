import "../LoginForm/LoginForm.css";
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
  // FormHelperText,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Auth from "../../utils/auth";
import { LOGIN_USER } from "../../utils/mutations";

// New code
// Define redirectToDashboard function
const redirectToDashboard = () => {
  window.location.href = "/dashboard";
};
// End of new code

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated, setValidated] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [login] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({ variables: { ...userFormData } });
      const { token, user } = data.login;
      Auth.login(token);
      console.log("User logged in successfully: ", user);

      // Redirect user to dashboard
      redirectToDashboard();

      // Reset form data
      setUserFormData({
        email: "",
        password: "",
      });

      setValidated(true);

      // Schedule token refresh
      scheduleTokenRefresh();
    } catch (err) {
      console.error("Error logging in: ", err);
      setShowAlert(true);

      setValidated(false);
    }
  };

  const scheduleTokenRefresh = () => {
    const tokenExpirationTime = Auth.getTokenExpirationTime();
    // Refresh 5 minutes before it expires
    const timeToRefresh = tokenExpirationTime - Date.now() - 300000;
    setTimeout(refreshToken, timeToRefresh);
  };

  const refreshToken = async () => {
    try {
      // Send request to refresh token
      const response = await fetch("/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const { token } = await response.json();
      Auth.login(token);

      // Schedule next token refresh
      scheduleTokenRefresh();
    } catch (err) {
      console.error("Error refreshing token:", err);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box>
      <form noValidate onSubmit={handleFormSubmit}>
        {/* Display alert only if showAlert is true */}
        {showAlert && (
          <Alert
            onClose={() => setShowAlert(false)}
            open={showAlert}
            severity="error"
          >
            Something went wrong with your login credentials!
          </Alert>
        )}
        <div style={{ display: "flex", gap: "10px" }}>
          <FormControl sx={{ m: 1, width: "100%", flex: 1 }} variant="outlined">
            <TextField
              fullWidth
              label="Email"
              type="email"
              placeholder="Your email"
              name="email"
              onChange={handleInputChange}
              value={userFormData.email}
              required
              error={validated === false}
            />

            {/* {!validated && !userFormData.email && (
              <FormHelperText sx={{ color: "red", marginLeft: "10px" }}>
                Email is required!
              </FormHelperText>
            )} */}
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: "98%", flex: 1 }} variant="outlined">
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
            {/* {!validated && !userFormData.password && (
              <FormHelperText sx={{ color: "red", marginLeft: "10px" }}>
                Password is required!
              </FormHelperText>
            )} */}
          </FormControl>
        </div>
        <div className="buttonContainer">
          <Button
            sx={{ m: 1, width: "100%" }}
            disabled={!(userFormData.email && userFormData.password)}
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

export default LoginForm;
