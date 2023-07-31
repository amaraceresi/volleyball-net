import React from 'react';
import { Helmet } from 'react-helmet-async';
import Page from "../../components/Page";

const TournamentDetails = () => {
  return (
    <Page isProtected={true}>
      <Helmet>
        <title>Tournament Details</title>
        <meta name="description" content="This page shows the details of the selected Volleyball Tournament." />
      </Helmet>
      {}
    </Page>
  );
};

export default TournamentDetails;
