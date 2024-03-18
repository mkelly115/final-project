import '../LoginForm/LoginForm.css';
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { TextField, Button, Alert } from "@mui/material";
import Auth from "../../utils/auth";
import { LOGIN_USER } from "../../utils/mutations";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated, setValidated] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

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

  return (
    <>
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
          helperText={!validated && !userFormData.email && "Email is required!"}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          placeholder="Your password"
          name="password"
          onChange={handleInputChange}
          value={userFormData.password}
          required
          error={validated === false}
          helperText={!validated && !userFormData.password && "Password is required!"}
        />

        <Button
          fullWidth
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="contained"
          color="success"
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
