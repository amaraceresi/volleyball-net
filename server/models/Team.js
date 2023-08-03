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
  adminMemeber: {
    type: String,
    trim: true,
  },
  age: {
    type: String,
    required: true,
  },
  players: [{
    type: String,
    trim: true,
  }],
  tournaments: [{
    type: Schema.Types.ObjectId,
    ref: 'Tournament',
  }],
});

const Team = model('Team', TeamSchema);

module.exports = Team;
