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
        throw new Error('Failed to fetch users.');
      }
    },

    tournaments: async () => {
      try {
        const tournaments = await Tournament.find({}).populate('ageDivisions');
        tournaments.forEach(tournament => {
          if (isNaN(Date.parse(tournament.start))) {
            tournament.start = null;
          }
          if (isNaN(Date.parse(tournament.end))) {
            tournament.end = null;
          }
        });
        return tournaments;
      } catch (error) {
        console.error("Error in the tournaments resolver: ", error);
        throw new Error('Failed to fetch tournaments.');
      }
    },

    teams: async () => {
      try {
        const teams = await Team.find({});
        teams.forEach(team => {
          if (!Array.isArray(team.members)) {
            team.members = [];
          }
        });
        return teams;
      } catch (error) {
        console.error("Error in the teams resolver: ", error);
        throw new Error('Failed to fetch teams.');
      }
    },

    ageDivisions: async () => {
      try {
        return await AgeDivision.find({});
      } catch (error) {
        console.error("Error in the ageDivisions resolver: ", error);
        throw new Error('Failed to fetch age divisions.');
      }
    },

    userTournaments: async (parent, args, context) => {
      if (context.user) {
        try {
          const userData = await User.findOne({ _id: context.user._id })
          .populate({
            path: 'tournaments',
            populate: {
              path: 'ageDivisions',
              model: 'AgeDivision',
              populate: {
                path: 'teams',
                model: 'Team'
              }
            }
          });

          userData.tournaments.forEach(tournament => {
            if (isNaN(Date.parse(tournament.start))) {
              tournament.start = null;
            }
            if (isNaN(Date.parse(tournament.end))) {
              tournament.end = null;
            }
          });

          return userData.tournaments;
        } catch (error) {
          console.error("Error in the userTournaments resolver: ", error);
          throw new Error('Failed to fetch user tournaments.');
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
          throw new UserInputError('User not found with the provided email.');
        }

        const isValid = await user.isCorrectPassword(password);
        if (!isValid) {
          throw new UserInputError('Invalid password');
        }

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error("Error in the loginUser mutation: ", error);
        throw new AuthenticationError(`Login failed: ${error.message}`);
      }
    },

    addTournament: async (parent, argsObj) => {
      try {
        return await Tournament.create(argsObj);
      } catch (error) {
        console.error("Error in the addTournament mutation: ", error);
        throw new Error(`Failed to add tournament: ${error.message}`);
      }
    },

    addTeam: async (parent, { name, members }) => {
      if (!Array.isArray(members)) {
        members = [];
      }
      
      try {
        return await Team.create({ name, members });
      } catch (error) {
        console.error("Error in the addTeam mutation: ", error);
        throw new Error('Failed to create the team.');
      }
    },

    addAgeDivision: async (parent, { age, start, teamCap, end, tournamentId }) => {
      try {
        const divisionData = await AgeDivision.create({ age, start, teamCap, end, });

        await Tournament.findByIdAndUpdate(tournamentId, {
          $push: { ageDivisions: divisionData._id }
        });

        return divisionData;
      } catch (error) {
        console.error("Error in the addAgeDivision mutation: ", error);
        throw new Error('Failed to add age division.');
      }
    },

    addAgeDivisionToTournament: async (parent, { ageDivisionId, tournamentId }) => {
      try {
        const tournament = await Tournament.findById(tournamentId);
        const ageDivision = await AgeDivision.findById(ageDivisionId);

        if (!tournament || !ageDivision) {
          throw new UserInputError('Invalid tournament or age division ID');
        }

        tournament.ageDivisions.push(ageDivision._id);
        await tournament.save();
        return tournament;
      } catch (error) {
        console.error("Error in the addAgeDivisionToTournament mutation: ", error);
        throw new Error('Failed to add age division to the tournament.');
      }
    },
  }
};

module.exports = resolvers;

          // const ageDivisionData = Team.find({ adminMember: context.user._id })
          //   .populate([
          //     {
          //       path: 'members'
          //     },
          //     {
          //       path: 'tournaments',
          //       poplate: {
          //         path: 'ageDivision'
          //       }
          //     }
          //   ])


          // const userData = await User.findOne({ _id: context.user._id }, {raw: true})
          //   .populate({
          //     path: 'tournaments',
          //     populate: {
          //       path: 'ageDivisions',
          //       model: 'AgeDivision',
          //       populate: {
          //         path: 'teams',
          //         model: 'Team'
          //       }
          //     }
          //   });
