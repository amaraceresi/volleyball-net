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
  adminMember: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  age: {
    type: String,
    required: false,
  },
  members: [{
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
