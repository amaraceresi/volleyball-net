import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Register() {
  const { tournamentId, agedDivisionId } = useParams();
  const navigate = useNavigate();

  const [teamData, setTeamData] = useState({
    teamName: '',
    teamMembers: [{name: ''}], // Initially an empty team member
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

  const handleRemoveClick = (index) => {
    const list = [...teamData.teamMembers];
    list.splice(index, 1);
    setTeamData({
      ...teamData,
      teamMembers: list,
    });
  };

  const handleAddClick = () => {
    setTeamData({
      ...teamData,
      teamMembers: [...teamData.teamMembers, {name: ''}],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/success');
  };

  return (
    <div>
      <h1>Register Your Team</h1>
      <p>Tournament ID: {tournamentId}</p>
      <p>Age Division ID: {agedDivisionId}</p>
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
              {teamData.teamMembers.length !== 1 && <button onClick={() => handleRemoveClick(i)}>Remove</button>}
              {teamData.teamMembers.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
            </div>
          );
        })}
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" value={teamData.email} onChange={(e) => setTeamData({...teamData, email: e.target.value})} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
