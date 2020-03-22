import { useState, useEffect } from "react";
import axios from 'axios';
import useVisualMode from 'hooks/useVisualMode';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';
import Status from "components/Appointment/Status";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const SHOW = "SHOW";
const EMPTY = "EMPTY";
const DELETING = "DELETING";
const SAVING = "SAVING";
export default function useApplicationData() {
  const { mode, transition, back } = useVisualMode();
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ]
    ).then((all) => {
      setState((state) => ({ ...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });

  }, []);

  

  /* const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day); */

  const setDay = day => setState((prev) => ({ ...prev, day }));
  const bookInterview = function bookInterview(id, interview) {
    console.log('interview in book',interview)
/*     console.log('inside save')
    transition(SAVING);
    console.log('after transition') */
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview: interview }).then((res) => {
      setState({
        ...state,
        appointments
      });
      console.log('In put success')
      return res.data;
     // transition(SHOW);
    }).catch(err => {
      console.log('In Error')
      return "ERROR";
      //transition(ERROR_SAVE);
    });

  };
  const cancelInterview = function cancelInterview(id, interview) {
       const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState({
        ...state,
        appointments
      });
      return res.data;
      //transition(EMPTY);
    }).catch(err => {
      return "ERROR";
      //transition(ERROR_DELETE)
    });
  }


  return { state, setDay, bookInterview, cancelInterview };
};


