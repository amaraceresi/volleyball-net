import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_TOURNAMENTS } from '../../graphql/queries';
import Page from '../../components/Page';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/slices/userSlice';
import './Dashboard.css';
import { Box, Typography } from '@mui/material';


const headContent = ( 
  <>
    <title>Dashboard</title>
    <meta name="description" content="This is my personalized homepage." />
  </>
);

const findAndReturnAgeDivisions = (ageDivisions, userId) => {
  return ageDivisions.filter((division) => {
    for (const team of division.teams) {
      if (team.adminMember._id === userId) return true;
    };
    return false;
  });
};

const findOnlyUserTournamentsWithUserInAgeDivision = (userTournaments, userId) => {
  const tournaments = [];
  for (const tournament of userTournaments) {
    const ageDivisionsWithUser = findAndReturnAgeDivisions(tournament.ageDivisions, userId);
    if (ageDivisionsWithUser.length < 1) continue;
    const updatedTournament = {
      ...tournament,
      ageDivisions: ageDivisionsWithUser
    };
    tournaments.push(updatedTournament);
  };
  return tournaments;
};

const DashboardContent = () => {
  const { loading, error, data } = useQuery(GET_USER_TOURNAMENTS);
  const { userData } = useSelector(getUser());
  const [userTournaments, setUserTournaments] = useState([]);

  useEffect(() => {
    if(!data) return;
    const filteredTournaments = findOnlyUserTournamentsWithUserInAgeDivision(data.userTournaments, userData._id)
    setUserTournaments(filteredTournaments);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error so sad</p>;
  }

  // return (
  //   <Box sx={{ backgroundColor: 'red' }}>
  //     <Typography variant='h2'>
  //       Hello World
  //     </Typography>
  //   </Box>
  // )

  return (
    <div className="dashboard-container">
      <h2>My Registered Tournaments</h2>
      {userTournaments.map((tournament) => {
        const startDate = tournament.start ? new Date(parseInt(tournament.start)).toLocaleDateString() : "Not provided";
        return (
          <div key={tournament._id} className="tournament">
            <h3>{tournament.name} - {startDate}</h3>
            {tournament.ageDivisions && tournament.ageDivisions.map((ageDivision, index) => (
              <div key={index} className="age-division">
                <h4>Age Division: {ageDivision.age}</h4>
                {ageDivision.teams && ageDivision.teams.map((team, i) => (
                  <div key={i} className="team">
                    <p>{team.name} vs TBD</p>
                    <p>Team Members: {team.members.join(", ")}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

const Dashboard = () => {
  return (
    <Page isProtected={true} headContent={headContent}>
      <DashboardContent />
    </Page>
  );
};

export default Dashboard;
