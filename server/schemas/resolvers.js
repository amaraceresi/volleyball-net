const User = require('../models/User');
const Tournament = require('../models/Tournament');
const Team = require('../models/Team');

const resolvers = {
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
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {  
      return await User.create({ firstName, lastName, email, password });  
    },
    addTournament: async (parent, { name, location }) => {
      return await Tournament.create({ name, location });
    },
    addTeam: async (parent, { name, members }) => {
      return await Team.create({ name, members });
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
