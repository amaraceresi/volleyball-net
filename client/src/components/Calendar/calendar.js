import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import { GET_TOURNAMENTS } from '../../graphql/queries';

Modal.setAppElement('#root');

const Calendar = () => {
  const { loading, error, data } = useQuery(GET_TOURNAMENTS);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState("");

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

  const handleRegister = () => {
    const division = selectedEvent.extendedProps.ageDivisions.find(
      (division) => division.age === selectedDivision
    );
    window.location.href = `/register/${selectedEvent.id}/${division._id}`;
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
        contentLabel="Tournament Details"
      >
        {selectedEvent && (
          <>
            <h2>{selectedEvent.title}</h2>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
            >
              {selectedEvent.extendedProps.ageDivisions.map((division) => (
                <option key={division._id} value={division.age}>
                  {division.age}U Division
                </option>
              ))}
            </select>
            <button onClick={handleRegister}>
              Register for {selectedDivision}U
            </button>
          </>
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default Calendar;
