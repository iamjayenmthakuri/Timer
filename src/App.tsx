import { useReducer, useRef } from "react";
import "./App.css";

const initialState = {
  count: 0,
  isRunning: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "start":
      return { ...state, isRunning: true };
    case "stop":
      return { ...state, isRunning: false };
    case "reset":
      return { count: 0, isRunning: false };
    case "tick":
      return { ...state, count: state.count + 1 };
    default:
      throw new Error();
  }
};

function Timer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const intervalRef = useRef();

  const startTimer = () => {
    dispatch({ type: "start" });
    intervalRef.current = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
  };

  const stopTimer = () => {
    dispatch({ type: "stop" });
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    dispatch({ type: "reset" });
    clearInterval(intervalRef.current);
  };

  return (
    <div className="timer-container">
      <h1>Simple Timer</h1>
      <div className="timer-display">{state.count}</div>
      <div className="timer-controls">
        {!state.isRunning && <button onClick={startTimer}>Start</button>}
        {state.isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default Timer;
