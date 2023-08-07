import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import { GET_TOURNAMENTS } from '../../graphql/queries';
import './calendar.css'; 

Modal.setAppElement('#root');

const Calendar = () => {
  const { loading, error, data } = useQuery(GET_TOURNAMENTS);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const events = data.tournaments.map(tournament => ({
    id: tournament._id,
    title: tournament.name,
    start: new Date(parseInt(tournament.start)).toISOString(),
    extendedProps: {
      ageDivisions: tournament.ageDivisions,
    },
  }));

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setModalIsOpen(true);
  };

  const handleRegister = (divisionId, eventId) => {
    window.location.href = `/register/${eventId}/${divisionId}`;
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        droppable={true}
        events={events}
        eventClick={handleEventClick}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="custom-modal" 
        contentLabel="Tournament Details"
      >
        {selectedEvent && (
          <>
            <h2>{selectedEvent.title}</h2>
            <select onChange={(e) => handleRegister(e.target.value, selectedEvent.id)}>
              <option value="">Select a division</option>
              {selectedEvent.extendedProps.ageDivisions.map((division) => (
                <option key={division._id} value={division._id}>
                  {division.age}U Register
                </option>
              ))}
            </select>
          </>
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default Calendar;
