import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_USER_TOURNAMENTS } from '../../graphql/queries';

function Register() {
  const { tournamentId, agedDivisionId } = useParams();
  const navigate = useNavigate();

  const [teamData, setTeamData] = useState({
    teamName: '',
    teamMembers: [{name: ''}, {name: ''}],
    email: '',
  });

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...teamData.teamMembers];
    list[index][name] = value;
    setTeamData({
      ...teamData,
      teamMembers: list,
    });
  };

  const HandleSubmit = async (event) => {
    event.preventDefault();

    const { loading, data } = useQuery(GET_USER_TOURNAMENTS);

    try {
      // Make an API call here


      navigate('/dashboard');
    } catch(err) {
      console.log(err)
    }


  };

  return (
    <div>
      <h1>Register Your Team</h1>
      <p>Tournament ID: {tournamentId}</p>
      <p>Age Division ID: {agedDivisionId}</p>
      <form onSubmit={HandleSubmit}>
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
        <button onClick={() => navigate('/payment')}>Proceed to Payment</button>
      </form>
    </div>
  );
}

export default Register;
