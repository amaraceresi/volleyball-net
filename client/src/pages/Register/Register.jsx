import { useMutation, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_USER_TOURNAMENTS } from '../../graphql/queries';
import { REGISTER_FOR_TOURNAMENT } from '../../graphql/mutations';

function Register() {
  const { tournamentId, ageDivisionId } = useParams();
  const navigate = useNavigate();
  
  const [registerForTournament] = useMutation(REGISTER_FOR_TOURNAMENT);
  
  const [teamData, setTeamData] = useState({
    teamName: '',
    teamMembers: [{name: ''}, {name: ''}],
    email: '',
  });

  const { loading, data, error } = useQuery(GET_USER_TOURNAMENTS);

  useEffect(() => {
    if (error) {
      console.error(error);
      // handle error
    }
  }, [error]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...teamData.teamMembers];
    list[index][name] = value;
    setTeamData({
      ...teamData,
      teamMembers: list,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure parameters exist
    if (!tournamentId || !ageDivisionId) {
      console.error('Tournament ID or Age Division ID is not provided.');
      return;
    }

    try {
      await registerForTournament({ 
        variables: { 
          age: parseInt(ageDivisionId), // or simply 'ageDivisionId' if it's already a number
          tournamentId: tournamentId, // Assuming this is an ObjectId string
          teamData: {
            name: teamData.teamName, 
            members: teamData.teamMembers.map(member => member.name)
          },
          ageDivisionId: ageDivisionId // Assuming this is an ObjectId string
        } 
      }); 

      navigate('/payment');
    } catch(err) {
      console.log(err);
    }
  };


  return (
    <div>
      <h1>Register Your Team</h1>
      <p>Tournament ID: {tournamentId}</p>
      <p>Age Division ID: {ageDivisionId}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="teamName">Team Name:</label>
          <input type="text" name="teamName" id="teamName" value={teamData.teamName} onChange={(e) => setTeamData({...teamData, teamName: e.target.value})} required />
        </div>
        {teamData.teamMembers.map((x, i) => {
          return (
            <div key={i}>
              <label htmlFor="name">Team Member {i+1}</label>
              <input
                name="name"
                placeholder="Enter team member's name"
                value={x.name}
                onChange={e => handleInputChange(e, i)}
              />
            </div>
          );
        })}
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" value={teamData.email} onChange={(e) => setTeamData({...teamData, email: e.target.value})} required />
        </div>
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
}

export default Register;
