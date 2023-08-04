import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query getMeQuery {
    me {
      _id
      firstName
      lastName
      email
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_TOURNAMENTS = gql`
  query userTournaments {
    userTournaments {
      _id
      name
      start
      location
      ageDivisions {
        age
        teamCap
        start
        teams {
          name
        }
      }
    }
  }
`;

export const GET_TOURNAMENTS = gql`query tournaments {
  tournaments {
    _id
    name
    location
    start
    ageDivisions {
      _id
      age
      start
      end
      teamCap
    }
  }
}`
