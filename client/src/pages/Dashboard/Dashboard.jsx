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


  console.log(data);

  
return (
    <div>
      <h2>My Registered Tournaments</h2>
      {data.userTournaments.map((tournament) => {
        const startDate = tournament.start ? new Date(parseInt(tournament.start)).toLocaleDateString() : "Not provided";

        return (
          <div key={tournament._id}>
            <h3>{tournament.name} - {startDate}</h3>
            {tournament.ageDivisions && tournament.ageDivisions.map((ageDivision, index) => (
              <div key={index}>
                <h4>Age Division: {ageDivision.age}</h4>
                {ageDivision.teams && ageDivision.teams.map((team, i) => (
                  <div key={i}>
                    <p>{team.name} vs TBD</p>
                    <p>
                      Team Members: {team.members.join(", ")}
                    </p>
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
