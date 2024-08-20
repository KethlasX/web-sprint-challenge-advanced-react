/**
 * MVP 2, Testing
 * - Using codegrade_mvp.test.js as inspiration, write 5 tests inside frontend/components/App.test.js:
 *   - From inside the test file, import AppFunctional.js.
 *   - Test that the visible texts in headings, buttons, links... render on the screen.
 *   - Test that typing on the input results in its value changing to the entered text.
 */
import React from "react";
import AppFunctional from "./AppFunctional";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

jest.setTimeout(1000); // default 5000 too long for Codegrade

let wrapper, coordinates, steps, squares, message;

beforeEach(() => {
  render(<AppFunctional />);

  const rootSelector = "body > div > div#wrapper";
  wrapper = document.querySelector(rootSelector);
  coordinates = document.querySelector(
    `${rootSelector} > div:first-child.info > h3#coordinates`
  );
  steps = document.querySelector(
    `${rootSelector} > div:first-child.info > h3#steps`
  );
  squares = document.querySelectorAll(
    `${rootSelector} > div#grid > div.square`
  );
  message = document.querySelector(
    `${rootSelector} > div:not(:first-child).info > h3#message`
  );
});
afterEach(() => {
  document.body.innerHTML = "";
});

test("div#wrapper exists", () => {
  expect(wrapper instanceof HTMLDivElement).toBeTruthy();
});
test("h3#coordinates exists", () => {
  expect(coordinates instanceof HTMLHeadingElement).toBeTruthy();
});
test("h3#steps exists", () => {
  expect(steps instanceof HTMLHeadingElement).toBeTruthy();
});
test("h3#message exists", () => {
  expect(message instanceof HTMLHeadingElement).toBeTruthy();
});
test("div.square exists", () => {
  expect(squares.length).toEqual(9);
  let j = 0;
  for (let i=0; i<squares.length; i++) {
    expect(squares[i] instanceof HTMLDivElement).toBeTruthy();
    if (squares[i].textContent === "B") {
      j++;
    }
  }
  expect(j).toEqual(1);
});