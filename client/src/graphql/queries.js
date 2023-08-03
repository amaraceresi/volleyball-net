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
      location
      start
      end
      ageDivisions {
        age
        start
        teamCap
        end
        teams {
          name
        }
      }
    }
  }
`;

