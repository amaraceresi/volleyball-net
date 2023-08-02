const { GraphQLScalarType, Kind } = require('graphql');
const User = require('../models/User');
const Tournament = require('../models/Tournament');
const Team = require('../models/Team');
const AgeDivision = require('../models/AgeDivison');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    },
  }),

  Query: {
    users: async () => {
      return await User.find({});
    },
    tournaments: async () => {
      return await Tournament.find({});
    },
    teams: async () => {
      return await Team.find({});
    },
    ageDivisions: async () => {
      return await AgeDivision.find({});
    },
    userTournaments: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .populate('tournaments');
        return userData.tournaments;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {  
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);
      return { token, user };  
    },
    loginUser: async (parent, { email, password }) => {  
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not found');
      }

      const isValid = await user.isCorrectPassword(password);
      if (!isValid) {
        throw new Error('Invalid password');
      }

      const token = signToken(user);
      return { token, user };  
    },
    addTournament: async (parent, { name, location }) => {
      return await Tournament.create({ name, location });
    },
    addTeam: async (parent, { name, members }) => {
      return await Team.create({ name, members });
    },
    addAgeDivision: async (parent, { age, start, teamCap, date, teams }) => {
      return await AgeDivision.create({ age, start, teamCap, date, teams });
    },
    addAgeDivisionToTournament: async (parent, { ageDivisionId, tournamentId }) => {
      const tournament = await Tournament.findById(tournamentId);
      const ageDivision = await AgeDivision.findById(ageDivisionId);

      if (!tournament || !ageDivision) {
        throw new Error('Invalid tournament or age division ID');
      }

      tournament.ageDivisions.push(ageDivision._id);

      await tournament.save();

      return tournament;
    },
    addMemberToTeam: async (parent, { teamId, userId }) => {
      const team = await Team.findById(teamId);
      const user = await User.findById(userId);

      if (!team || !user) {
        throw new Error('Invalid team or user ID');
      }

      team.members.push(user._id);

      await team.save();

      return team;
    },
  }
};

module.exports = resolvers;
