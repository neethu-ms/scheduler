import { useState, useEffect } from "react";
import axios from 'axios';
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // Loads initial data
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
  const setDay = day => setState((prev) => ({ ...prev, day }));

  // Update days with correct spots. spots can be +1 or -1 based on whether it is cancel or book of appointment,
  const getUpdatedDays = function (day, days, spots) {
    let updatedDays = days.map((eachDay) => {
      if (eachDay.name === day) {
        return { ...eachDay, spots: eachDay.spots + spots };
      }
      return eachDay;
    });

    return updatedDays;
  }

  //Books an interview. 
  const bookInterview = function bookInterview(id, interview, edit) {
    let days = state.days;
    if (!edit) {
      days = getUpdatedDays(state.day, state.days, -1);
    }
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
        appointments,
        days

      });
      return res;
    });
  };

  //Cancels an interview
  const cancelInterview = function cancelInterview(id, interview) {
    let days = getUpdatedDays(state.day, state.days, 1);
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
        appointments,
        days
      });
      return res;
    })
  }
  return { state, setDay, bookInterview, cancelInterview };
};


