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
    teams: [Team]
    tasks: [Task]
  }

  input ProjectInput {
    name: String!
    projectStatus: String
    teamIds: [ID]
    taskIds: [ID]
  }

  type Task {
    _id: ID
    description: String
    taskStatus: String
    dateDue: Date
    assignedUser: User
  }

  input TaskInput {
    description: String!
    taskStatus: String!
    dateDue: Date!
    assignedUserId: ID!
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    teams: [Team]
    team(teamId: ID!): Team
    projects: [Project]
    project(projectId: ID!): Project
    tasks: [Task]
    task(taskId: ID!): Task
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(input: UserInput!): Auth
    updateUser(userId: ID!, input: UserInput): User
    removeUser(userId: ID!): User
    addProject(input: ProjectInput!): Project
    updateProject(projectId: ID!, input: ProjectInput): Project
    removeProject(projectId: ID!): Project
    addTask(input: TaskInput!): Task
    updateTask(taskId: ID!, input: TaskInput): Task
    removeTask(taskId: ID!): Task
  }
`

module.exports = typeDefs;