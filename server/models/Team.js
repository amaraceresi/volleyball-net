const { Schema, model } = require('mongoose');

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  coach: {
    type: String,
    trim: true,
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  tournaments: [{
    type: Schema.Types.ObjectId,
    ref: 'Tournament',
  }],
});

const Team = model('Team', TeamSchema);

module.exports = Team;
