import React from 'react';
import './styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from 'components/Appointment/Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from 'components/Appointment/Error';
import { checkPropTypes } from 'prop-types';

export default function Appointment(props) {
   const EDIT = "EDIT";
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
   function save(name, interviewer,edit) {
      const interview = {
         student: name,
         interviewer
      };
      transition(SAVING);
      props.bookInterview(props.id, interview,edit).then((res) => transition(SHOW)).catch(err => transition(ERROR_SAVE))
   }
   function destroy(id, interview) {
      transition(DELETING);
      props.cancelInterview(id, interview).then((res) => transition(EMPTY))
         .catch(err => transition(ERROR_DELETE))
   }
  let editValue = false;
   return (
      <article className="appointment">
         <Header time={props.time} />
         {mode === EMPTY && <Empty onAdd={() => {
            transition(CREATE)
         }
         } />}
         {mode === SHOW &&
            <Show interviewer={(props.interview) ? props.interview.interviewer : null}
               student={(props.interview) ? props.interview.student : null}
               interview={props.interview} id={props.id}
               onDelete={() => { transition(CONFIRM) }}
               onEdit={
                  () => {
                     transition(EDIT);
                     
                  }
               }
            />}

         {mode === EDIT &&
            <Form interviewers={props.interviewers}
               interviewer={(props.interview) ? props.state.appointments[props.id].interview.interviewer : null}
               name={(props.interview) ? props.interview.student : null}
                  onSave={(name, interviewer) => {
                  save(name, interviewer,true);
               }}
               onCancel={() => {
                  back(BACK);
               }} />}

         {mode === CREATE &&
            <Form interviewers={props.interviewers}
               interviewer={null}
               name={null}
                  onSave={(name, interviewer) => {
                  save(name, interviewer,editValue);
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
            <Error message="Could not cancel appointment" onClose={() => {
               back()
            }
            } />
         }
         {mode === ERROR_SAVE &&
            <Error message="Could not create appointment" onClose={() => {
               back()
            }
            } />
         }
      </article>
   );
}
