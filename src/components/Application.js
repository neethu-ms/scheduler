import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from 'components/Appointment'
import axios from 'axios';
import getAppointmentsForDay from '../helpers/selectors';

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState((prev) => ({ ...prev, day }));
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments'))
    ]
    ).then((all) => {
      setState((state) => ({ ...state, days: all[0].data, appointments: all[1].data }))
    });

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
        {getAppointmentsForDay(state, state.day).map(appointment => {
          return <Appointment key={appointment.id} {...appointment} />
        })}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}

