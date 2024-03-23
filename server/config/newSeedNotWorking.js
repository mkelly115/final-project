const mongoose = require("mongoose");
const { User, Team, Project, Task } = require("../models");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/project-3-test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
    taskStatus: "Pending",
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
    await Promise.all([
      User.deleteMany(),
      Team.deleteMany(),
      Project.deleteMany(),
      Task.deleteMany(),
    ]);

    // Insert sample data
    const createdUsers = await User.create(users);
    console.log("Users created:", createdUsers);
    const createdTeams = await Team.create(teams);
    console.log("Teams created:", createdTeams);
    const createdProjects = await Project.create(projects);
    console.log("Projects created:", createdProjects);
    const createdTasks = await Task.create(tasks);
    console.log("Tasks created:", createdTasks);

    // Assign users to teams
    for (let i = 0; i < users.length; i++) {
      if (i < 3) {
        // Frontend Development
        teams[0].members.push(users[i]._id);
        // Update user's team field
        await User.updateOne(
          { _id: users[i]._id },
          { $set: { team: createdTeams[0]._id } }
        );
      } else if (i >= 3 && i < 6) {
        // Backend Development
        teams[1].members.push(users[i]._id);
        // Update user's team field
        await User.updateOne(
          { _id: users[i]._id },
          { $set: { team: createdTeams[1]._id } }
        );
      } else if (i >= 6 && i < 9) {
        // Full-Stack Development
        teams[2].members.push(users[i]._id);
        // Update user's team field
        await User.updateOne(
          { _id: users[i]._id },
          { $set: { team: createdTeams[2]._id } }
        );
      } else if (i >= 9 && i < 12) {
        // UI/UX Design
        teams[3].members.push(users[i]._id);
        // Update user's team field
        await User.updateOne(
          { _id: users[i]._id },
          { $set: { team: createdTeams[3]._id } }
        );
      } else {
        // DevOps
        teams[4].members.push(users[i]._id);
        // Update user's team field
        await User.updateOne(
          { _id: users[i]._id },
          { $set: { team: createdTeams[4]._id } }
        );
      }
    }

    // Assign teams to projects and projects to teams
    try {
      // Your existing code that may throw an error
      console.log("Length of createdTeams:", createdTeams.length);
      console.log("Length of createdProjects:", createdProjects.length);
      for (let i = 0; i < createdTeams.length; i++) {
        console.log("Assigning team to project:", createdTeams[i]._id, "to", createdProjects[i]._id);
        console.log("createdTeams[i]:", createdTeams[i]);
        console.log("createdProjects[i]:", createdProjects[i]);
      }
    } catch (error) {
      console.error("Error occurred:", error.message);
    }

    // Associate tasks with projects
    await Project.updateOne(
      { name: "React Dashboard Development" },
      { $set: { tasks: [tasks[0]._id, tasks[1]._id, tasks[2]._id] } }
    );

    await Project.updateOne(
      { name: "Frontend Performance Optimization" },
      { $set: { tasks: [tasks[3]._id, tasks[4]._id, tasks[5]._id] } }
    );

    await Project.updateOne(
      { name: "API Gateway Implementation" },
      { $set: { tasks: [tasks[6]._id, tasks[7]._id, tasks[8]._id] } }
    );

    await Project.updateOne(
      { name: "Microservices Architecture Refactoring" },
      { $set: { tasks: [tasks[9]._id, tasks[10]._id, tasks[11]._id] } }
    );

    await Project.updateOne(
      { name: "Online Marketplace Platform Development" },
      { $set: { tasks: [tasks[12]._id, tasks[13]._id, tasks[14]._id] } }
    );

    await Project.updateOne(
      { name: "Social Media Integration" },
      { $set: { tasks: [tasks[15]._id, tasks[16]._id, tasks[17]._id] } }
    );

    await Project.updateOne(
      { name: "Website Redesign" },
      { $set: { tasks: [tasks[18]._id, tasks[19]._id, tasks[20]._id] } }
    );

    await Project.updateOne(
      { name: "Mobile App User Experience Enhancement" },
      { $set: { tasks: [tasks[21]._id, tasks[22]._id, tasks[23]._id] } }
    );

    await Project.updateOne(
      { name: "Cloud Migration Project" },
      { $set: { tasks: [tasks[24]._id, tasks[25]._id, tasks[26]._id] } }
    );

    await Project.updateOne(
      { name: "Infrastructure Automation Project" },
      { $set: { tasks: [tasks[27]._id, tasks[28]._id, tasks[29]._id] } }
    );

    // Assign tasks and projects to users
    // Iterate through each user and assign tasks and projects
    for (let i = 0; i < users.length; i++) {
      // Assuming each user corresponds to a task and project based on their index
      await User.updateOne(
        { email: users[i].email },
        {
          $set: {
            tasks: [createdTasks[i]._id], // Assuming createdTasks is populated correctly
            projects: [createdProjects[i] ? createdProjects[i]._id : null], // Assuming createdProjects is populated correctly
          },
        }
      );
    }

    // Assign assignedUser field to tasks
    // Iterate through each task and assign the assignedUser field
    for (let i = 0; i < tasks.length; i++) {
      // Assuming each task is assigned to a user based on their index
      await Task.updateOne(
        { _id: tasks[i]._id },
        { $set: { assignedUser: createdUsers[i]._id } }
      );
    }

    console.log("Database seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

// Call the seed function
seed();
