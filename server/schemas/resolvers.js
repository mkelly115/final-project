const { User, Team, Project, Task } = require('../models');
const auth = require('../utils/auth.js');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({}).populate('');
        },
        user: async (parent, args) => {
            return await User.findById(args.id);
        },
        teams: async () => {
            return await Team.find({}).populate('');
        },
        team: async (parent, args) => {
            return await Team.findById(args.id);
        },
        projects: async () => {
            return await Project.find({}).populate('');
        },
        project: async (parent, args) => {
            return await Project.findById(args.id);
        },
        tasks: async () => {
            return await Task.find({}).populate('');
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
            const password = await User.isCorrectPassword(password);
            if (!password) {
                return new AuthenticationError('Incorrect password');
            }
            // auth() function imported from utils directory
            const token = auth(user);
            return { user, token };
        },
        addUser: async (parent, { firstName, lastName, email, password }) => {
            const user = await User.create({ firstName, lastName, email, password });
            const token = auth(user);

            return { user, token };
        },
        updateUser: async (parent, { userId, firstName, lastName, email, password }) => {
            return await User.findOneAndUpdate(
                { _id: userId },
                { firstName },
                { lastName },
                { email },
                { password },
                { new: true }
            );
        },
        removeUser: async (parent, { userId }) => {
            return User.findOneAndDelete({ _id: userId });
        },
        addProject: async (parent, { name }) => {
            return Project.create({ name });
        },
        updateProject: async (parent, { projectId, name, projectStatus }) => {
            return await Project.findOneAndUpdate(
                { _id: projectId },
                { name },
                { projectStatus},
                { new: true }
            );
        },
        removeProject: async (parent, { projectId }) => {
            return Project.findOneAndDelete({ _id: projectId });
        },
        addTask: async (parent, { description, taskStatus, dueDate }) => {
            return Task.create({ description, taskStatus, dueDate });
        },
        updateTask: async (parent, { taskId, description, taskStatus, dueDate }) => {
            return await Task.findOneAndUpdate(
                { _id: taskId },
                { description },
                { taskStatus },
                { dueDate },
                { new: true }
            );
        },
        removeTask: async (parent, { taskId }) => {
            return Task.findOneAndDelete({ _id: taskId });
        },
    }
};

module.exports = resolvers;