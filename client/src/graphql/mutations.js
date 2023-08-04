import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUserMutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
        createdAt
        updatedAt
        tournaments {
          _id
          name
          location
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUserMutation($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    addUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      token
      user {
        _id
        firstName
        lastName
        email
        createdAt
        updatedAt
        tournaments {
          _id
          name
          location
        }
      }
    }
  }
`;

export const ADD_TOURNAMENT = gql`
  mutation createTournament($name: String!, $location: String!, $date: Date!) {
    addTournament(name: $name, location: $location, date: $date) {
      _id
      name
      location
      start
    }
  }
`;

export const REGISTER_FOR_TOURNAMENT = gql`
  mutation RegisterForTournament($tournamentId: ID!, $teamData: TeamInput!, $ageDivisionId: ID!) {
    registerForTournament(tournamentId: $tournamentId, teamData: $teamData, ageDivisionId: $ageDivisionId) {
      _id
      name
      location
      start
      ageDivisions {
        age
        teams {
          name
        }
      }
    }
  }
`;