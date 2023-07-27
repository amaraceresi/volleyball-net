const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
  }

  type Tournament {
    _id: ID
    name: String
    location: String
  }

  type Team {
    _id: ID
    name: String
    members: [User]
  }

  type Query {
    users: [User]
    tournaments: [Tournament]
    teams: [Team]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    addTournament(name: String!, location: String!): Tournament
    addTeam(name: String!, members: [ID]!): Team
    addMemberToTeam(teamId: ID!, userId: ID!): Team
  }
`;

module.exports = typeDefs;
