import React, { Fragment } from 'react';
import './styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from 'components/Appointment/Form';

export default function Appointment(props) {
   const EMPTY = "EMPTY";
   const SHOW = "SHOW";
   const CREATE = "CREATE";
   const BACK = "BACK";
   const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
   console.log("props interviewers=", props.interviewers);
   return (
      <article className="appointment">
         <Header time={props.time} />
         {mode === EMPTY && <Empty onAdd={() => {
            console.log("OnAdd");
            transition(CREATE)
         }
         } />}
         {mode === SHOW && <Show interviewer={props.interview.interviewer} student={props.interview.student} />}
         {mode === CREATE && <Form interviewers={props.interviewers} onSave={() => { console.log("On Save") }} onCancel={() => {
            back(BACK);
         }} />}
         {mode === BACK && <Empty onAdd={() => {
            console.log("OnAdd");
            transition(CREATE)
         }
         } />}
      </article>
   );
}
