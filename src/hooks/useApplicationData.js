import { useState, useEffect } from "react";
import axios from 'axios';
export default function useApplicationData() {
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
  const setDay = day => setState((prev) => ({ ...prev, day }));
  const getUpdatedDays = function (day, days, spots) {
    let updatedDays = days.slice();
    let currentDay = days.filter((eachDay) => eachDay.name === day)[0];
    currentDay.spots += spots;
    updatedDays[currentDay.id - 1] = currentDay;
    return updatedDays;
  }
  const bookInterview = function bookInterview(id, interview) {
    let days = getUpdatedDays(state.day, state.days, -1);
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
    }).catch(err => {
      return err;
    });
  };
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
    }).catch(err => {
      return err;
    });
  }
  return { state, setDay, bookInterview, cancelInterview };
};


