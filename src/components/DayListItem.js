import React from "react";
import '../styles/DayListItem.scss';
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames({
    "day-list__item" : !(props.selected) && !(props.spots === 0),
    "day-list__item__selected": props.selected,
    "day-list__item--full": props.spots === 0 ? true : false
});

const formatSpots = function(spots){
   if(spots === 0){
     return "no spots remaining";
   } else if(spots === 1){
    return "1 spot remaining";
   }else if(spots > 1){
     return spots+" spots remaining"
   }
}
return (
  <li className={dayClass} onClick={() => props.setDay(props.name)}>
    <h2 className="text--regular">{props.name}</h2>
    <h3 className="text--light">{formatSpots(props.spots)}</h3>
  </li>
);
};