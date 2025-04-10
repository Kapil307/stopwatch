import './css/App.css'
import { useState, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [prevTimeString, setPrevTimeString] = useState("00:00");

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime(prev => {
          const nextTime = prev + 1;
          setPrevTimeString(formatTime(prev)); // save current time before updating
          return nextTime;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setPrevTimeString("00:00");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentTimeString = formatTime(time);

  return (
    <div className="frame"> <h3>Stop Watch</h3>
      <div className="time">
        {currentTimeString.split('').map((char, index) => {
          const isChanging = char !== prevTimeString[index];
          return (
            <span
              key={`${char}-${index}-${time}`}
              className={
                char === ':' 
                  ? `digit colon ${isRunning ? 'blinking' : ''}` 
                  : `digit ${isChanging ? 'animate' : ''}`
              }
            >
              {char}
            </span>
          );
        })}
      </div>
      <div className="sec">
        <button className="btn-1" onClick={handleStart}>Start</button>
        <button className="btn-2" onClick={handleStop}>Stop</button>
        <button className="btn-3" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
