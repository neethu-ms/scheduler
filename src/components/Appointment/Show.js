import React from 'react';
export default function (props) {
  console.log("props show",props);
  
  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{props.student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{props.interviewer && props.interviewer.name}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button" onClick={props.onEdit && props.onEdit(props.student)}
            src="images/edit.png"
            alt="Edit"
          />
          <img
            className="appointment__actions-button" onClick={props.onDelete && (props.student)}
            src="images/trash.png"
            alt="Delete"
          />
        </section>
      </section>
    </main>
  );
};