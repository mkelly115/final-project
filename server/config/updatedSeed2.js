const db = require("./connection");
const { User, Team, Project, Task } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {

  await cleanDB("User", "users");
  await cleanDB("Team", "teams");
  await cleanDB("Project", "projects");
  await cleanDB("Task", "tasks");

  const teams = await Team.insertMany([
    { name: 'Frontend Development' },
    { name: 'Backend Development' },
    { name: 'Full-Stack Development' },
    { name: 'UI/UX Design' },
    { name: 'DevOps' }
  ]);
  console.log("Teams Seeded");

  const tasks = await Task.insertMany([
    {
      description: "Implement user authentication functionality",
      taskStatus: "Pending",
      dateDue: "",
    },
    {
      description: "Design and develop data visualization components",
      taskStatus: "Completed",
      dateDue: "",
    },
    {
      description: "Integrate with backend APIs for data retrieval",
      taskStatus: "Created",
      dateDue: "",
    },
    {
      description: "Analyze and optimize bundle size",
      taskStatus: "In Progress",
      dateDue: "",
    },
    {
      description: "Implement lazy loading for images and components",
      taskStatus: "In Progress",
      dateDue: "",
    },
    {
      description: "Utilize caching mechanisms to improve page load times",
      taskStatus: "Pending",
      dateDue: "",
    },
    {
      description: "Set up API gateway infrastructure",
      taskStatus: "In Progress",
      dateDue: "",
    },
    {
      description: "Configure routing rules for different microservices",
      taskStatus: "Created",
      dateDue: "",
    },
    {
      description: "Implement security policies and rate limiting",
      taskStatus: "In Progress",
      dateDue: "",
    },
    {
      description: "Decompose monolithic application into microservices",
      taskStatus: "Completed",
      dateDue: "",
    },
    {
      description: "Define communication protocols between microservices",
      taskStatus: "In Progress",
      dateDue: "",
    },
    {
      description: "Implement service discovery and load balancing",
      taskStatus: "Pending",
      dateDue: "",
    },
    {
      description: "Design database schema for product listings",
      taskStatus: "Pending",
      dateDue: "",
    },
    {
      description: "Implement user registration and login functionality",
      taskStatus: "Completed",
      dateDue: "",
    },
    {
      description: "Develop product search and filtering features",
      taskStatus: "Created",
      dateDue: "",
    },
    {
      description:
        "Integrate platform with social media APIs for user authentication",
      taskStatus: "In Progress",
      dateDue: "",
    },
    {
      description: "Implement sharing functionalities for posts and products",
      taskStatus: "In Progress",
      dateDue: "",
    },
    {
      description: "Develop notification system for user interactions",
      taskStatus: "In Progress",
      dateDue: "",
    },
    {
      description: "Conduct user research and gather requirements",
      taskStatus: "In Progress",
      dateDue: "",
    },
    {
      description: "Create wireframes and prototypes for new design",
      taskStatus: "Created",
      dateDue: "",
    },
    {
      description:
        "Develop responsive UI components using modern design principles",
      taskStatus: "In Progress",
      dateDue: "",
    },
    {
      description: "Analyze user feedback and app usage data",
      taskStatus: "Completed",
      dateDue: "",
    },
    {
      description: "Refine navigation and user flows",
      taskStatus: "In Progress",
      dateDue: "",
    },
    {
      description: "Improve performance and responsiveness of the app",
      taskStatus: "Pending",
      dateDue: "",
    },
    {
      description:
        "Assess current infrastructure and identify migration candidates",
      taskStatus: "Pending",
      dateDue: "",
    },
    {
      description: "Plan migration strategy and prioritize workloads",
      taskStatus: "Completed",
      dateDue: "",
    },
    {
      description: "Execute migration process with minimal downtime",
      taskStatus: "Created",
      dateDue: "",
    },
    {
      description:
        "Implement Infrastructure as Code (IaC) using tools like Terraform",
      taskStatus: "In Progress",
      dateDue: "",
    },
    {
      description:
        "Automate provisioning and configuration of servers and services",
      taskStatus: "In Progress",
      dateDue: "",
    },
    {
      description:
        "Set up continuous integration and deployment pipelines for infrastructure changes",
      taskStatus: "Pending",
      dateDue: "",
    },
  ]);
  console.log("Tasks Seeded");

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

  await User.create({
      firstName: "John",
      lastName: "Doe",
      email: "jdoe@email.com",
      password: "password123",
      team: teams[0]._id,
      projects: [projects[0]._id, projects[1]._id],
      tasks: [tasks[0]._id, tasks[3]._id],
  });

  await User.create({
    firstName: "Jane",
    lastName: "Smith",
    email: "jsmith@email.com",
    password: "password123",
    team: teams[0]._id,
    projects: [projects[0]._id, projects[1]._id],
    tasks: [tasks[1]._id, tasks[4]._id],
});

await User.create({
  firstName: "Michael",
  lastName: "Johnson",
  email: "mjohnson@email.com",
  password: "password123",
  team: teams[0]._id,
  projects: [projects[0]._id, projects[1]._id],
  tasks: [tasks[2]._id, tasks[5]._id],
});

await User.create({
  firstName: "Emily",
  lastName: "Brown",
  email: "ebrown@email.com",
  password: "password123",
  team: teams[1]._id,
  projects: [projects[2]._id, projects[3]._id],
  tasks: [tasks[6]._id, tasks[9]._id],
});

await User.create({
  firstName: "David",
  lastName: "Williams",
  email: "dwilliams@email.com",
  password: "password123",
  team: teams[1]._id,
  projects: [projects[2]._id, projects[3]._id],
  tasks: [tasks[7]._id, tasks[10]._id],
});

await User.create({
  firstName: "Sarah",
  lastName: "Taylor",
  email: "staylor@email.com",
  password: "password123",
  team: teams[1]._id,
  projects: [projects[2]._id, projects[3]._id],
  tasks: [tasks[8]._id, tasks[11]._id],
});

await User.create({
  firstName: "James",
  lastName: "Wilson",
  email: "jwilson@email.com",
  password: "password123",
  team: teams[2]._id,
  projects: [projects[4]._id, projects[5]._id],
  tasks: [tasks[12]._id, tasks[15]._id],
});

await User.create({
  firstName: "Jessica",
  lastName: "Anderson",
  email: "janderson@email.com",
  password: "password123",
  team: teams[2]._id,
  projects: [projects[4]._id, projects[5]._id],
  tasks: [tasks[13]._id, tasks[16]._id],
});

await User.create({
  firstName: "Robert",
  lastName: "Martinez",
  email: "rmartinez@email.com",
  password: "password123",
  team: teams[2]._id,
  projects: [projects[4]._id, projects[5]._id],
  tasks: [tasks[14]._id, tasks[17]._id],
}); 

await User.create({
  firstName: "Jennifer",
  lastName: "Lopez",
  email: "jlopez@email.com",
  password: "password123",
  team: teams[3]._id,
  projects: [projects[6]._id, projects[7]._id],
  tasks: [tasks[18]._id, tasks[21]._id],
}); 

await User.create({
  firstName: "Emma",
  lastName: "Jones",
  email: "ejones@email.com",
  password: "password123",
  team: teams[3]._id,
  projects: [projects[6]._id, projects[7]._id],
  tasks: [tasks[19]._id, tasks[22]._id],
}); 

await User.create({
  firstName: "Joshua",
  lastName: "Brown",
  email: "jbrown@email.com",
  password: "password123",
  team: teams[3]._id,
  projects: [projects[6]._id, projects[7]._id],
  tasks: [tasks[20]._id, tasks[23]._id],
}); 
    
await User.create({
  firstName: "Maeve",
  lastName: "Wilson",
  email: "mwilson@email.com",
  password: "password123",
  team: teams[4]._id,
  projects: [projects[8]._id, projects[9]._id],
  tasks: [tasks[24]._id, tasks[27]._id],
}); 
  
await User.create({
  firstName: "Juan",
  lastName: "Martinez",
  email: "jmartinez@email.com",
  password: "password123",
  team: teams[4]._id,
  projects: [projects[8]._id, projects[9]._id],
  tasks: [tasks[25]._id, tasks[28]._id],
}); 

await User.create({
  firstName: "Kelly",
  lastName: "Garcia",
  email: "kgarcia@email.com",
  password: "password123",
  team: teams[4]._id,
  projects: [projects[8]._id, projects[9]._id],
  tasks: [tasks[26]._id, tasks[29]._id],
}); 

  console.log("Users Seeded");

  process.exit();
});