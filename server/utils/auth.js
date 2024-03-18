const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");


const secret = process.env.SECRET;
const expiration = process.env.EXPIRATION;

// Provides consistent error handling across the application for authentication-related issues.
module.exports = {
  AuthenticationError: new GraphQLError("Could not authenticate user.", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),

  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    // Separates Bearer from token value
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    // Handles cases where there is no authentication token provided with the request. 
    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (err) {
      console.error("Invalid token", err);
    }
    return req;
  },

  // Generates a JWT by creating a payload containing user data and signing it using a secret key, returning the token with an optional expiration time.
  signToken: function ({ email, _id }) {
    const payload = { email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
