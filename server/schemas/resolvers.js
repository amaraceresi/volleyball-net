const User = require('../models/User');
const Tournament = require('../models/Tournament');
const Team = require('../models/Team');
const AgeDivision = require('../models/AgeDivison');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const { dateScalar } = require('./scalar');

const resolvers = {
  Date: dateScalar,

  Query: {
    me: async (parent, args, context) => {
      
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        return userData;
      }
      throw new AuthenticationError('User is not authenticated');
    },
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
      throw new AuthenticationError('User is not authenticated');
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
    registerForTournament: async (parent, { userId, tournamentId, teamData }, context) => {
      // Ensure user is logged in
      if (!context.user) {
        throw new AuthenticationError('User is not authenticated. You need to be logged in!');
      }

      // Create the team
      const newTeam = await Team.create(teamData);

      // Add the team to the user's teams
      await User.findByIdAndUpdate(userId, { $push: { teams: newTeam._id } });

      // Add the team to the tournament's teams
      await Tournament.findByIdAndUpdate(tournamentId, { $push: { teams: newTeam._id } });

      // Find user with updated tournaments
      const userData = await User.findOne({ _id: userId }).populate('tournaments');

      return userData.tournaments;
    },
  },
};

module.exports = resolvers;
