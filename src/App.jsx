import './css/App.css'
import { useState, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => setTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="frame">
      <h3>Stopwatch</h3>
      <div className="time">
        {formatTime(time).split('').map((char, index) => (
          <span key={index} className={`digit ${char === ':' ? 'blinking' : ''}`}>
            {char}
          </span>
        ))}
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
