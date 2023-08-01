import React, {useContext} from 'react';
import { useParams, useLocation } from 'react-router-dom'

import { AppContext } from "../../App"

function Register() {
  // const {
  //   test, setTest
  //  } = useContext(AppContext)

  //  console.log(test)

  const { tournamentId, agedDivisionId } = useParams();
  console.log(tournamentId, agedDivisionId);

  return (
    <>
      <h1>Register Page</h1>
      {/* <p>{test}</p> */}
    </>
  )
}

export default Register;