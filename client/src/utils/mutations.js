import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        firstName
        lastName
        email
        team {
          _id
          name
        }
      }
    }
  }
`;

export const UPDATE_USER = gql`
mutation updateUser($userId: ID!, $input: UserInput) {
    updateUser(userId: $userId, input: $input) {
      _id
      firstName
      lastName
      email
      team {
        _id
        name
      }
    }
  }
`;

export const REMOVE_USER = gql`
mutation removeUser($userId: ID!) {
    removeUser(userId: $userId) {
      _id
      firstName
      lastName
    }
  }
`;

export const ADD_PROJECT = gql`
mutation addProject($input: ProjectInput!) {
    addProject(input: $input) {
      _id
      name
      projectStatus
      teams {
        _id
        name
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
mutation updateProject($projectId: ID!, $input: ProjectInput) {
    updateProject(projectId: $projectId, input: $input) {
      _id
      name
      projectStatus
      teams {
        _id
        name
      }
    }
  }
`;

export const REMOVE_PROJECT = gql`
mutation removeProject($projectId: ID!) {
    removeProject(projectId: $projectId) {
      _id
      name
    }
  }
`;

export const ADD_TASK = gql`
mutation addTask($projectId: ID!, $input: TaskInput!) {
    addTask(projectId: $projectId, input: $input) {
      _id
      description
      taskStatus
      dateDue
      assignedUser {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const UPDATE_TASK = gql`
mutation updateTask($taskId: ID!, $input: TaskInput) {
    updateTask(taskId: $taskId, input: $input) {
      _id
      description
      taskStatus
      dateDue
      assignedUser {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const REMOVE_TASK = gql`
mutation removeTask($taskId: ID!) {
    removeTask(taskId: $taskId) {
      _id
      description
    }
  }
`;
