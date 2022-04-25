import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Container } from "@material-ui/core";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

import { useDispatch, useSelector } from "react-redux";
import { action_get_events } from "../Services/Actions/Events_Actions";
function Calendar() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.Events_Reducer.data);
  useEffect(() => {
    dispatch(action_get_events());
  }, [dispatch]);
  console.log(events);

  const handleDateClick = (arg) => {
    alert(arg.dateStr + "test");
  };
  return (
    <div>
      <Container type="fixed">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={events?.map((event) => ({
            title: `${event.evtitle} -Start ${event.evstarttime}`,
            start: event.evstartdate,
            end: event.evenddate,
            allDay: true,
            durationEditable: true,
            // startTime: event.evstarttime,
            // endTime: event.evendtime,
            backgroundColor: "red",
            description: event.evdesc,
          }))}
          dateClick={handleDateClick}
        />
      </Container>
    </div>
  );
}
export default Calendar;
