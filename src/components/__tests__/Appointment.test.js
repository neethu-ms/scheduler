import React from 'react';
import { render } from "@testing-library/react";
import Application from "components/Application";
import interviewListItem from 'components/InterviewerListItem';

describe("Appointment", () => {
test("renders without crashing",() => {
   render(<Application />);
}); 
});