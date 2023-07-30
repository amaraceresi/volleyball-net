const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { typeDefs, resolvers } = require('./schemas');
const User = require('./models/User');

const db = require('./config/connection');

const PORT = process.env.PORT || 3002;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const currentUser = jwt.verify(token, process.env.JWT_SECRET || 'my-secret-8595', (err, decoded) => {
      if (err) {
        return null;
      }
      
      return User.findById(decoded.id);
    });
    return { currentUser };
  },
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/'));
})

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

startApolloServer();
