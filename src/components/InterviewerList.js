import React from 'react';
import InterviewerListItem from './InterviewerListItem';

import '../styles/InterviewerList.scss';


export default function InterviewList(props) {
  const interviewers = props.interviewers;

  const interviewerList = interviewers.map(interviewer => {
    return (<InterviewerListItem key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={(event) => props.setInterviewer(interviewer.id)}
      selected = {interviewer.id === props.interviewer}/>
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

{/* <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list"></ul>
</section> */}