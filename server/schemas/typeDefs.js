const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    tournaments: [Tournament]
    createdAt: Date
    updatedAt: Date
  }

  type AuthUser {
    token: String
    user: User
  }

  type Tournament {
    _id: ID
    name: String
    location: String
    date: Date
    ageDivisions: [AgeDivision]
  }

  type Team {
    _id: ID
    name: String
    members: [User]
    age: String
  }

  type AgeDivision {
    _id: ID
    age: String
    teamCap: Int!
    teams: [Team]
  }

  input TeamInput {
    name: String!
    members: [String]!
  }

  type Query {
    users: [User]
    tournaments: [Tournament]
    teams: [Team]
    ageDivisions: [AgeDivision]
    me: User
    userTournaments: [Tournament]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): AuthUser
    loginUser(email: String!, password: String!): AuthUser
    addTournament(name: String!, location: String!, date: Date!): Tournament
    addTeam(name: String!, members: [String]!): Team
    addAgeDivision(age: String!, teamCap: Int!, tournamentId: ID!): AgeDivision
    registerForTournament(tournamentId: ID!, teamData: TeamInput!, ageDivisionId: ID!): [Tournament]
    addAgeDivisionToTournament(ageDivisionId: ID!, tournamentId: ID!): Tournament
    addMemberToTeam(memberId: ID!, teamId: ID!): Team
  }
`;

module.exports = typeDefs;
