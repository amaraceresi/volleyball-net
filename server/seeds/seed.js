const db = require('../config/connection');
const { AgeDivision, Tournament } = require('../models');

const ageDivisionData = require('./ageDivisionData.json');
const tournamentData = require('./tournamentData.json');

db.once('open', async () => {
  // clean database
  await AgeDivision.deleteMany({});
  await Tournament.deleteMany({});

  // bulk create each model
  await AgeDivision.insertMany(ageDivisionData);
  const tournaments = await Tournament.insertMany(tournamentData);

  // Fetch the age divisions from the database again to get Mongoose documents
  const ageDivisions = await AgeDivision.find({});

  for (let newTournament of tournaments) {
    // randomly assign an age division to a tournament
    for (const currentAgeDivision of ageDivisions ) {
      newTournament.ageDivisions.push(currentAgeDivision._id);
      currentAgeDivision.tournament = newTournament._id;
      await currentAgeDivision.save();
    }
    
    await newTournament.save();

    // reference tournament on age division model, too
  }

  console.log('all done!');
  process.exit(0);
});
