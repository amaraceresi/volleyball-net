const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Team {
    _id: ID
    name: String
    players: [User]
  }

  type Tournament {
    _id: ID
    name: String
    date: String
    teams: [Team]
  }

  type User {
    _id: ID
    username: String
    password: String
  }

  type Query {
    teams: [Team]
    tournaments: [Tournament]
    users: [User]
  }
`;

module.exports = typeDefs;
