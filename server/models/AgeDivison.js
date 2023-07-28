const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AgeDivisionSchema = new Schema({
    age: {
        type: String,
        required: true,
        unique: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: false,
    },
    teams: [{
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }],
});

const AgeDivision = mongoose.model('AgeDivision', AgeDivisionSchema);

module.exports = AgeDivision;