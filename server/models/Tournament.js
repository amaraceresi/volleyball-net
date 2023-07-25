const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }],
});

const Tournament = mongoose.model('Tournament', TournamentSchema);

module.exports = Tournament;
