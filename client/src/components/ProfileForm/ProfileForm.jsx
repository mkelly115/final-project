import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { UPDATE_USER } from "../../utils/mutations";
import {
  Typography,
  TextField,
  Grid,
  Button,
} from "@mui/material";

const ProfileForm = () => {
  const { loading, error, data, refetch } = useQuery(QUERY_ME);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({});
  const [updateUser] = useMutation(UPDATE_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { me } = data;

  const handleEditClick = () => {
    setIsEditing(true);
    setUserData({ ...me });
  };

  const handleSaveClick = async () => {
    try {
      const { firstName, lastName, email, password } = userData;
      const input = {
        firstName,
        lastName,
        email,
        password,
      };
      await updateUser({
        variables: {
          userId: me._id,
          input,
        },
        update(cache, { data: { updateUser: updatedUser } }) {
          cache.writeQuery({
            query: QUERY_ME,
            data: { me: updatedUser },
          });
        },
      });
      setIsEditing(false);
      refetch(); // Refetch the QUERY_ME query to update the UI
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUserData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div>
      {isEditing ? (
        <Grid className="profile-grid-container" container spacing={2}>
          <Grid item xs={12} className="profile-grid-container">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              First Name:
            </Typography>
            <TextField
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} className="profile-grid-field">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Last Name:
            </Typography>
            <TextField
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} className="profile-grid-field">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Email:
            </Typography>
            <TextField
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} className="profile-grid-field">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Password:
            </Typography>
            <TextField
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} className="btn-container" container justifyContent="center">
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
          <Typography variant="h5">Profile Details</Typography>
          <p className="profile-details">
            <strong>First Name:</strong> {me.firstName}
          </p>
          <p className="profile-details">
            <strong>Last Name:</strong> {me.lastName}
          </p>
          <p className="profile-details">
            <strong>Email:</strong> {me.email}
          </p>
          <p className="profile-details">
            <strong>Password: *****</strong>
          </p>
          <Button variant="contained" onClick={handleEditClick}>
            Edit Profile
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
