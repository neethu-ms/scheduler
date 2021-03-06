import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

import '../styles/InterviewerList.scss';

InterviewList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
}; // Adding type validation for props

export default function InterviewList(props) {
  const interviewers = props.interviewers;
  // Loading interviewers
  const interviewerList = interviewers.map(interviewer => {
    return (<InterviewerListItem key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={(event) => props.onChange(interviewer.id)}
      selected = {interviewer.id === props.value}/>
    );
  });
  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
    {interviewerList}
    </ul>
    </section> 
  );
};

