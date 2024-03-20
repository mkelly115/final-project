import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
    me {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const QUERY_USERS = gql`
query allUsers {
    users {
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

export const QUERY_SINGLE_USER = gql`
query singleUser($userId: ID!) {
    user(id: $userId) {
      _id
      firstName
      lastName
      email
      team {
        _id
        name
      }
      projects {
        _id
        name
        projectStatus
      }
      tasks {
        _id
        description
        taskStatus
        dateDue
      }
    }
  }
`;

export const QUERY_TEAMS = gql`
query allTeams {
    teams {
      _id
      name
      projects {
        _id
        name
      }
      members {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const QUERY_SINGLE_TEAM = gql`
query singleTeam($teamId: ID!) {
    team(id: $teamId) {
      _id
      name
      projects {
        _id
        name
      }
      members {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const QUERY_PROJECTS = gql`
query allProjects {
  projects {
    _id
    name
    projectStatus
    dateDue
    teams {
      _id
      name
      members {
        _id
        firstName
        lastName
      }
    }
  }
}
`;

export const QUERY_SINGLE_PROJECT = gql`
query singleProject($projectId: ID!) {
    project(id: $projectId) {
      _id
      name
      projectStatus
      dateDue
      teams {
        _id
        name
      }
      tasks {
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
  }
`;

export const QUERY_TASKS = gql`
query allTasks {
    tasks {
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

export const QUERY_SINGLE_TASK = gql`
query singleTask($taskId: ID!) {
    task(id: $taskId) {
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