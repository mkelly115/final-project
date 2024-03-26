const db = require("./connection");
const { User, Team, Project, Task } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("User", "users");
  await cleanDB("Team", "teams");
  await cleanDB("Project", "projects");
  await cleanDB("Task", "tasks");

  const teams = await Team.insertMany([
    { name: "Frontend Development" },
    { name: "Backend Development" },
    { name: "Full-Stack Development" },
    { name: "UI/UX Design" },
    { name: "DevOps" },
  ]);
  console.log("Teams Seeded");

  const tasks = await Task.insertMany([
    {
      description: "Implement user authentication functionality",
      taskStatus: "In Progress",
      dateDue: "05/04/2024",
    },
    {
      description: "Design and develop data visualization components",
      taskStatus: "Completed",
      dateDue: "03/20/2024",
    },
    {
      description: "Integrate with backend APIs for data retrieval",
      taskStatus: "In Progress",
      dateDue: "03/28/2024",
    },
    {
      description: "Analyze and optimize bundle size",
      taskStatus: "In Progress",
      dateDue: "06/30/2024",
    },
    {
      description: "Implement lazy loading for images and components",
      taskStatus: "In Progress",
      dateDue: "04/04/2024",
    },
    {
      description: "Utilize caching mechanisms to improve page load times",
      taskStatus: "Pending",
      dateDue: "05/08/2024",
    },
    {
      description: "Set up API gateway infrastructure",
      taskStatus: "In Progress",
      dateDue: "08/10/2024",
    },
    {
      description: "Configure routing rules for different microservices",
      taskStatus: "In Progress",
      dateDue: "06/15/2024",
    },
    {
      description: "Implement security policies and rate limiting",
      taskStatus: "In Progress",
      dateDue: "07/07/2024",
    },
    {
      description: "Decompose monolithic application into microservices",
      taskStatus: "Completed",
      dateDue: "03/15/2024",
    },
    {
      description: "Define communication protocols between microservices",
      taskStatus: "In Progress",
      dateDue: "04/01/2024",
    },
    {
      description: "Implement service discovery and load balancing",
      taskStatus: "In Progress",
      dateDue: "06/27/2024",
    },
    {
      description: "Design database schema for product listings",
      taskStatus: "In Progress",
      dateDue: "05/22/2024",
    },
    {
      description: "Implement user registration and login functionality",
      taskStatus: "Completed",
      dateDue: "02/12/2024",
    },
    {
      description: "Develop product search and filtering features",
      taskStatus: "In Progress",
      dateDue: "03/29/2024",
    },
    {
      description:
        "Integrate platform with social media APIs for user authentication",
      taskStatus: "In Progress",
      dateDue: "06/19/2024",
    },
    {
      description: "Implement sharing functionalities for posts and products",
      taskStatus: "In Progress",
      dateDue: "05/20/2024",
    },
    {
      description: "Develop notification system for user interactions",
      taskStatus: "In Progress",
      dateDue: "07/24/2024",
    },
    {
      description: "Conduct user research and gather requirements",
      taskStatus: "In Progress",
      dateDue: "06/17/2024",
    },
    {
      description: "Create wireframes and prototypes for new design",
      taskStatus: "In Progress",
      dateDue: "08/16/2024",
    },
    {
      description:
        "Develop responsive UI components using modern design principles",
      taskStatus: "In Progress",
      dateDue: "07/14/2024",
    },
    {
      description: "Analyze user feedback and app usage data",
      taskStatus: "Completed",
      dateDue: "3/08/2024",
    },
    {
      description: "Refine navigation and user flows",
      taskStatus: "In Progress",
      dateDue: "03/30/2024",
    },
    {
      description: "Improve performance and responsiveness of the app",
      taskStatus: "Pending",
      dateDue: "06/23/2024",
    },
    {
      description:
        "Assess current infrastructure and identify migration candidates",
      taskStatus: "In Progress",
      dateDue: "04/20/2024",
    },
    {
      description: "Plan migration strategy and prioritize workloads",
      taskStatus: "Completed",
      dateDue: "03/01/2024",
    },
    {
      description: "Execute migration process with minimal downtime",
      taskStatus: "In Progress",
      dateDue: "07/05/2024",
    },
    {
      description:
        "Implement Infrastructure as Code (IaC) using tools like Terraform",
      taskStatus: "In Progress",
      dateDue: "05/11/2024",
    },
    {
      description:
        "Automate provisioning and configuration of servers and services",
      taskStatus: "In Progress",
      dateDue: "03/27/2024",
    },
    {
      description:
        "Set up continuous integration and deployment pipelines for infrastructure changes",
      taskStatus: "In Progress",
      dateDue: "8/12/2024",
    },
  ]);
  console.log("Tasks Seeded");

  const projects = await Project.insertMany([
    {
      name: "React Dashboard Development",
      projectStatus: "In Progress",
      dateDue: "10/05/2024",
      team: teams[0]._id,
      tasks: [tasks[0]._id, tasks[1]._id, tasks[2]._id],
    },
    {
      name: "Frontend Performance Optimization",
      projectStatus: "In Progress",
      dateDue: "11/18/2024",
      team: teams[0]._id,
      tasks: [tasks[3]._id, tasks[4]._id, tasks[5]._id],
    },
    {
      name: "API Gateway Implementation",
      projectStatus: "In Progress",
      dateDue: "10/26/2024",
      team: teams[1]._id,
      tasks: [tasks[6]._id, tasks[7]._id, tasks[8]._id],
    },
    {
      name: "Microservices Architecture Refactoring",
      projectStatus: "In Progress",
      dateDue: "12/07/2024",
      team: teams[1]._id,
      tasks: [tasks[9]._id, tasks[10]._id, tasks[11]._id],
    },
    {
      name: "Online Marketplace Platform Development",
      projectStatus: "In Progress",
      dateDue: "10/12/2024",
      team: teams[2]._id,
      tasks: [tasks[12]._id, tasks[13]._id, tasks[14]._id],
    },
    {
      name: "Social Media Integration",
      projectStatus: "In Progress",
      dateDue: "11/13/2024",
      team: teams[2]._id,
      tasks: [tasks[15]._id, tasks[16]._id, tasks[17]._id],
    },
    {
      name: "Website Redesign",
      projectStatus: "In Progress",
      dateDue: "12/15/2024",
      team: teams[3]._id,
      tasks: [tasks[18]._id, tasks[19]._id, tasks[20]._id],
    },
    {
      name: "Mobile App User Experience Enhancement",
      projectStatus: "In Progress",
      dateDue: "10/04/2024",
      team: teams[3]._id,
      tasks: [tasks[21]._id, tasks[22]._id, tasks[23]._id],
    },
    {
      name: "Cloud Migration Project",
      projectStatus: "In Progress",
      dateDue: "11/24/2024",
      team: teams[4]._id,
      tasks: [tasks[24]._id, tasks[25]._id, tasks[26]._id],
    },
    {
      name: "Infrastructure Automation Project",
      projectStatus: "In Progress",
      dateDue: "12/10/2024",
      team: teams[4]._id,
      tasks: [tasks[27]._id, tasks[28]._id, tasks[29]._id],
    },
  ]);
  console.log("Projects Seeded");

  await User.create({
    firstName: "John",
    lastName: "Doe",
    email: "jdoe@email.com",
    password: "Password123!",
    team: teams[0]._id,
    projects: [projects[0]._id, projects[1]._id],
    tasks: [tasks[0]._id, tasks[3]._id],
  });

  await User.create({
    firstName: "Jane",
    lastName: "Smith",
    email: "jsmith@email.com",
    password: "Password123!",
    team: teams[0]._id,
    projects: [projects[0]._id, projects[1]._id],
    tasks: [tasks[1]._id, tasks[4]._id],
  });

  await User.create({
    firstName: "Michael",
    lastName: "Johnson",
    email: "mjohnson@email.com",
    password: "Password123!",
    team: teams[0]._id,
    projects: [projects[0]._id, projects[1]._id],
    tasks: [tasks[2]._id, tasks[5]._id],
  });

  await User.create({
    firstName: "Emily",
    lastName: "Brown",
    email: "ebrown@email.com",
    password: "Password123!",
    team: teams[1]._id,
    projects: [projects[2]._id, projects[3]._id],
    tasks: [tasks[6]._id, tasks[9]._id],
  });

  await User.create({
    firstName: "David",
    lastName: "Williams",
    email: "dwilliams@email.com",
    password: "Password123!",
    team: teams[1]._id,
    projects: [projects[2]._id, projects[3]._id],
    tasks: [tasks[7]._id, tasks[10]._id],
  });

  await User.create({
    firstName: "Sarah",
    lastName: "Taylor",
    email: "staylor@email.com",
    password: "Password123!",
    team: teams[1]._id,
    projects: [projects[2]._id, projects[3]._id],
    tasks: [tasks[8]._id, tasks[11]._id],
  });

  await User.create({
    firstName: "James",
    lastName: "Wilson",
    email: "jwilson@email.com",
    password: "Password123!",
    team: teams[2]._id,
    projects: [projects[4]._id, projects[5]._id],
    tasks: [tasks[12]._id, tasks[15]._id],
  });

  await User.create({
    firstName: "Jessica",
    lastName: "Anderson",
    email: "janderson@email.com",
    password: "Password123!",
    team: teams[2]._id,
    projects: [projects[4]._id, projects[5]._id],
    tasks: [tasks[13]._id, tasks[16]._id],
  });

  await User.create({
    firstName: "Robert",
    lastName: "Martinez",
    email: "rmartinez@email.com",
    password: "Password123!",
    team: teams[2]._id,
    projects: [projects[4]._id, projects[5]._id],
    tasks: [tasks[14]._id, tasks[17]._id],
  });

  await User.create({
    firstName: "Jennifer",
    lastName: "Lopez",
    email: "jlopez@email.com",
    password: "Password123!",
    team: teams[3]._id,
    projects: [projects[6]._id, projects[7]._id],
    tasks: [tasks[18]._id, tasks[21]._id],
  });

  await User.create({
    firstName: "Emma",
    lastName: "Jones",
    email: "ejones@email.com",
    password: "Password123!",
    team: teams[3]._id,
    projects: [projects[6]._id, projects[7]._id],
    tasks: [tasks[19]._id, tasks[22]._id],
  });

  await User.create({
    firstName: "Joshua",
    lastName: "Brown",
    email: "jbrown@email.com",
    password: "Password123!",
    team: teams[3]._id,
    projects: [projects[6]._id, projects[7]._id],
    tasks: [tasks[20]._id, tasks[23]._id],
  });

  await User.create({
    firstName: "Maeve",
    lastName: "Wilson",
    email: "mwilson@email.com",
    password: "Password123!",
    team: teams[4]._id,
    projects: [projects[8]._id, projects[9]._id],
    tasks: [tasks[24]._id, tasks[27]._id],
  });

  await User.create({
    firstName: "Juan",
    lastName: "Martinez",
    email: "jmartinez@email.com",
    password: "Password123!",
    team: teams[4]._id,
    projects: [projects[8]._id, projects[9]._id],
    tasks: [tasks[25]._id, tasks[28]._id],
  });

  await User.create({
    firstName: "Kelly",
    lastName: "Garcia",
    email: "kgarcia@email.com",
    password: "Password123!",
    team: teams[4]._id,
    projects: [projects[8]._id, projects[9]._id],
    tasks: [tasks[26]._id, tasks[29]._id],
  });

  console.log("Users Seeded");

  // Push users into teams

  const users = await User.find({
    $or: [
      { email: "jdoe@email.com" },
      { email: "jsmith@email.com" },
      { email: "mjohnson@email.com" },
    ],
  });
  const userIds = users.map((user) => user._id);
  await Team.findOneAndUpdate(
    { name: "Frontend Development" },
    { $push: { members: { $each: userIds } } }
  );

  const users2 = await User.find({
    $or: [
      { email: "ebrown@email.com" },
      { email: "dwilliams@email.com" },
      { email: "staylor@email.com" },
    ],
  });
  const userIds2 = users2.map((user) => user._id);
  await Team.findOneAndUpdate(
    { name: "Backend Development" },
    { $push: { members: { $each: userIds2 } } }
  );

  const users3 = await User.find({
    $or: [
      { email: "jwilson@email.com" },
      { email: "janderson@email.com" },
      { email: "rmartinez@email.com" },
    ],
  });
  const userIds3 = users3.map((user) => user._id);
  await Team.findOneAndUpdate(
    { name: "Full-Stack Development" },
    { $push: { members: { $each: userIds3 } } }
  );

  const users4 = await User.find({
    $or: [
      { email: "jlopez@email.com" },
      { email: "ejones@email.com" },
      { email: "jbrown@email.com" },
    ],
  });
  const userIds4 = users4.map((user) => user._id);
  await Team.findOneAndUpdate(
    { name: "UI/UX Design" },
    { $push: { members: { $each: userIds4 } } }
  );

  const users5 = await User.find({
    $or: [
      { email: "mwilson@email.com" },
      { email: "jmartinez@email.com" },
      { email: "kgarcia@email.com" },
    ],
  });
  const userIds5 = users5.map((user) => user._id);
  await Team.findOneAndUpdate(
    { name: "DevOps" },
    { $push: { members: { $each: userIds5 } } }
  );

  // Push assignedUsers into tasks
  const user1a = await User.find({
    email: "jdoe@email.com",
  });
  const user1aId = user1a.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Implement user authentication functionality" },
    { $push: { assignedUser: user1aId } }
  );

  const user1b = await User.find({
    email: "jdoe@email.com",
  });
  const user1bId = user1b.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Analyze and optimize bundle size" },
    { $push: { assignedUser: user1bId } }
  );

  const user2a = await User.find({
    email: "jsmith@email.com",
  });
  const user2aId = user2a.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Design and develop data visualization components" },
    { $push: { assignedUser: user2aId } }
  );

  const user2b = await User.find({
    email: "jsmith@email.com",
  });
  const user2bId = user2b.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Implement lazy loading for images and components" },
    { $push: { assignedUser: user2bId } }
  );

  const user3a = await User.find({
    email: "mjohnson@email.com",
  });
  const user3aId = user3a.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Integrate with backend APIs for data retrieval" },
    { $push: { assignedUser: user3aId } }
  );

  const user3b = await User.find({
    email: "mjohnson@email.com",
  });
  const user3bId = user3b.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Utilize caching mechanisms to improve page load times" },
    { $push: { assignedUser: user3bId } }
  );

  const user4a = await User.find({
    email: "ebrown@email.com",
  });
  const user4aId = user4a.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Set up API gateway infrastructure" },
    { $push: { assignedUser: user4aId } }
  );

  const user4b = await User.find({
    email: "ebrown@email.com",
  });
  const user4bId = user4b.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Decompose monolithic application into microservices" },
    { $push: { assignedUser: user4bId } }
  );

  const user5a = await User.find({
    email: "dwilliams@email.com",
  });
  const user5aId = user5a.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Configure routing rules for different microservices" },
    { $push: { assignedUser: user5aId } }
  );

  const user5b = await User.find({
    email: "dwilliams@email.com",
  });
  const user5bId = user5b.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Define communication protocols between microservices" },
    { $push: { assignedUser: user5bId } }
  );

  const user6a = await User.find({
    email: "staylor@email.com",
  });
  const user6aId = user6a.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Implement security policies and rate limiting" },
    { $push: { assignedUser: user6aId } }
  );

  const user6b = await User.find({
    email: "staylor@email.com",
  });
  const user6bId = user6b.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Implement service discovery and load balancing" },
    { $push: { assignedUser: user6bId } }
  );

  const user7a = await User.find({
    email: "jwilson@email.com",
  });
  const user7aId = user7a.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Design database schema for product listings" },
    { $push: { assignedUser: user7aId } }
  );

  const user7b = await User.find({
    email: "jwilson@email.com",
  });
  const user7bId = user7b.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Integrate platform with social media APIs for user authentication" },
    { $push: { assignedUser: user7bId } }
  );

  const user8a = await User.find({
    email: "janderson@email.com",
  });
  const user8aId = user8a.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Implement user registration and login functionality" },
    { $push: { assignedUser: user8aId } }
  );

  const user8b = await User.find({
    email: "janderson@email.com",
  });
  const user8bId = user8b.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Implement sharing functionalities for posts and products" },
    { $push: { assignedUser: user8bId } }
  );

  const user9a = await User.find({
    email: "rmartinez@email.com",
  });
  const user9aId = user9a.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Develop product search and filtering features" },
    { $push: { assignedUser: user9aId } }
  );

  const user9b = await User.find({
    email: "rmartinez@email.com",
  });
  const user9bId = user9b.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Develop notification system for user interactions" },
    { $push: { assignedUser: user9bId } }
  );

  const user10a = await User.find({
    email: "jlopez@email.com",
  });
  const user10aId = user10a.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Conduct user research and gather requirements" },
    { $push: { assignedUser: user10aId } }
  );

  const user10b = await User.find({
    email: "jlopez@email.com",
  });
  const user10bId = user10b.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Analyze user feedback and app usage data" },
    { $push: { assignedUser: user10bId } }
  );

  const user11a = await User.find({
    email: "ejones@email.com",
  });
  const user11aId = user11a.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Create wireframes and prototypes for new design" },
    { $push: { assignedUser: user11aId } }
  );

  const user11b = await User.find({
    email: "ejones@email.com",
  });
  const user11bId = user11b.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Refine navigation and user flows" },
    { $push: { assignedUser: user11bId } }
  );

  const user12a = await User.find({
    email: "jbrown@email.com",
  });
  const user12aId = user12a.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Develop responsive UI components using modern design principles" },
    { $push: { assignedUser: user12aId } }
  );

  const user12b = await User.find({
    email: "jbrown@email.com",
  });
  const user12bId = user12b.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Improve performance and responsiveness of the app" },
    { $push: { assignedUser: user12bId } }
  );

  const user13a = await User.find({
    email: "mwilson@email.com",
  });
  const user13aId = user13a.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Assess current infrastructure and identify migration candidates" },
    { $push: { assignedUser: user13aId } }
  );

  const user13b = await User.find({
    email: "mwilson@email.com",
  });
  const user13bId = user13b.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Implement Infrastructure as Code (IaC) using tools like Terraform" },
    { $push: { assignedUser: user13bId } }
  );

  const user14a = await User.find({
    email: "jmartinez@email.com",
  });
  const user14aId = user14a.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Plan migration strategy and prioritize workloads" },
    { $push: { assignedUser: user14aId } }
  );

  const user14b = await User.find({
    email: "jmartinez@email.com",
  });
  const user14bId = user14b.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Automate provisioning and configuration of servers and services" },
    { $push: { assignedUser: user14bId } }
  );

  const user15a = await User.find({
    email: "kgarcia@email.com",
  });
  const user15aId = user15a.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Execute migration process with minimal downtime" },
    { $push: { assignedUser: user15aId } }
  );

  const user15b = await User.find({
    email: "kgarcia@email.com",
  });
  const user15bId = user15b.map((user) => user._id);
  await Task.findOneAndUpdate(
    { description: "Set up continuous integration and deployment pipelines for infrastructure changes" },
    { $push: { assignedUser: user15bId } }
  );

  process.exit();
});
