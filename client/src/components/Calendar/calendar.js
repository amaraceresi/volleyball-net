import React from 'react';
import { useQuery } from '@apollo/client';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { GET_USER_TOURNAMENTS } from '../../graphql/queries';

const Calendar = () => {
  const { loading, error, data } = useQuery(GET_USER_TOURNAMENTS);

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const events = data.userTournaments.map(tournament => ({
    id: tournament._id,
    title: tournament.name,
    start: tournament.start, 
  }));

  const handleEventClick = ({ event }) => {
    console.log("Event Selected");
    console.log(event.id);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        droppable={true}
        select={(info) => {
          console.log("date selected");
          console.log(info);
        }}
        events={events}
        eventClick={handleEventClick}
        // aspectRatio={2.5}
      />
    </div>
  );
};

export default Calendar;
