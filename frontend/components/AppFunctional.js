import React, { useReducer } from "react";

export default function AppFunctional(props) {
  const { appState, dispatch, onSubmit } = useAppState();

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({appState.positionX}, {appState.positionY})
        </h3>
        <h3 id="steps">You moved {appState.steps} times</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === appState.position ? " active" : ""}`}
          >
            {idx === appState.position ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{appState.message ?? ""}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => dispatch({ type: "move_left" })}>
          LEFT
        </button>
        <button id="up" onClick={() => dispatch({ type: "move_up" })}>
          UP
        </button>
        <button id="right" onClick={() => dispatch({ type: "move_right" })}>
          RIGHT
        </button>
        <button id="down" onClick={() => dispatch({ type: "move_down" })}>
          DOWN
        </button>
        <button id="reset" onClick={() => dispatch({ type: "reset" })}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}

function useAppState() {
  const initAppState = {
    position: 4,
    positionX: 2,
    positionY: 2,
    steps: 0,
    message: "",
  };

  const [appState, dispatch] = useReducer(
    (currentAppState, action) => {
      let newAppState = null;

      switch (action.type) {
        case "reset":
          newAppState = { ...initAppState };
          break;
        case "move_left":
          newAppState =
            currentAppState.positionX === 1
              ? { message: "You can't go left" }
              : {
                  message: "",
                  position: currentAppState.position - 1,
                  positionX: currentAppState.positionX - 1,
                  steps: currentAppState.steps + 1,
                };
          break;
        case "move_right":
          newAppState =
            currentAppState.positionX === 3
              ? { message: "You can't go right" }
              : {
                  message: "",
                  position: currentAppState.position + 1,
                  positionX: currentAppState.positionX + 1,
                  steps: currentAppState.steps + 1,
                };
          break;
        case "move_up":
          newAppState =
            currentAppState.positionY === 1
              ? { message: "You can't go up" }
              : {
                  message: "",
                  position: currentAppState.position - 3,
                  positionY: currentAppState.positionY - 1,
                  steps: currentAppState.steps + 1,
                };
          break;
        case "move_down":
          newAppState =
            currentAppState.positionY === 3
              ? { message: "You can't go down" }
              : {
                  message: "",
                  position: currentAppState.position + 3,
                  positionY: currentAppState.positionY + 1,
                  steps: currentAppState.steps + 1,
                };
          break;
      }

      return {
        ...currentAppState,
        ...(newAppState ?? {}),
      };
    },
    { ...initAppState }
  );

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return {
    appState,
    dispatch,
    onSubmit,
  };
}
