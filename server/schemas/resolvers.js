const { User, Team, Project, Task } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({}).populate('projects');
        },
        user: async (parent, args) => {
            return await User.findById(args.id);
        },
        teams: async () => {
            return await Team.find({}).populate('projects');
        },
        team: async (parent, args) => {
            return await Team.findById(args.id);
        },
        projects: async () => {
            return await Project.find({}).populate({
                path: 'teams',
                populate: {
                    path: 'members',
                    model: 'User' 
                }
            }).populate('tasks'); 
        },
        project: async (parent, args) => {
            return await Project.findById(args.id);
        },
        tasks: async () => {
            return await Task.find({});
        },
        task: async (parent, args) => {
            return await Task.findById(args.id);
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
            const user = await User.create(input);
            const token = signToken(user);

            return { user, token };
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
              path: 'projects',
              populate: {
                path: 'tasks',
                model: 'Task',
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
    }
};

module.exports = resolvers;
