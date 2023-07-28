const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    team: [Team]
    username: String
    email: String
  }

  type Tournament {
    _id: ID
    name: String
    location: String
    start: Date
    end: Date
  }

  type Team {
    _id: ID
    name: String
    adminMember: User
    members: [User]
    age: String
  }

  type AgeDivision {
    _id: ID
    age: String
    start: Date
    teamCap: Int
    end: Date
    teams: [Team]
  }

  type Query {
    users: [User]
    tournaments: [Tournament]
    teams: [Team]
    ageDivision: [AgeDivision]
  }

  type Mutation {
    addUser(username: String!, email: String!): User
    addTournament(name: String!, location: String!): Tournament
    addTeam(name: String!, members: [ID]!): Team
    addMemberToTeam(teamId: ID!, userId: ID!): Team
    addAgeDivision(name: String!, age: String!, start: Date!, teamCap: Int!, teams: [Team]!): AgeDivision
  }
`;

module.exports = typeDefs;
