import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const intervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (!isRunning || isPaused || isReset) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current as NodeJS.Timer);
          setIsRunning(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current as NodeJS.Timer);
  }, [isRunning, isPaused, isReset]);

  const start = () => {
    const total = minutes * 60 + seconds;
    setTimeLeft(total);
    setIsRunning(true);
    setIsReset(false);
  };

  const pause = () => {
    setIsPaused(!isPaused);
    if(isPaused) {
      clearInterval(intervalRef.current as NodeJS.Timer);
    }
  };

  const reset = () => {
    setIsPaused(false);
    setIsRunning(false);
    setIsReset(true);
    setTimeLeft(0);
  }

  const timeFormat = (timeLeft: number) => {
    return `${String(Math.floor(timeLeft / 60)).padStart(2, "0")} : ${String(
      timeLeft % 60
    ).padStart(2, "0")}`;
  };

  return (
    <div className="App">
      <h1>Timer</h1>

      <label>
        Minutes:
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
        />
      </label>

      <label>
        Secondes:
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(Number(e.target.value))}
        />
      </label>

      <button onClick={start} disabled={isRunning}>
        Start
      </button>

      {<button onClick={pause} disabled={!isRunning}>{isPaused ? 'Pause' : 'Resume'}</button>}
      {<button onClick={reset} disabled={!isRunning}>Reset</button>}
      
      <div>Temps restant: {timeFormat(timeLeft)}</div>
    </div>
  );
}

export default App;
