const User = require('../models/User');
const Tournament = require('../models/Tournament');
const Team = require('../models/Team');
const AgeDivision = require('../models/AgeDivision');
const { signToken } = require('../utils/auth');
const { AuthenticationError, UserInputError } = require('apollo-server-express');
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
      try {
        return await User.find({});
      } catch (error) {
        console.error("Error in the users resolver: ", error);
      }
    },
    tournaments: async () => {
      try {
        return await Tournament.find({});
      } catch (error) {
        console.error("Error in the tournaments resolver: ", error);
      }
    },
    teams: async () => {
      try {
        return await Team.find({});
      } catch (error) {
        console.error("Error in the teams resolver: ", error);
      }
    },
    ageDivisions: async () => {
      try {
        return await AgeDivision.find({});
      } catch (error) {
        console.error("Error in the ageDivisions resolver: ", error);
      }
    },
    userTournaments: async (parent, args, context) => {
      if (context.user) {
        try {
          const userData = await User.findOne({ _id: context.user._id })
            .populate('tournaments');
          return userData.tournaments;
        } catch (error) {
          console.error("Error in the userTournaments resolver: ", error);
        }
      }
      throw new AuthenticationError('User is not authenticated');
    },
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {
      try {
        const user = await User.create({ firstName, lastName, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error("Error in the addUser mutation: ", error);
        throw new Error(`Error in addUser mutation: ${error.message}`);

      }
    },
    loginUser: async (parent, { email, password }) => {
      try {
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
      } catch (error) {
        console.error("Error in the loginUser mutation: ", error);
      }
    },
    addTournament: async (parent, argsObj) => {
      try {
        return await Tournament.create(argsObj);
      } catch (error) {
        console.error("Error in the addTournament mutation: ", error);
      }
    },
    addTeam: async (parent, { name, members }) => {
      try {
        return await Team.create({ name, members });
      } catch (error) {
        console.error("Error in the addTeam mutation: ", error);
      }
    },
    addAgeDivision: async (parent, { age, start, teamCap, end, tournamentId }) => {
      try {
        const divisionData = await AgeDivision.create({ age, start, teamCap, end, });

        await Tournament.findByIdAndUpdate(tournamentId, {
          $push: { ageDivisions: divisionData._id }
        })

        return divisionData;
      } catch (error) {
        console.error("Error in the addAgeDivision mutation: ", error);
      }
    },
    addAgeDivisionToTournament: async (parent, { ageDivisionId, tournamentId }) => {
      try {
        const tournament = await Tournament.findById(tournamentId);
        const ageDivision = await AgeDivision.findById(ageDivisionId);

        if (!tournament || !ageDivision) {
          throw new Error('Invalid tournament or age division ID');
        }

        tournament.ageDivisions.push(ageDivision._id);

        await tournament.save();

        return tournament;
      } catch (error) {
        console.error("Error in the addAgeDivisionToTournament mutation: ", error);
      }
    },
    addMemberToTeam: async (parent, { teamId, userId }) => {
      try {
        const team = await Team.findById(teamId);
        const user = await User.findById(userId);

        if (!team || !user) {
          throw new Error('Invalid team or user ID');
        }

        team.members.push(user._id);

        await team.save();

        return team;
      } catch (error) {
        console.error("Error in the addMemberToTeam mutation: ", error);
      }
    },
    registerForTournament: async (parent, { ageDivisionId, tournamentId, teamData }, context) => {
      if (!context.user) {
        throw new AuthenticationError('User is not authenticated. You need to be logged in!');
      }

      try {
        const userId = context.user._id;

        const team = {
          ...teamData,
          adminMember: userId
        }

        const ageDivision = await AgeDivision.findById(ageDivisionId);

        if (ageDivision.teams.length >= ageDivision.teamCap) {
          throw new UserInputError("The maximum number of teams for this age division has been reached.");
        }

        const newTeam = await Team.create(team);

        await User.findByIdAndUpdate(userId, { $push: { teams: newTeam._id, tournaments: tournamentId } });

        await AgeDivision.updateOne({ age: ageDivisionId }, { $push: { teams: newTeam._id } });

        const userData = await User.findOne({ _id: userId }).populate('tournaments');

        return userData.tournaments;
      } catch (error) {
        console.error("Error in the registerForTournament mutation: ", error);
      }
    },
  },
};

module.exports = resolvers;
