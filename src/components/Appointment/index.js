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
   // Setting initial Mode based on the available data
   const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
   // Save an appointmnet. edit keeps track of the call. If call is from edit appointment , then it will be true. If it is from create appointment it will be false
   function save(name, interviewer, edit) {
      const interview = {
         student: name,
         interviewer
      };
      transition(SAVING); // Keeps showing till save is complete or error is thrown
      props.bookInterview(props.id, interview, edit).then((res) => transition(SHOW)).catch(err => transition(ERROR_SAVE)) //Returns to Show, once save is complete , else to Error window
   }

   // To cancel an appointment
   function destroy(id, interview) {
      transition(DELETING);  // Keeps showing till delete is complete or error is thrown
      props.cancelInterview(id, interview).then((res) => transition(EMPTY))    // Returns to Empty on successful deletion or else to Error window
         .catch(err => transition(ERROR_DELETE))
   }

   return (
      <article className="appointment" data-testid="appointment">
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
                  save(name, interviewer, true);
               }}
               onCancel={() => {
                  back(BACK);
               }} />}

         {mode === CREATE &&
            <Form interviewers={props.interviewers}
               interviewer={null}
               name={null}
               onSave={(name, interviewer) => {
                  save(name, interviewer);
               }}
               onCancel={() => {
                  back(BACK);
               }} />}

         {mode === SAVING &&
            <Status message="Saving" />}
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
