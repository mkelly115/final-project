const mongoose = require('mongoose');
const { User, Team, Project, Task } = require('../models');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/project-3-test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define sample data
const users = [
  { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password123' },
  { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', password: 'password456' },
  { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', password: 'password789' },
  { firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', password: 'password321' },
];

const teams = [
  { name: 'Team A', members: [] },
  { name: 'Team B', members: [] },
];

const projects = [
  { name: 'Project 1', projectStatus: 'In Progress', teams: [] },
  { name: 'Project 2', projectStatus: 'Completed', teams: [] },
];

const tasks = [
  { description: 'Task 1', taskStatus: 'Pending', dueDate: new Date() },
  { description: 'Task 2', taskStatus: 'Completed', dueDate: new Date() },
];

// Seed function
async function seed() {
  try {
    // Clear existing data
    await Promise.all([User.deleteMany(), Team.deleteMany(), Project.deleteMany(), Task.deleteMany()]);

    // Insert sample data
    const createdUsers = await User.create(users);
    const createdTeams = await Team.create(teams);
    const createdProjects = await Project.create(projects);
    const createdTasks = await Task.create(tasks);

    // Assign users to teams
    for (let i = 0; i < createdUsers.length; i++) {
      if (i < 2) {
        await Team.updateOne({ name: 'Team A' }, { $push: { members: createdUsers[i]._id } });
      } else {
        await Team.updateOne({ name: 'Team B' }, { $push: { members: createdUsers[i]._id } });
      }
    }

    // Assign teams to projects
    for (let i = 0; i < createdProjects.length; i++) {
      if (i === 0) {
        await Project.updateOne({ name: 'Project 1' }, { $push: { teams: createdTeams[0]._id } });
      } else {
        await Project.updateOne({ name: 'Project 2' }, { $push: { teams: createdTeams[1]._id } });
      }
    }

    // Associate tasks with projects
    await Project.updateOne({ name: 'Project 1' }, { $set: { tasks: [createdTasks[0]._id] } });
    await Project.updateOne({ name: 'Project 2' }, { $set: { tasks: [createdTasks[1]._id] } });

    // Assign tasks to users
    await User.updateOne({ email: 'john@example.com' }, { $set: { tasks: [createdTasks[0]._id] } });
    await User.updateOne({ email: 'jane@example.com' }, { $set: { tasks: [createdTasks[1]._id] } });
    await User.updateOne({ email: 'alice@example.com' }, { $set: { tasks: [createdTasks[0]._id] } });
    await User.updateOne({ email: 'bob@example.com' }, { $set: { tasks: [createdTasks[1]._id] } });

    console.log('Database seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Call the seed function
seed();