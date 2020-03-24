import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";
import { getByText } from "@testing-library/react";

import Application from "components/Application";
/* import axios from "__mocks__/axios";
jest.mock(axios); */

afterEach(cleanup);
describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1",async () => {
       const { container, debug } = render(<Application />);
       await waitForElement(() => getByText(container,"Archie Cohen"));
       const appointment = getAllByTestId(container, "appointment")[0];
       fireEvent.click(getByAltText(appointment,"Add"));  
      // debug();
      fireEvent.change(getByPlaceholderText(appointment,/enter student name/i),{
          target:{ value: "Lydia Miller-Jones"}
       });
       fireEvent.click(getByAltText(appointment,"Sylvia Palmer"));
       fireEvent.click(getByText(appointment,"Save"));
      console.log(prettyDOM(appointment));
      expect(getByText(appointment, "Saving")).toBeInTheDocument();
  });

});