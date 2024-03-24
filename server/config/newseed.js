const mongoose = require("mongoose");
const { User, Team, Project, Task } = require("../models");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/project-3-test", {
  useNewUrlParser: false,
  useUnifiedTopology: false,
});

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
  {
    name: "Frontend Development",
    members: [
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
    ],
  },
  {
    name: "Backend Development",
    members: [
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
    ],
  },
  {
    name: "Full-Stack Development",
    members: [
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
    ],
  },
  {
    name: "UI/UX Design",
    members: [
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
    ],
  },
  {
    name: "DevOps",
    members: [
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
    ],
  },
];

const projects = [
  {
    name: "React Dashboard Development",
    projectStatus: "In Progress",
    team: [
      {
        name: "Frontend Development",
        members: [
          {
            firstName: "John",
            lastName: "Doe",
            email: "jdoe@email.com",
            password: "password123",
            tasks: [
              {
                description: "Implement user authentication functionality",
                taskStatus: "Pending",
                dueDate: new Date(),
              },
            ],
          },
          {
            firstName: "Jane",
            lastName: "Smith",
            email: "jsmith@email.com",
            password: "password123",
            tasks: [
              {
                description: "Design and develop data visualization components",
                taskStatus: "Completed",
                dueDate: new Date(),
              },
            ],
          },
          {
            firstName: "Michael",
            lastName: "Johnson",
            email: "mjohnson@email.com",
            password: "password123",
            tasks: [
              {
                description: "Integrate with backend APIs for data retrieval",
                taskStatus: "Created",
                dueDate: new Date(),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Frontend Performance Optimization",
    projectStatus: "Created",
    team: [
      {
        name: "Frontend Development",
        members: [
          {
            firstName: "John",
            lastName: "Doe",
            email: "jdoe@email.com",
            password: "password123",
            tasks: [
              {
                description: "Analyze and optimize bundle size",
                taskStatus: "In Progress",
                dueDate: new Date(),
              },
            ],
          },
          {
            firstName: "Jane",
            lastName: "Smith",
            email: "jsmith@email.com",
            password: "password123",
            tasks: [
              {
                description: "Implement lazy loading for images and components",
                taskStatus: "In Progress",
                dueDate: new Date(),
              },
            ],
          },
          {
            firstName: "Michael",
            lastName: "Johnson",
            email: "mjohnson@email.com",
            password: "password123",
            tasks: [
              {
                description:
                  "Utilize caching mechanisms to improve page load times",
                taskStatus: "Pending",
                dueDate: new Date(),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "API Gateway Implementation",
    projectStatus: "Created",
    team: [
      {
        name: "Backend Development",
        members: [
          {
            firstName: "Emily",
            lastName: "Brown",
            email: "ebrown@email.com",
            password: "password123",
            tasks: [
              {
                description: "Set up API gateway infrastructure",
                taskStatus: "In Progress",
                dueDate: new Date(),
              },
            ],
          },
          {
            firstName: "David",
            lastName: "Williams",
            email: "dwilliams@email.com",
            password: "password123",
            tasks: [
              {
                description:
                  "Configure routing rules for different microservices",
                taskStatus: "Created",
                dueDate: new Date(),
              },
            ],
          },
          {
            firstName: "Sarah",
            lastName: "Taylor",
            email: "staylor@email.com",
            password: "password123",
            tasks: [
              {
                description: "Implement security policies and rate limiting",
                taskStatus: "In Progress",
                dueDate: new Date(),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Microservices Architecture Refactoring",
    projectStatus: "Pending",
    team: [
      {
        name: "Backend Development",
        members: [
          {
            firstName: "Emily",
            lastName: "Brown",
            email: "ebrown@email.com",
            password: "password123",
            tasks: [
              {
                description:
                  "Decompose monolithic application into microservices",
                taskStatus: "Completed",
                dueDate: new Date(),
              },
            ],
          },
          {
            firstName: "David",
            lastName: "Williams",
            email: "dwilliams@email.com",
            password: "password123",
            tasks: [
              {
                description:
                  "Define communication protocols between microservices",
                taskStatus: "In Progress",
                dueDate: new Date(),
              },
            ],
          },
          {
            firstName: "Sarah",
            lastName: "Taylor",
            email: "staylor@email.com",
            password: "password123",
            tasks: [
              {
                description: "Implement service discovery and load balancing",
                taskStatus: "Pending",
                dueDate: new Date(),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Online Marketplace Platform Development",
    projectStatus: "In Progress",
    team: [
      {
        name: "Full-Stack Development",
        members: [
          {
            firstName: "James",
            lastName: "Wilson",
            email: "jwilson@email.com",
            password: "password123",
            tasks: [
              {
                description: "Design database schema for product listings",
                taskStatus: "Pending",
                dueDate: new Date(),
              },
            ],
          },
          {
            firstName: "Jessica",
            lastName: "Anderson",
            email: "janderson@email.com",
            password: "password123",
            tasks: [
              {
                description:
                  "Implement user registration and login functionality",
                taskStatus: "Completed",
                dueDate: new Date(),
              },
            ],
          },
          {
            firstName: "Robert",
            lastName: "Martinez",
            email: "rmartinez@email.com",
            password: "password123",
            tasks: [
              {
                description: "Develop product search and filtering features",
                taskStatus: "Created",
                dueDate: new Date(),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Social Media Integration",
    projectStatus: "In Progress",
    team: [
      {
        name: "Full-Stack Development",
        members: [
          {
            firstName: "James",
            lastName: "Wilson",
            email: "jwilson@email.com",
            password: "password123",
            tasks: [
              {
                description:
                  "Integrate platform with social media APIs for user authentication",
                taskStatus: "In Progress",
                dueDate: new Date(),
              },
            ],
          },
          {
            firstName: "Jessica",
            lastName: "Anderson",
            email: "janderson@email.com",
            password: "password123",
            tasks: [
              {
                description:
                  "Implement sharing functionalities for posts and products",
                taskStatus: "In Progress",
                dueDate: new Date(),
              },
            ],
          },
          {
            firstName: "Robert",
            lastName: "Martinez",
            email: "rmartinez@email.com",
            password: "password123",
            tasks: [
              {
                description:
                  "Develop notification system for user interactions",
                taskStatus: "In Progress",
                dueDate: new Date(),
              },
            ],
          },
        ],
      },
    ],
  },

  {
    name: "Website Redesign",
    projectStatus: "Created",
    team: [
      {
        name: "UI/UX Design",
        members: [
          {
            firstName: "Jennifer",
            lastName: "Lopez",
            email: "jlopez@email.com",
            password: "password123",
            tasks: [
              {
                description: "Conduct user research and gather requirements",
                taskStatus: "In Progress",
                dueDate: new Date(),
              },
            ],
          },
          {
            firstName: "Emma",
            lastName: "Jones",
            email: "ejones@email.com",
            password: "password123",
            tasks: [
              {
                description: "Create wireframes and prototypes for new design",
                taskStatus: "Created",
                dueDate: new Date(),
              },
            ],
          },
          {
            firstName: "Joshua",
            lastName: "Brown",
            email: "jbrown@email.com",
            password: "password123",
            tasks: [
              {
                description:
                  "Develop responsive UI components using modern design principles",
                taskStatus: "In Progress",
                dueDate: new Date(),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Mobile App User Experience Enhancement",
    projectStatus: "Pending",
    team: [
      {
        name: "UI/UX Design",
        members: [
          {
            firstName: "Jennifer",
            lastName: "Lopez",
            email: "jlopez@email.com",
            password: "password123",
            tasks: [
              {
                description: "Analyze user feedback and app usage data",
                taskStatus: "Completed",
                dueDate: new Date(),
              },
            ],
          },
          {
            firstName: "Emma",
            lastName: "Jones",
            email: "ejones@email.com",
            password: "password123",
            tasks: [
              {
                description: "Refine navigation and user flows",
                taskStatus: "In Progress",
                dueDate: new Date(),
              },
            ],
          },
          {
            firstName: "Joshua",
            lastName: "Brown",
            email: "jbrown@email.com",
            password: "password123",
            tasks: [
              {
                description:
                  "Improve performance and responsiveness of the app",
                taskStatus: "Pending",
                dueDate: new Date(),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Cloud Migration Project",
    projectStatus: "In Progress",
    team: [
      {
        name: "DevOps",
        members: [
          {
            firstName: "Maeve",
            lastName: "Wilson",
            email: "mwilson@email.com",
            password: "password123",
            tasks: [
              {
                description:
                  "Assess current infrastructure and identify migration candidates",
                taskStatus: "Pending",
                dueDate: new Date(),
              },
            ],
          },
          {
            firstName: "Juan",
            lastName: "Martinez",
            email: "jmartinez@email.com",
            password: "password123",
            tasks: [
              {
                description: "Plan migration strategy and prioritize workloads",
                taskStatus: "Completed",
                dueDate: new Date(),
              },
            ],
          },
          {
            firstName: "Kelly",
            lastName: "Garcia",
            email: "kgarcia@email.com",
            password: "password123",
            tasks: [
              {
                description: "Execute migration process with minimal downtime",
                taskStatus: "Created",
                dueDate: new Date(),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Infrastructure Automation Project",
    projectStatus: "Created",
    team: [
      {
        name: "DevOps",
        members: [
          {
            firstName: "Maeve",
            lastName: "Wilson",
            email: "mwilson@email.com",
            password: "password123",
            tasks: [
              {
                description:
                  "Implement Infrastructure as Code (IaC) using tools like Terraform",
                taskStatus: "In Progress",
                dueDate: new Date(),
              },
            ],
          },
          {
            firstName: "Juan",
            lastName: "Martinez",
            email: "jmartinez@email.com",
            password: "password123",
            tasks: [
              {
                description:
                  "Automate provisioning and configuration of servers and services",
                taskStatus: "In Progress",
                dueDate: new Date(),
              },
            ],
          },
          {
            firstName: "Kelly",
            lastName: "Garcia",
            email: "kgarcia@email.com",
            password: "password123",
            tasks: [
              {
                description:
                  "Set up continuous integration and deployment pipelines for infrastructure changes",
                taskStatus: "Pending",
                dueDate: new Date(),
              },
            ],
          },
        ],
      },
    ],
  },
];