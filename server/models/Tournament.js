const { Schema, model } = require('mongoose');

const TournamentSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team',
  }],
});

const Tournament = model('Tournament', TournamentSchema);

module.exports = Tournament;
