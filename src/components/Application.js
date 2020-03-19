import React, {useState, useEffect} from "react";
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from 'components/Appointment'
import axios from 'axios';

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },

  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Maria Philip",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },

  {
    id: 4,
    time: "3pm",
    interview: {
      student: "John",
      interviewer: {
        id: 2,
        name: "Daniel",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },

  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Milano",
      interviewer: {
        id: 2,
        name: "Daniel",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];



export default function Application(props) {
  
/*   const [days, setDays] = useState([]);
  const [day, setDay] = useState("Monday"); */

/*   const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {}

  }); */

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  
  });
  
  const setDay = day => setState((prev) => ({...prev,day}));
  const setDays = days => setState((prev) => ({...prev,days}));

  useEffect(()=>{
     axios.get('/api/days').then(response => {
      setDays(response.data);
     }).catch(error => console.log(error.message))
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
          {appointments.map(appointment => {
            return <Appointment key={appointment.id} {...appointment} />
          })}
          <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}

