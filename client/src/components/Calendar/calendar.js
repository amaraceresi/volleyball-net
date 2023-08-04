import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import { GET_TOURNAMENTS } from '../../graphql/queries';

Modal.setAppElement('#root');

const Calendar = () => {
  const { loading, error, data } = useQuery(GET_TOURNAMENTS);
  const calendar = useRef(null);

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

  const TournamentModal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const closeModal = () => {
      setModalIsOpen(false);
    };

    const openModal = (event) => {
      setSelectedEvent(event);
      setModalIsOpen(true);
    };

    useEffect(() => {
      const handleEventClick = ({ event }) => {
        openModal(event);
      };
      
      calendar.current.getApi().on('eventClick', handleEventClick);
      
      return () => {
        calendar.current.getApi().off('eventClick', handleEventClick);
      };
    }, []);

    if (!selectedEvent) return null;

    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Tournament Details"
      >
        <h2>{selectedEvent.title}</h2>
        {selectedEvent.extendedProps.ageDivisions.map((division) => (
          <div key={division._id}>
            <h3>{division.age}U Division</h3>
            <button onClick={() => window.location.href=`/register/${selectedEvent.id}/${division._id}`}>Register for {division.age}U</button>
          </div>
        ))}
        <button onClick={closeModal}>Close</button>
      </Modal>
    );
  };

  return (
    <div>
      <FullCalendar
        ref={calendar}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        droppable={true}
        events={events}
      />
      <TournamentModal />
    </div>
  );
};

export default Calendar;
