const { User, Team, Project, Task } = require('../models');
const auth = require('../utils/auth.js');
const { AuthenticationError } = require('apollo-server-express');

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
            return await Project.find({});
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
                return new AuthenticationError('email not found');
            }
            const corrPassword = await User.isCorrectPassword(password);
            if (!corrPassword) {
                return new AuthenticationError('Incorrect password');
            }
            // auth() function imported from utils directory
            const token = auth(user);
            return { user, token };
        },
        addUser: async (parent, { input }) => {
            const user = await User.create(input);
            const token = auth(user);

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
        addTask: async (parent, { input }) => {
            return Task.create(input);
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
