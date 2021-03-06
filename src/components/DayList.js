import React from 'react';
import DayListItem from './DayListItem';
export default function DayList(props) {
  const days = props.days;
  // Loads days 
  const dayListItems = days.map((eachDay) => {
    return (<DayListItem
      key={eachDay.id}
      name={eachDay.name}
      spots={eachDay.spots}
      selected={props.day === eachDay.name}
      setDay={() => props.setDay(eachDay.name)} />
    );
  });
  return (
    <ul>
      {dayListItems}
    </ul>
  );
};