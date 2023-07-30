const { GraphQLScalarType, Kind } = require('graphql');
const User = require('../models/User');
const Tournament = require('../models/Tournament');
const Team = require('../models/Team');
const AgeDivision = require('../models/AgeDivison');
const { signToken } = require('../utils/auth');

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
    }
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {  
      const user = await User.create({ firstName, lastName, email, password });
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
      const tournament = await Team.findById(tournamentId);
      const ageDivision = await AgeDivision.findById(ageDivisionId);

      if (!tournament || !ageDivision) {
        throw new Error('Invalid tournament or age division ID');
      }

      tournament.ageDivision.push(ageDivision._id);

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
