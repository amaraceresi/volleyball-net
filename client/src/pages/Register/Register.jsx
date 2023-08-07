import { useMutation, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { GET_TOURNAMENTS } from '../../graphql/queries';
import { REGISTER_FOR_TOURNAMENT } from '../../graphql/mutations';
import './Register.css';

const stripePromise = loadStripe('pk_test_51Nbr2wJk5OMPdC4gVsTRFv8N2NZRJCfidY0mYUSLBYxG1MeEeXMGLUrgzUV3eqE11iwil2LdqwKT1CLqiZtNjVjN00ij2Pu8oF');

function Register() {
  const { tournamentId, ageDivisionId } = useParams();

  const [registerForTournament, { data }] = useMutation(REGISTER_FOR_TOURNAMENT);

  const [teamData, setTeamData] = useState({
    teamName: '',
    teamMembers: [{name: ''}, {name: ''}],
    email: '',
    age: '',
  });

  const { loading, error, data: queryData } = useQuery(GET_TOURNAMENTS);

  let tournamentName = '';
  let ageDivision = '';

  if (!loading && queryData) {
    const tournament = queryData.tournaments.find(tournament => tournament._id === tournamentId);

    if (tournament) {
      tournamentName = tournament.name;
      const ageDivisionObj = tournament.ageDivisions.find(ageDivision => ageDivision._id === ageDivisionId);

      if (ageDivisionObj) {
        ageDivision = ageDivisionObj.age;
      }
    }
  }

  useEffect(() => {
    if (error) {
      console.error(error);
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

    if (!tournamentId || !ageDivisionId) {
      console.error('Tournament ID or Age Division ID is not provided.');
      return;
    }

    if (teamData.teamMembers.length < 2 || teamData.teamMembers[0].name === '' || teamData.teamMembers[1].name === '') {
      alert('You need to have at least two team members.');
      return;
    }

    try {
      await registerForTournament({
        variables: {
          age: parseInt(ageDivisionId),
          tournamentId: tournamentId,
          teamData: {
            name: teamData.teamName,
            members: teamData.teamMembers.map(member => member.name)
          },
          ageDivisionId: ageDivisionId
        }
      });

      alert("Registration successful!");
      setTeamData({
        teamName: '',
        teamMembers: [{name: ''}, {name: ''}],
        email: '',
        age: '',
      });
    } catch(err) {
      console.error(err);
    }
  };

  const handlePayment = async () => {
    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: 'price_1NbrP8Jk5OMPdC4gg82iG8bz', quantity: 1 }],
      mode: 'payment',
      successUrl: `${window.location.origin}/register?success=true`,
      cancelUrl: `${window.location.origin}/register?canceled=true`,
    });

    if (error) {
      console.warn('Error:', error);
    }
  };

  return (
    <div className="register-container">
      <div className="container">
        <h1 className="title">Register Your Team</h1>
        <p>Tournament ID: {tournamentName}</p>
        <p>Age Division ID: {ageDivision}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="teamName">Team Name:</label>
            <input type="text" name="teamName" id="teamName" value={teamData.teamName} onChange={(e) => setTeamData({...teamData, teamName: e.target.value})} required />
          </div>
          {teamData.teamMembers.map((x, i) => {
            return (
              <div key={i}>
                <label htmlFor="name">Team Member {i+1}:</label>
                <input
                  name="name"
                  placeholder=""
                  value={x.name}
                  onChange={e => handleInputChange(e, i)}
                  required
                />
              </div>
            );
          })}
          <button type="submit">Register</button>
        </form>
        <div>
          <p>Registration Fee: $40</p>
          <button onClick={handlePayment}>Proceed to Payment</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
