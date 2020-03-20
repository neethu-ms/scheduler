export function getAppointmentsForDay(state, day) {
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

export function getInterview(state, interview) {
  const interviewers = state.interviewers;
  let processedInterview = null;
  if (interview) {
    processedInterview = {
      student: interview.student,
      interviewer: {}
    };
  }
  if (!interviewers || !interview) {
    return processedInterview;
  }
  processedInterview.interviewer = interviewers[interview.interviewer];
  return processedInterview;
};

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.filter((eachDay) => eachDay.name === day)[0];
  const interviewers = [];
  if (selectedDay) {
    for (let interviewer of selectedDay["interviewers"]) {
      let interviewerDetails = state.interviewers[interviewer];
      interviewers.push(interviewerDetails);
    }
  }
  return interviewers;
};