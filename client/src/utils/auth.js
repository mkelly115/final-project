// Decodes a token and get the user's information from it
import decode from "jwt-decode";

// Defines a new class intended for representing a user.
class AuthService {
  // Get user data
  getProfile() {
    // Retrieves the user profile data from a JWT token by decoding the token using a decoding function
    return decode(this.getToken());
  }

  // Determine if a user is logged in by checking if there's a valid token
  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  // Checks if token is expired
  isTokenExpired(token) {
    try {
      // Decode the token to get its expiration time that was set by the server
      const decoded = decode(token);
      // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("id_token");
        return true;
      } else {
        // If token hasn't passed its expiration time, return `false`
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // Retrieves the user token from localStorage
  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    // this will reload the page and reset the state of the application
    window.location.reload();
  }
}

export default new AuthService();
