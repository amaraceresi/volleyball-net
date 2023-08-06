import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TOURNAMENT } from '../../graphql/mutations';

const Admin = () => {
  const [tournamentDetails, setTournamentDetails] = useState({
    name: '',
    start: ''
  });

  const [addTournament] = useMutation(ADD_TOURNAMENT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTournamentDetails({
      ...tournamentDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addTournament({
        variables: {
          ...tournamentDetails
        },
      });

      console.log('Tournament added:', data.addTournament);
      alert('Tournament created successfully!');

      setTournamentDetails({
        name: '',
        location: '',
        start: ''
      });
    } catch (error) {
      console.error('There was an error creating the tournament:', error);
      alert('Failed to create tournament. Please try again.');
    }
  };

  return (
    <div>
      <h1>Create a Tournament</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={tournamentDetails.name} onChange={handleChange} required />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={tournamentDetails.location} onChange={handleChange} required />
        </label>
        <label>
          Start Date:
          <input type="date" name="start" value={tournamentDetails.start} onChange={handleChange} required />
        </label>
        <button type="submit">Create Tournament</button>
      </form>
    </div>
  );
};

export default Admin;
