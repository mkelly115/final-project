import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { UPDATE_USER } from '../../utils/mutations';

const ProfileForm = () => {
  const { loading, error, data } = useQuery(QUERY_ME);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({});
  const [updateUser] = useMutation(UPDATE_USER);

  // Handle user data loading
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract user data
  const { me } = data;

  

  // Handle edit button click
  const handleEditClick = () => {
    setIsEditing(true);
    // Clone user data for editing
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
      });
      // After successful save, reset editing state
      setIsEditing(false);
      // Update user data in the component state
      setUserData({})
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  // Handle cancel button click
  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset user data to original values
    setUserData({});
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div>
      <h2>User Profile</h2>
      {isEditing ? (
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
          />
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            // value={userData.password}
            value={userData.password}
            onChange={handleChange}
          />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>
            <strong>First Name:</strong> {me.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {me.lastName}
          </p>
          <p>
            <strong>Email:</strong> {me.email}
          </p>
          <p>
            <strong>Password:</strong> {me.password}
          </p>
          <button onClick={handleEditClick}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;