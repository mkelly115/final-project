const mongoose = require('mongoose');
const { User, Team, Project, Task } = require('../models');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/project-3-test', {
  useNewUrlParser: false,
  useUnifiedTopology: false,
});



// Define sample data
const users = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "jdoe@email.com",
    password: "password123",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jsmith@email.com",
    password: "password123",
  },
  {
    firstName: "Michael",
    lastName: "Johnson",
    email: "mjohnson@email.com",
    password: "password123",
  },
  {
    firstName: "Emily",
    lastName: "Brown",
    email: "ebrown@email.com",
    password: "password123",
  },
  {
    firstName: "David",
    lastName: "Williams",
    email: "dwilliams@email.com",
    password: "password123",
  },
  {
    firstName: "Sarah",
    lastName: "Taylor",
    email: "staylor@email.com",
    password: "password123",
  },
  {
    firstName: "James",
    lastName: "Wilson",
    email: "jwilson@email.com",
    password: "password123",
  },
  {
    firstName: "Jessica",
    lastName: "Anderson",
    email: "janderson@email.com",
    password: "password123",
  },
  {
    firstName: "Robert",
    lastName: "Martinez",
    email: "rmartinez@email.com",
    password: "password123",
  },
  {
    firstName: "Jennifer",
    lastName: "Lopez",
    email: "jlopez@email.com",
    password: "password123",
  },
  {
    firstName: "Emma",
    lastName: "Jones",
    email: "ejones@email.com",
    password: "password123",
  },
  {
    firstName: "Joshua",
    lastName: "Brown",
    email: "jbrown@email.com",
    password: "password123",
  },
  {
    firstName: "Maeve",
    lastName: "Wilson",
    email: "mwilson@email.com",
    password: "password123",
  },
  {
    firstName: "Juan",
    lastName: "Martinez",
    email: "jmartinez@email.com",
    password: "password123",
  },
  {
    firstName: "Kelly",
    lastName: "Garcia",
    email: "kgarcia@email.com",
    password: "password123",
  },
];

const teams = [
  { name: "Frontend Development", members: [] },
  { name: "Backend Development", members: [] },
  { name: "Full-Stack Development", members: [] },
  { name: "UI/UX Design", members: [] },
  { name: "DevOps", members: [] },
];

const projects = [
  {
    name: "React Dashboard Development",
    projectStatus: "In Progress",
    team: [],
  },
  {
    name: "Frontend Performance Optimization",
    projectStatus: "Created",
    team: [],
  },
  { name: "API Gateway Implementation", projectStatus: "Created", team: [] },
  {
    name: "Microservices Architecture Refactoring",
    projectStatus: "Pending",
    team: [],
  },
  {
    name: "Online Marketplace Platform Development",
    projectStatus: "In Progress",
    team: [],
  },
  { name: "Social Media Integration", projectStatus: "In Progress", team: [] },

  { name: "Website Redesign", projectStatus: "Created", team: [] },
  {
    name: "Mobile App User Experience Enhancement",
    projectStatus: "Pending",
    team: [],
  },
  { name: "Cloud Migration Project", projectStatus: "In Progress", team: [] },
  {
    name: "Infrastructure Automation Project",
    projectStatus: "Created",
    team: [],
  },
];

const tasks = [
  {
    description: "Implement user authentication functionality",
    taskStatus: "Pending",
    dueDate: new Date(),
  },
  {
    description: "Design and develop data visualization components",
    taskStatus: "Completed",
    dueDate: new Date(),
  },
  {
    description: "Integrate with backend APIs for data retrieval",
    taskStatus: "Created",
    dueDate: new Date(),
  },
  {
    description: "Analyze and optimize bundle size",
    taskStatus: "In Progress",
    dueDate: new Date(),
  },
  {
    description: "Implement lazy loading for images and components",
    taskStatus: "In Progress",
    dueDate: new Date(),
  },
  {
    description: "Utilize caching mechanisms to improve page load times",
    taskStatus: "Pending",
    dueDate: new Date(),
  },
  {
    description: "Set up API gateway infrastructure",
    taskStatus: "In Progress",
    dueDate: new Date(),
  },
  {
    description: "Configure routing rules for different microservices",
    taskStatus: "Created",
    dueDate: new Date(),
  },
  {
    description: "Implement security policies and rate limiting",
    taskStatus: "In Progress",
    dueDate: new Date(),
  },
  {
    description: "Decompose monolithic application into microservices",
    taskStatus: "Completed",
    dueDate: new Date(),
  },
  {
    description: "Define communication protocols between microservices",
    taskStatus: "In Progress",
    dueDate: new Date(),
  },
  {
    description: "Implement service discovery and load balancing",
    taskStatus: "Pending",
    dueDate: new Date(),
  },
  {
    description: "Design database schema for product listings",
    taskStatus: "Pending",
    dueDate: new Date(),
  },
  {
    description: "Implement user registration and login functionality",
    taskStatus: "Completed",
    dueDate: new Date(),
  },
  {
    description: "Develop product search and filtering features",
    taskStatus: "Created",
    dueDate: new Date(),
  },
  {
    description:
      "Integrate platform with social media APIs for user authentication",
    taskStatus: "In Progress",
    dueDate: new Date(),
  },
  {
    description: "Implement sharing functionalities for posts and products",
    taskStatus: "In Progress",
    dueDate: new Date(),
  },
  {
    description: "Develop notification system for user interactions",
    taskStatus: "In Progress",
    dueDate: new Date(),
  },
  {
    description: "Conduct user research and gather requirements",
    taskStatus: "In Progress",
    dueDate: new Date(),
  },
  {
    description: "Create wireframes and prototypes for new design",
    taskStatus: "Created",
    dueDate: new Date(),
  },
  {
    description:
      "Develop responsive UI components using modern design principles",
    taskStatus: "In Progress",
    dueDate: new Date(),
  },
  {
    description: "Analyze user feedback and app usage data",
    taskStatus: "Completed",
    dueDate: new Date(),
  },
  {
    description: "Refine navigation and user flows",
    taskStatus: "In Progress",
    dueDate: new Date(),
  },
  {
    description: "Improve performance and responsiveness of the app",
    taskStatus: "Pending",
    dueDate: new Date(),
  },
  {
    description:
      "Assess current infrastructure and identify migration candidates",
    taskStatus: "Pending",
    dueDate: new Date(),
  },
  {
    description: "Plan migration strategy and prioritize workloads",
    taskStatus: "Completed",
    dueDate: new Date(),
  },
  {
    description: "Execute migration process with minimal downtime",
    taskStatus: "Created",
    dueDate: new Date(),
  },
  {
    description:
      "Implement Infrastructure as Code (IaC) using tools like Terraform",
    taskStatus: "In Progress",
    dueDate: new Date(),
  },
  {
    description:
      "Automate provisioning and configuration of servers and services",
    taskStatus: "In Progress",
    dueDate: new Date(),
  },
  {
    description:
      "Set up continuous integration and deployment pipelines for infrastructure changes",
    taskStatus: "Pending",
    dueDate: new Date(),
  },
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
      const teamIndex = i % createdTeams.length;
      await Team.updateOne({ _id: createdTeams[teamIndex]._id }, { $push: { members: createdUsers[i]._id } });
      await User.updateOne({ _id: createdUsers[i]._id }, { $set: { team: createdTeams[teamIndex]._id } });
    }

    // Assign teams to projects and projects to teams
    for (let i = 0; i < createdProjects.length; i++) {
      const teamIndex = i % createdTeams.length;
      await Project.updateOne({ _id: createdProjects[i]._id }, { $push: { team: createdTeams[teamIndex]._id } });
      await Team.updateOne({ _id: createdTeams[teamIndex]._id }, { $push: { projects: createdProjects[i]._id } });
    }

    // Associate tasks with projects
    for (let i = 0; i < createdTasks.length; i++) {
      const projectIndex = i % createdProjects.length;
      await Project.updateOne({ _id: createdProjects[projectIndex]._id }, { $push: { tasks: createdTasks[i]._id } });
    }

    // Assign tasks and projects to users
    for (let i = 0; i < createdUsers.length; i++) {
      const teamIndex = i % createdTeams.length;
      const projectIndex = teamIndex * 2; // Each team has two projects
      const taskIndex1 = i * 2; // First task for user
      const taskIndex2 = i * 2 + 1; // Second task for user

      await User.updateOne(
        { _id: createdUsers[i]._id },
        {
          $set: {
            tasks: [createdTasks[taskIndex1]._id, createdTasks[taskIndex2]._id],
            projects: [createdProjects[projectIndex]._id, createdProjects[projectIndex + 1]._id],
          },
        }
      );
    }


    // Assign assignedUser field to tasks
    for (let i = 0; i < createdTasks.length; i++) {
      const userIndex = i % createdUsers.length;
      await Task.updateOne(
        { _id: createdTasks[i]._id },
        { $set: { assignedUser: createdUsers[userIndex]._id } }
      );
    }

    console.log('Database seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();