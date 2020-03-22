import React, { Fragment } from 'react';
import './styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from 'components/Appointment/Form';
import axios from 'axios';
import Status from './Status';
import Confirm from './Confirm';
import Error from 'components/Appointment/Error';

export default function Appointment(props) {
   const EMPTY = "EMPTY";
   const SHOW = "SHOW";
   const CREATE = "CREATE";
   const BACK = "BACK";
   const SAVING = "SAVING";
   const CONFIRM = "CONFIRM";
   const DELETING = "DELETING";
   const ERROR_SAVE = "ERROR_SAVE";
   const ERROR_DELETE = "ERROR_DELETE";
   const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
   //const { mode, transition, back } = useVisualMode();
   /* function bookInterview(id, interview) {
      const appointment = {
         ...props.state.appointments[id],
         interview: { ...interview }
      };

      const appointments = {
         ...props.state.appointments,
         [id]: appointment
      };

      axios.put(`/api/appointments/${id}`, { interview: interview }).then((res) => {
         props.setState({
            ...props.state,
            appointments
         });
         transition(SHOW);
      }).catch(err => transition(ERROR_SAVE,true));

   }*/
   function save(name, interviewer) {
      console.log('on save');
      const interview = {
         student: name,
         interviewer
      };
      transition(SAVING);
      if((props.bookInterview(props.id, interview)) === "ERROR"){
         transition(ERROR_SAVE);
      }else{
         transition(SHOW);
      }
   }
   function destroy(id, interview) {
      console.log('in delete');
      transition(DELETING);
      if(props.cancelInterview(id, interview) === "ERROR"){
         transition(ERROR_DELETE)
      }else{
         transition(EMPTY)
      }
   }

   return (
      <article className="appointment">
         <Header time={props.time} />
         {mode === EMPTY && <Empty onAdd={() => {
            console.log("OnAdd");
            transition(CREATE)
         }
         } />}
         {mode === SHOW &&
            <Show interviewer={(props.interview)?props.interview.interviewer:null}
               student={(props.interview)?props.interview.student:null}
               interview={props.interview} id={props.id}
               onDelete={() => { transition(CONFIRM) }}
               onEdit={
                  () => {
                   transition(CREATE);
                  }
               }
            />}

         {mode === CREATE &&
            <Form interviewers={props.interviewers}
               interviewer={(props.interview) ? props.state.appointments[props.id].interview.interviewer : null}
               name={(props.interview) ? props.interview.student : null}
               onSave={(name, interviewer) => {
                  console.log('on save:','name=',name,'interviewer=',interviewer);
                  save(name, interviewer);
               }}
               onCancel={() => {
                  back(BACK);
               }} />}

         {mode === SAVING &&
            <Status message="Loading" />}
         {mode === CONFIRM &&
            <Confirm id={props.id}
               interview={props.interview}
               message="Are you sure you would like to delete"
               onCancel={() => transition(SHOW)}
               onConfirm={(id, interview) => destroy(id, interview)} />}
         {mode === DELETING &&
            <Status message="Deleting" />}

         {mode === ERROR_DELETE &&
          <Error message="Could not cancel appointment" onClose={() => 
            {
               
               back()}
            }/>
         }
                  {mode === ERROR_SAVE &&
          <Error message="Could not create appointment" onClose={() => 
            {
               
               back()}
            }/>
         }
      </article>
   );
}
