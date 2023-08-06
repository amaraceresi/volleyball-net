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
  start: {
    type: Date,
    required: true,
  },
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team',
  }],
  ageDivision: [{
    type: Schema.Types.ObjectId,
    ref: 'AgeDivision'
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  ageDivisions: [{
    type: Schema.Types.ObjectId,
    ref: 'AgeDivision',
  }],
});

const Tournament = model('Tournament', TournamentSchema);

module.exports = Tournament;
