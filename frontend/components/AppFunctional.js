import React, { useState } from 'react'

// Suggested initial states
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  const [index, setIndex] = useState(initialIndex)
  const [steps, setSteps] = useState(initialSteps)

  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  function stepCounter() {
    let newSteps = steps;
    if (index - 1) {
      newSteps++
    }
    return newSteps;
  }

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    let coordinates = [
      '1,1',
      '1,2',
      '1,3',
      '2,1',
      '2,2',
      '2,3',
      '3,1',
      '3,2',
      '3,3',
    ]
    let xy = coordinates[index]
    return xy
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setIndex(initialIndex)

  }
  console.log(index)

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    let newIndex = index;
    if (direction === 'right') {
      if (newIndex === 2 || newIndex === 5 || newIndex === 8) {
        return newIndex;
      }
      newIndex += 1;
    }
    if (direction === 'left') {
      if (newIndex === 0 || newIndex === 3 || newIndex === 6) {
        return newIndex;
      }
      newIndex -= 1;
    }
    if (direction === 'up') {
      if (newIndex === 0 || newIndex === 1 || newIndex === 2) {
        return newIndex;
      }
      newIndex -= 3;
    }
    if (direction === 'down') {
      if (newIndex === 6 || newIndex === 7 || newIndex === 8) {
        return newIndex;
      }
      newIndex += 3;
    }

    return newIndex
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const nextIndex = getNextIndex(evt.target.id)
    setIndex(nextIndex)
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({getXY(index)})</h3>
        <h3 id="steps">You moved {stepCounter} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button onClick={move} id="left">LEFT</button>
        <button onClick={move} id="up">UP</button>
        <button onClick={move} id="right">RIGHT</button>
        <button onClick={move} id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
