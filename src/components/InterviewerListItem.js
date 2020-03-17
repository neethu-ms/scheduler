import React from 'react';
import '../styles/InterviewerListItem.scss';
import classNames from 'classnames';

export default function interviewListItem(props) {
  console.log("props",props);

  const interviewListClass = classNames("interviewers__item",
    {
      "interviewers__item--selected": props.selected,
      "selected":props.selected
    }
  );

  const interviewImgClass = classNames("interviewers__item-image");

  return (
    <li className={interviewListClass} onClick={props.setInterviewer}>
      <img
        className={interviewImgClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  );
};

