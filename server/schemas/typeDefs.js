const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    team: Team
    projects: [Project]
    tasks: [Task]
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    teamId: ID
  }

  type Team {
    _id: ID
    name: String
    projects: [Project]
    members: [User]
  }

  type Project {
    _id: ID
    name: String
    projectStatus: String
    dateDue: String
    team: Team
    tasks: [Task]
  }

  input ProjectInput {
    name: String!
    projectStatus: String
    dateDue: String
    teamId: ID
  }

  type Task {
    _id: ID
    description: String
    taskStatus: String
    dateDue: String
    assignedUser: User
  }

  input TaskInput {
    description: String!
    taskStatus: String!
    dateDue: String
    assignedUserId: ID!
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(id: ID!): User
    teams: [Team]
    team(id: ID!): Team
    projects: [Project]
    project(id: ID!): Project
    tasks: [Task]
    task(id: ID!): Task
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(input: UserInput!): Auth
    updateUser(userId: ID!, input: UserInput): User
    removeUser(userId: ID!): User
    addProject(input: ProjectInput!): Project
    updateProject(projectId: ID!, input: ProjectInput): Project
    removeProject(projectId: ID!): Project
    addTask(projectId: ID!, input: TaskInput!): Task
    updateTask(taskId: ID!, input: TaskInput): Task
    removeTask(taskId: ID!): Task
  }
`

module.exports = typeDefs;