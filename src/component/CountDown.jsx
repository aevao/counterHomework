import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

const CountDown = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const startTimer = () => {
    const totalSeconds =
      days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
    setSeconds(totalSeconds);
    setTimerActive(true);
  };

  const stopTimer = () => {
    setTimerActive(false);
    setMinutes(0);
    setHours(0);
    setDays(0);
    setSeconds(0);
  };

  useEffect(() => {
    let timer;

    if (seconds > 0 && timerActive) {
      timer = setTimeout(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      setTimerActive(false);
    }

    return () => clearTimeout(timer);
  }, [seconds, timerActive]);

  useEffect(() => {
    if (timerActive) {
      const remainingDays = Math.floor(seconds / (24 * 60 * 60));
      const remainingHours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
      const remainingMinutes = Math.floor((seconds % (60 * 60)) / 60);

      setDays(remainingDays);
      setHours(remainingHours);
      setMinutes(remainingMinutes);
    }
  }, [timerActive, seconds]);

  return (
    <div className="container mt-5 w-25">
      <div className="countdown-container">
        <div className="form-group">
          <label htmlFor="days">Days:</label>
          <input
            className="form-control"
            id="days"
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hours">Hours:</label>
          <input
            className="form-control"
            id="hours"
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="minutes">Minutes:</label>
          <input
            className="form-control"
            id="minutes"
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="seconds">Seconds:</label>
          <input
            className="form-control"
            id="seconds"
            type="number"
            value={seconds % 60}
            onChange={(e) => setSeconds(e.target.value % 60)}
          />
        </div>

        {!timerActive ? (
          <button className="btn btn-primary mt-5 " onClick={startTimer}>
            Start
          </button>
        ) : (
          <button className="btn btn-danger mt-5" onClick={stopTimer}>
            Stop
          </button>
        )}

       
      </div>
    </div>
  )}

  export default CountDown;