import React, { useState } from "react";
import axios from "axios";

const apiUrl = "http://localhost:9000/api/result";
const initialPageState = {
  email: "",
  steps: 0,
  x: 2,
  y: 2,
  message: "",
};

export default function AppFunctional(props) {
  const [pageState, setPageState] = useState({ ...initialPageState });
  const { email, steps, x, y, message } = pageState;
  const index = getIndex(x, y);

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({x}, {y})
        </h3>
        <h3 id="steps">
          You moved {steps} time{steps !== 1 ? "s" : ""}
        </h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        {["left", "up", "right", "down"].map((id) => (
          <button key={id} id={id} onClick={move(pageState, setPageState)}>
            {id.toUpperCase()}
          </button>
        ))}
        <button id="reset" onClick={reset(setPageState)}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit(pageState, setPageState)}>
        <input
          onChange={onChange(setPageState)}
          id="email"
          type="email"
          placeholder="type email"
          value={email}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}

// Use this helper to reset all states to their initial values.
function reset(setPageState) {
  return () => {
    setPageState({ ...initialPageState });
  };
}

/**
 * This event handler can use the helper above to obtain a new index for the "B", and change any states accordingly.
 */
function move({ x, y }, setPageState) {
  return (evt) => {
    const [nextX, nextY] = getNextXY(evt.target.id, x, y);
    if (nextX === x && nextY === y) {
      setPageState((prev) => ({
        ...prev,
        message: `You can't go ${evt.target.id}`,
      }));
    } else {
      setPageState((prev) => ({
        email: prev.email,
        steps: prev.steps + 1,
        x: nextX,
        y: nextY,
        message: "",
      }));
    }
  };
}

/**
 * You will need this to update the value of the input.
 */
function onChange(setPageState) {
  return (evt) => {
    setPageState((prev) => ({
      ...prev,
      email: evt.target.value,
    }));
  };
}

/**
 * Use a POST request to send a payload to the server.
 */
function onSubmit(pageState, setPageState) {
  return (evt) => {
    evt.preventDefault();
    axios
      .post(apiUrl, pageState)
      .catch((err) => err.response)
      .then((res) => {
        setPageState((prev) => ({
          ...prev,
          email: "",
          message: res.data.message,
        }));
      });
  };
}

/**
 * Calculate index based on xy coordinates.
 */
function getIndex(x, y) {
  return 3 * (y - 1) + (x - 1);
}

/**
 * This helper takes a direction ("left", "up", etc) and calculates what the next coordinates of the "B" would be. If
 * the move is impossible because we are at the edge of the grid, this helper should return the current coordinates
 * unchanged.
 */
function getNextXY(direction, x, y) {
  let nextX = x;
  let nextY = y;

  if (direction === "right" && x < 3) {
    nextX += 1;
  }
  if (direction === "left" && x > 1) {
    nextX -= 1;
  }
  if (direction === "up" && y > 1) {
    nextY -= 1;
  }
  if (direction === "down" && y < 3) {
    nextY += 1;
  }

  return [nextX, nextY];
}