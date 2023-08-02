import { useSelector } from 'react-redux';
import { getUser } from '../../redux/slices/userSlice';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Select from 'react-dropdown-select';

const events = [
  {
    id: 1,
    title: "Test Event 1",
    start: "2023-08-05",
    end: "2023-08-05",
  },
  {
    id: 2,
    title: "Test Event 2",
    start: "2023-08-08",
    end: "2023-08-08",
  },
];

const options = [
  { value: '16', label: '16U Register' },
  { value: '14', label: '14U Register' },
  { value: '12', label: '12U Register' },
];

export default function Calendar() {
  const { userData } = useSelector(getUser());
  const { role } = userData;
  const navigate = useNavigate();

  const handleEventClick = ({ event }) => {
    console.log("Event Selected");
    console.log(event.id);

  };

  const EventContent = ({ event }) => (
    <div>
      <b>{event.title}</b>
      <Select
        options={options}
        onChange={(selected) => {
          navigate(`/register/${event.id}/${selected[0].value}`);
        }}
      />
    </div>
  );

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
          if (role === 'Admin') {
            // Do something if the user is an admin
          }
          else {
            // Display age groups and have them selectable
            // Register team from age group
          }
          console.log(info);
        }}
        events={events}
        eventClick={handleEventClick}
        eventContent={EventContent}
        // aspectRatio={2.5}
      />
    </div>
  );
}
