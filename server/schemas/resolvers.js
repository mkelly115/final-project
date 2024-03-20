const { User, Team, Project, Task } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate("projects").populate("tasks").populate("team");
    },
    user: async (parent, args) => {
      return await User.findById(args.id).populate("projects").populate("tasks");
    },
    teams: async () => {
      return await Team.find({}).populate("projects").populate("members");
    },
    team: async (parent, args) => {
      return await Team.findById(args.id).populate("members");
    },
    projects: async () => {
      return await Project.find({})
        .populate({
          path: "teams",
          populate: {
            path: "members",
            model: "User",
          },
        })
        .populate("tasks");
    },
    project: async (parent, args) => {
      return await Project.findById(args.id).populate({
        path: 'tasks',
        populate: { path: 'assignedUser' } 
      });
    },
    tasks: async () => {
      return await Task.find({}).populate("assignedUser").exec();
    },
    task: async (parent, args) => {
      return await Task.findById(args.id).populate("assignedUser");
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }

      const corrPassword = await user.isCorrectPassword(password);
      if (!corrPassword) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { user, token };
    },
    addUser: async (parent, { input }) => {
      // Destructure input to extract teamId
      // const { teamId, userData } = input;

      try {
        // Create the user with the provided data
        const user = await User.create(input);

        // If teamId is provided, associate the user with the team
        // if (user.teamId) {
          // Fetch the team based on the provided teamId
          // const team = await Team.findById(user.teamId);
          // if (!team) {
            // throw new Error("Team not found");
          // }

          // Associate the user with the team
          // user.team = team;
          // await user.save();
        // }

        // Return the created user
        const token = signToken(user);
        return { user, token };
      } catch (error) {
        // Handle any errors
        throw new Error("Failed to add user");
      }
    },
    updateUser: async (parent, { userId, input }) => {
      return await User.findOneAndUpdate(
        { _id: userId },
        { $set: input },
        { new: true }
      );
    },
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
    addProject: async (parent, { input }) => {
      return Project.create(input);
    },
    updateProject: async (parent, { projectId, input }) => {
      return await Project.findOneAndUpdate(
        { _id: projectId },
        { $set: input },
        { new: true }
      );
    },
    removeProject: async (parent, { projectId }) => {
      return Project.findOneAndDelete({ _id: projectId });
    },
    // addTask: async (parent, { input }) => {
    //     return Task.create(input);
    // },
    addTask: async (parent, { projectId, input }) => {
      // Your logic to create the task and associate it with the project
      const task = await Task.create(input);

      // Fetch the project based on the provided projectId
      const project = await Project.findById(projectId);

      // Associate the task with the project
      project.tasks.push(task);
      await project.save();

      // Fetch the assigned user based on the input
      const user = await User.findById(input.assignedUserId).populate({
        path: "projects",
        populate: {
          path: "tasks",
          model: "Task",
        },
      });

      // Return the task with the assigned user
      return {
        ...task.toObject(),
        assignedUser: user,
      };
    },
    updateTask: async (parent, { taskId, input }) => {
      return await Task.findOneAndUpdate(
        { _id: taskId },
        { $set: input },
        { new: true }
      );
    },
    removeTask: async (parent, { taskId }) => {
      return Task.findOneAndDelete({ _id: taskId });
    },
  },
};

module.exports = resolvers;
