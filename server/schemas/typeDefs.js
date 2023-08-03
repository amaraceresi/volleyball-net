const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    team: [Team]
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
    start: Date
    end: Date
    ageDivisions: [AgeDivision]
  }

  type Team {
    _id: ID
    name: String
    adminMember: User
    members: [String]
    age: String
  }

  type AgeDivision {
    _id: ID
    age: String
    start: Date
    teamCap: Int!
    end: Date
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
    addTournament(name: String!, location: String!): Tournament
    addTeam(name: String!, members: [ID]!): Team
    addMemberToTeam(teamId: ID!, userId: ID!): Team
    addAgeDivision(age: String!, start: Date!, teamCap: Int!, end: Date!, tournamentId: ID!): AgeDivision
    addAgeDivisionToTournament(ageDivisionId: ID!, tournamentId: ID!): Tournament
    registerForTournament(tournamentId: ID!, teamData: TeamInput!, ageDivisionId: ID!): [Tournament]
  }
`;

module.exports = typeDefs;
