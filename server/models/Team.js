const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
