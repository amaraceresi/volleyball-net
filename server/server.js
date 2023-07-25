const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Create an express server
const app = express();
const PORT = process.env.PORT || 3002;

// A simple schema and a query
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// Create a new Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Middleware
server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
