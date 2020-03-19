export default function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter((eachDay) => eachDay.name === day)[0];
  const appointments = [];
  if (selectedDay) {
    for (let appointment of selectedDay["appointments"]) {
      if (state.appointments[appointment]["id"] === appointment) {
        appointments.push(state.appointments[appointment])
      }
    }
  }
  return appointments;
};