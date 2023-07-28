import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const events = [
  {
    id: 1,
    title: "Test Event 1",
    start: "2023-07-14",
    end: "2023-07-20",
  },
  {
    id: 2,
    title: "Test Event 2",
    start: "2023-07-16",
    end: "2023-07-21",
  },
];

export default function Calendar() {
  const handleEventClick = (obj) => {
    const { event } = obj;
    console.log("Event Selected");
    console.log(event);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable={true}
      editable={true}
      droppable={true}
      select={(info) => {
        console.log("date selected");
        if (user === 'Admin') {

        }
        else {
            // Display age groups and have them selectable
            // Register team from age group
        }
        console.log(info);
      }}
      events={events}
      eventClick={handleEventClick}
      // aspectRatio={2.5}
    />
  );
}