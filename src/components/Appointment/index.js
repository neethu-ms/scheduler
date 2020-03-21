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

export default function Appointment(props) {
   const EMPTY = "EMPTY";
   const SHOW = "SHOW";
   const CREATE = "CREATE";
   const BACK = "BACK";
   const SAVING = "SAVING";
   const CONFIRM = "CONFIRM";
   const DELETING = "DELETING";
   const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
   function bookInterview(id, interview) {
      const appointment = {
         ...props.state.appointments[id],
         interview: { ...interview }
      };

      const appointments = {
         ...props.state.appointments,
         [id]: appointment
      };

      axios.put(`/api/appointments/${id}`, { interview: interview }).then((res) => 
      {
         props.setState({
            ...props.state,
            appointments
         });
      transition(SHOW);
      });
      
   }
   function save(name, interviewer) {
      console.log('on save');
      const interview = {
         student: name,
         interviewer
      };
      transition(SAVING);
      bookInterview(props.id, interview);
   }

   function deleteInterview(id,interview){
      console.log('in delete');
      transition(CONFIRM);
       //cancelInterview(id,interview);
    }

    function cancelInterview(id,interview){
      
      transition(DELETING);
      const appointment = {
         ...props.state.appointments[id],
         interview:null
      }
      const appointments = {
         ...props.state.appointments,
         [id]: appointment
      };
      axios.delete(`/api/appointments/${id}`).then(() => {
         props.setState({
            ...props.state,
            appointments
         });
         transition(EMPTY);
      });
   }


   return (
      <article className="appointment">
         <Header time={props.time} />
         {mode === EMPTY && <Empty onAdd={() => {
            console.log("OnAdd");
            transition(CREATE)
         }
         } />}
         {mode === SHOW && <Show interviewer={props.interview.interviewer} student={props.interview.student} interview={props.interview} id={props.id}
         onDelete = {(id,interview) => {deleteInterview(id,interview)}}/>}
         {mode === CREATE && <Form interviewers={props.interviewers}
            onSave={(name, interviewer) => {
               console.log('on save');
               save(name, interviewer);
            }}
            onCancel={() => {
               back(BACK);
            }} />}
         {mode === BACK && <Empty onAdd={() => {
            console.log("OnAdd");
            transition(CREATE)
         }
         } />}
         {mode === SAVING && <Status message="Loading"/>}
         {mode === CONFIRM && <Confirm id={props.id} interview={props.interview} message="Are you sure you would like to delete" 
         onCancel={() => transition(SHOW)} onConfirm={(id,interview) => cancelInterview(id,interview)}/>}
         {mode === DELETING && <Status message="Deleting"/>}
      </article>
   );
}
/*() => transition(SHOW) */