import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_TOURNAMENTS } from '../../graphql/queries';
import Page from '../../components/Page';

const headContent = ( 
  <>
    <title>Dashboard</title>
    <meta name="description" content="This is my personalized homepage." />
  </>
);

const DashboardContent = () => {
  const { loading, error, data } = useQuery(GET_USER_TOURNAMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error so sad</p>;
  }

  return (
    <div>
      <h2>My Registered Tournaments</h2>
      {data.userTournaments.map((tournament) => (
        <div key={tournament._id}>
          <h3>{tournament.name}</h3>
          <p>Location: {tournament.location}</p>
          <p>Start: {new Date(tournament.start).toLocaleDateString()}</p>
          <p>End: {new Date(tournament.end).toLocaleDateString()}</p>
          {tournament.ageDivisions.map((ageDivision, index) => (
            <div key={index}>
              <h4>Age Division: {ageDivision.age}</h4>
              <p>Team Cap: {ageDivision.teamCap}</p>
              {ageDivision.teams.map((team, i) => (
                <p key={i}>Team: {team.name}</p>
              ))}
            </div>
          ))}
        </div>
      ))}
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
