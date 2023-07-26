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
    }
  }
};

module.exports = resolvers;
