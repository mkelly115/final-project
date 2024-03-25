const db = require("./connection");
const { User, Team, Project, Task } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {

  await cleanDB("User", "users");
  await cleanDB("Team", "teams");
  await cleanDB("Project", "projects");
  await cleanDB("Task", "tasks");

  const teams = await Team.insertMany([
    {
      name: "Frontend Development",
      projects: [projects[0]._id, projects[1]._id],
      members: [
        {
          users: [users[0]._id, users[1]._id, users[2]._id],
        },
      ],
    },
    {
      name: "Backend Development",
      projects: [projects[2]._id, projects[3]._id],
      members: [
        {
          users: [users[3]._id, users[4]._id, users[5]._id],
        },
      ],
    },
    {
      name: "Full-Stack Development",
      projects: [projects[4]._id, projects[5]._id],
      members: [
        {
          users: [users[6]._id, users[7]._id, users[8]._id],
        },
      ],
    },
    {
      name: "UI/UX Design",
      projects: [projects[6]._id, projects[7]._id],
      members: [
        {
          users: [users[9]._id, users[10]._id, users[11]._id],
        },
      ],
    },
    {
      name: "DevOps",
      projects: [projects[8]._id, projects[9]._id],
      members: [
        {
          users: [users[12]._id, users[13]._id, users[14]._id],
        },
      ],
    },
  ]);
  console.log("Teams Seeded");

  const users = await User.insertMany([
    {
      firstName: "John",
      lastName: "Doe",
      email: "jdoe@email.com",
      password: "password123",
      team: teams[0]._id,
      projects: [projects[0]._id, projects[1]._id],
      tasks: [tasks[0]._id, tasks[3]._id],
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jsmith@email.com",
      password: "password123",
      team: teams[0]._id,
      projects: [projects[0]._id, projects[1]._id],
      tasks: [tasks[1]._id, tasks[4]._id],
    },
    {
      firstName: "Michael",
      lastName: "Johnson",
      email: "mjohnson@email.com",
      password: "password123",
      team: teams[0]._id,
      projects: [projects[0]._id, projects[1]._id],
      tasks: [tasks[2]._id, tasks[5]._id],
    },
    {
      firstName: "Emily",
      lastName: "Brown",
      email: "ebrown@email.com",
      password: "password123",
      team: teams[1]._id,
      projects: [projects[2]._id, projects[3]._id],
      tasks: [tasks[6]._id, tasks[9]._id],
    },
    {
      firstName: "David",
      lastName: "Williams",
      email: "dwilliams@email.com",
      password: "password123",
      team: teams[1]._id,
      projects: [projects[2]._id, projects[3]._id],
      tasks: [tasks[7]._id, tasks[10]._id],
    },
    {
      firstName: "Sarah",
      lastName: "Taylor",
      email: "staylor@email.com",
      password: "password123",
      team: teams[1]._id,
      projects: [projects[2]._id, projects[3]._id],
      tasks: [tasks[8]._id, tasks[11]._id],
    },
    {
      firstName: "James",
      lastName: "Wilson",
      email: "jwilson@email.com",
      password: "password123",
      team: teams[2]._id,
      projects: [projects[4]._id, projects[5]._id],
      tasks: [tasks[12]._id, tasks[15]._id],
    },
    {
      firstName: "Jessica",
      lastName: "Anderson",
      email: "janderson@email.com",
      password: "password123",
      team: teams[2]._id,
      projects: [projects[4]._id, projects[5]._id],
      tasks: [tasks[13]._id, tasks[16]._id],
    },
    {
      firstName: "Robert",
      lastName: "Martinez",
      email: "rmartinez@email.com",
      password: "password123",
      team: teams[2]._id,
      projects: [projects[4]._id, projects[5]._id],
      tasks: [tasks[14]._id, tasks[17]._id],
    },
    {
      firstName: "Jennifer",
      lastName: "Lopez",
      email: "jlopez@email.com",
      password: "password123",
      team: teams[3]._id,
      projects: [projects[6]._id, projects[7]._id],
      tasks: [tasks[18]._id, tasks[21]._id],
    },
    {
      firstName: "Emma",
      lastName: "Jones",
      email: "ejones@email.com",
      password: "password123",
      team: teams[3]._id,
      projects: [projects[6]._id, projects[7]._id],
      tasks: [tasks[19]._id, tasks[22]._id],
    },
    {
      firstName: "Joshua",
      lastName: "Brown",
      email: "jbrown@email.com",
      password: "password123",
      team: teams[3]._id,
      projects: [projects[6]._id, projects[7]._id],
      tasks: [tasks[20]._id, tasks[23]._id],
    },
    {
      firstName: "Maeve",
      lastName: "Wilson",
      email: "mwilson@email.com",
      password: "password123",
      team: teams[4]._id,
      projects: [projects[8]._id, projects[9]._id],
      tasks: [tasks[24]._id, tasks[27]._id],
    },
    {
      firstName: "Juan",
      lastName: "Martinez",
      email: "jmartinez@email.com",
      password: "password123",
      team: teams[4]._id,
      projects: [projects[8]._id, projects[9]._id],
      tasks: [tasks[25]._id, tasks[28]._id],
    },
    {
      firstName: "Kelly",
      lastName: "Garcia",
      email: "kgarcia@email.com",
      password: "password123",
      team: teams[4]._id,
      projects: [projects[8]._id, projects[9]._id],
      tasks: [tasks[26]._id, tasks[29]._id],
    },
  ]);

  console.log("Users Seeded");

  const projects = await Project.insertMany([
    {
      name: "React Dashboard Development",
      projectStatus: "In Progress",
      dateDue: "",
      team: teams[0]._id,
      tasks: [tasks[0]._id, tasks[1]._id, tasks[2]._id],
    },
    {
      name: "Frontend Performance Optimization",
      projectStatus: "Created",
      dateDue: "",
      team: teams[0]._id,
      tasks: [tasks[3]._id, tasks[4]._id, tasks[5]._id],
    },
    {
      name: "API Gateway Implementation",
      projectStatus: "Created",
      dateDue: "",
      team: teams[1]._id,
      tasks: [tasks[6]._id, tasks[7]._id, tasks[8]._id],
    },
    {
      name: "Microservices Architecture Refactoring",
      projectStatus: "Pending",
      dateDue: "",
      team: teams[1]._id,
      tasks: [tasks[9]._id, tasks[10]._id, tasks[11]._id],
    },
    {
      name: "Online Marketplace Platform Development",
      projectStatus: "In Progress",
      dateDue: "",
      team: teams[2]._id,
      tasks: [tasks[12]._id, tasks[13]._id, tasks[14]._id],
    },
    {
      name: "Social Media Integration",
      projectStatus: "In Progress",
      dateDue: "",
      team: teams[2]._id,
      tasks: [tasks[15]._id, tasks[16]._id, tasks[17]._id],
    },
    {
      name: "Website Redesign",
      projectStatus: "Created",
      dateDue: "",
      team: teams[3]._id,
      tasks: [tasks[18]._id, tasks[19]._id, tasks[20]._id],
    },
    {
      name: "Mobile App User Experience Enhancement",
      projectStatus: "Pending",
      dateDue: "",
      team: teams[3]._id,
      tasks: [tasks[21]._id, tasks[22]._id, tasks[23]._id],
    },
    {
      name: "Cloud Migration Project",
      projectStatus: "In Progress",
      dateDue: "",
      team: teams[4]._id,
      tasks: [tasks[24]._id, tasks[25]._id, tasks[26]._id],
    },
    {
      name: "Infrastructure Automation Project",
      projectStatus: "Created",
      dateDue: "",
      team: teams[4]._id,
      tasks: [tasks[27]._id, tasks[28]._id, tasks[29]._id],
    },
  ]);
  console.log("Projects Seeded");

  const tasks = await Task.insertMany([
    {
      description: "Implement user authentication functionality",
      taskStatus: "Pending",
      dateDue: "",
      assignedUser: {
        users: users[0]._id,
      },
    },
    {
      description: "Design and develop data visualization components",
      taskStatus: "Completed",
      dateDue: "",
      assignedUser: {
        users: users[1]._id,
      },
    },
    {
      description: "Integrate with backend APIs for data retrieval",
      taskStatus: "Created",
      dateDue: "",
      assignedUser: {
        users: users[2]._id,
      },
    },
    {
      description: "Analyze and optimize bundle size",
      taskStatus: "In Progress",
      dateDue: "",
      assignedUser: {
        users: users[0]._id,
      },
    },
    {
      description: "Implement lazy loading for images and components",
      taskStatus: "In Progress",
      dateDue: "",
      assignedUser: {
        users: users[1]._id,
      },
    },
    {
      description: "Utilize caching mechanisms to improve page load times",
      taskStatus: "Pending",
      dateDue: "",
      assignedUser: {
        users: users[2]._id,
      },
    },
    {
      description: "Set up API gateway infrastructure",
      taskStatus: "In Progress",
      dateDue: "",
      assignedUser: {
        users: users[3]._id,
      },
    },
    {
      description: "Configure routing rules for different microservices",
      taskStatus: "Created",
      dateDue: "",
      assignedUser: {
        users: users[4]._id,
      },
    },
    {
      description: "Implement security policies and rate limiting",
      taskStatus: "In Progress",
      dateDue: "",
      assignedUser: {
        users: users[5]._id,
      },
    },
    {
      description: "Decompose monolithic application into microservices",
      taskStatus: "Completed",
      dateDue: "",
      assignedUser: {
        users: users[3]._id,
      },
    },
    {
      description: "Define communication protocols between microservices",
      taskStatus: "In Progress",
      dateDue: "",
      assignedUser: {
        users: users[4]._id,
      },
    },
    {
      description: "Implement service discovery and load balancing",
      taskStatus: "Pending",
      dateDue: "",
      assignedUser: {
        users: users[5]._id,
      },
    },
    {
      description: "Design database schema for product listings",
      taskStatus: "Pending",
      dateDue: "",
      assignedUser: {
        users: users[6]._id,
      },
    },
    {
      description: "Implement user registration and login functionality",
      taskStatus: "Completed",
      dateDue: "",
      assignedUser: {
        users: users[7]._id,
      },
    },
    {
      description: "Develop product search and filtering features",
      taskStatus: "Created",
      dateDue: "",
      assignedUser: {
        users: users[8]._id,
      },
    },
    {
      description:
        "Integrate platform with social media APIs for user authentication",
      taskStatus: "In Progress",
      dateDue: "",
      assignedUser: {
        users: users[6]._id,
      },
    },
    {
      description: "Implement sharing functionalities for posts and products",
      taskStatus: "In Progress",
      dateDue: "",
      assignedUser: {
        users: users[7]._id,
      },
    },
    {
      description: "Develop notification system for user interactions",
      taskStatus: "In Progress",
      dateDue: "",
      assignedUser: {
        users: users[8]._id,
      },
    },
    {
      description: "Conduct user research and gather requirements",
      taskStatus: "In Progress",
      dateDue: "",
      assignedUser: {
        users: users[9]._id,
      },
    },
    {
      description: "Create wireframes and prototypes for new design",
      taskStatus: "Created",
      dateDue: "",
      assignedUser: {
        users: users[10]._id,
      },
    },
    {
      description:
        "Develop responsive UI components using modern design principles",
      taskStatus: "In Progress",
      dateDue: "",
      assignedUser: {
        users: users[11]._id,
      },
    },
    {
      description: "Analyze user feedback and app usage data",
      taskStatus: "Completed",
      dateDue: "",
      assignedUser: {
        users: users[9]._id,
      },
    },
    {
      description: "Refine navigation and user flows",
      taskStatus: "In Progress",
      dateDue: "",
      assignedUser: {
        users: users[10]._id,
      },
    },
    {
      description: "Improve performance and responsiveness of the app",
      taskStatus: "Pending",
      dateDue: "",
      assignedUser: {
        users: users[11]._id,
      },
    },
    {
      description:
        "Assess current infrastructure and identify migration candidates",
      taskStatus: "Pending",
      dateDue: "",
      assignedUser: {
        users: users[12]._id,
      },
    },
    {
      description: "Plan migration strategy and prioritize workloads",
      taskStatus: "Completed",
      dateDue: "",
      assignedUser: {
        users: users[13]._id,
      },
    },
    {
      description: "Execute migration process with minimal downtime",
      taskStatus: "Created",
      dateDue: "",
      assignedUser: {
        users: users[14]._id,
      },
    },
    {
      description:
        "Implement Infrastructure as Code (IaC) using tools like Terraform",
      taskStatus: "In Progress",
      dateDue: "",
      assignedUser: {
        users: users[12]._id,
      },
    },
    {
      description:
        "Automate provisioning and configuration of servers and services",
      taskStatus: "In Progress",
      dateDue: "",
      assignedUser: {
        users: users[13]._id,
      },
    },
    {
      description:
        "Set up continuous integration and deployment pipelines for infrastructure changes",
      taskStatus: "Pending",
      dateDue: "",
      assignedUser: {
        users: users[14]._id,
      },
    },
  ]);
  console.log("Tasks Seeded");

  process.exit();
});
