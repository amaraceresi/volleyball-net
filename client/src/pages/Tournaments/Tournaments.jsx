import React from 'react';
import Page from "../../components/Page";
import Calendar from "../../components/Calendar/calendar";

const headContent = (
  <>
    <title>Tournaments</title>
    <meta name="description" content="This page lists all the Volleyball Tournaments." />
  </>
);

const Tournaments = () => {
  return (
    <Page isProtected={true} headContent={headContent}>
      <Calendar />
    </Page>
  );
};

export default Tournaments;
