const { User, Team, Project, Task } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id })
          .populate("projects")
          .populate("tasks")
          .populate("team");
      }
      throw AuthenticationError;
    },
    users: async () => {
      return await User.find({})
        .populate("projects")
        .populate("tasks")
        .populate("team");
    },
    user: async (parent, args) => {
      return await User.findById(args.id)
        .populate("projects")
        .populate("tasks");
    },
    teams: async () => {
      return await Team.find({}).populate("projects").populate("members");
    },
    team: async (parent, args) => {
      return await Team.findById(args.id)
        .populate("projects")
        .populate("members");
    },
    projects: async () => {
      return await Project.find({})
        .populate({
          path: "team",
          populate: {
            path: "members",
            model: "User",
          },
        })
        .populate({
          path: "tasks",
          populate: {
            path: "assignedUser",
            model: "User",
          },
        })
        .populate("team");
    },
    project: async (parent, args) => {
      return await Project.findById(args.id).populate({
        path: "tasks",
        populate: { path: "assignedUser" },
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
      const { teamId, ...userData } = input;

      try {
        // Create the user with the provided data
        const user = await User.create(userData);

        // If teamId is provided, associate the user with the team
        if (teamId) {
          // Fetch the team based on the provided teamId
          const team = await Team.findById(teamId);
          if (!team) {
            throw new Error("Team not found");
          }

          // Associate the user with the team
          user.team = team;
          await user.save();
        }

        // Return the created user
        const token = signToken(user);
        return { user, token };
      } catch (error) {
        // Handle any errors
        throw new Error("Failed to add user");
      }
    },

    updateUser: async (parent, { userId, input }, context) => {
      try {
        if (input.password) {
          input.password = await bcrypt.hash(input.password, 10);
        }

        const user = await User.findOneAndUpdate({ _id: userId }, input);

        return user; // Return the updated user
      } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Error updating user");
      }
    },

    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },

    addProject: async (parent, { input }) => {
      // Destructure input fields
      const { teamId, ...projectData } = input;
      console.log(input);
      try {
        // Create the project with the provided data
        const project = await Project.create(projectData);

        // If teamId is provided, associate the user with the team
        if (teamId) {
          // Fetch the team based on the provided teamId
          const team = await Team.findById(teamId);
          if (!team) {
            throw new Error("Team not found");
          }
          console.log("Retrieved Team:", team);
          //Associate the project with the team
          project.team = team;
          console.log("Project before association:", project);
          await project.save();
          console.log("Project after association:", project);
        }
        return project;
      } catch (error) {
        throw new Error(`Failed to create project: ${error.message}`);
      }
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
      try {
        // Create the task with the provided input
        const task = await Task.create(input);
    
        // Fetch the project based on the provided projectId
        const project = await Project.findById(projectId);
        if (!project) {
          throw new Error("Project not found");
        }
    
        // Associate the task with the project
        project.tasks.push(task);
        await project.save();
    
        // Fetch the assigned user based on the provided input
        const assignedUser = await User.findById(input.assignedUserId);
        if (!assignedUser) {
          throw new Error("Assigned user not found");
        }
    
        // Set the assigned user for the task
        task.assignedUser = assignedUser;
        await task.save();
    
        // Return the task with the assigned user
        return {
          ...task.toObject(),
          assignedUser,
        };
      } catch (error) {
        throw new Error(`Failed to create task: ${error.message}`);
      }
    },
    updateTask: async (parent, { taskId, input }) => {
      try {
        const existingTask = await Task.findById(taskId);
        if (!existingTask) {
          throw new Error("Task not found");
        }
    
        const assignedUserId = existingTask.assignedUser;
    
        const updatedTask = await Task.findOneAndUpdate(
          { _id: taskId },
          { $set: { ...input, assignedUser: assignedUserId } },
          { new: true }
        );
    
        return updatedTask;
      } catch (error) {
        console.error("Error updating task:", error);
        throw new Error("Error updating task");
      }
    },
    removeTask: async (parent, { taskId }) => {
      return Task.findOneAndDelete({ _id: taskId });
    },
  },
};

module.exports = resolvers;
