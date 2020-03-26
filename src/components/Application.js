import React from "react";
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from 'components/Appointment'
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';
import useApplicationData from 'hooks/useApplicationData';

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();   // Gets all state information

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  // Load all appointments and pass required properties to child
  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);  //Gets interview details
    return <Appointment key={appointment.id}
      {...appointment}
      interview={interview}
      interviewers={interviewers}
      state={state}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        <nav className="sidebar__menu"></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}

