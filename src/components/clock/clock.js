import React, { useState } from "react";
import './clock.css';

function Clock() {
  let time = new Date().toLocaleTimeString();
  let [currentTime, settime] = useState(time);

  let date = new Date().toLocaleDateString();
  let [currentDate, setdate] = useState(date);

  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    settime(time);
    let date = new Date().toLocaleDateString();
    setdate(date);
  };

  setInterval(updateTime, 1000);

  return (
    <>
      <div className="main">
            <p className="clock">{currentTime}</p>
            <p className="date">{currentDate}</p>
      </div>
    </>
  );
}

export default Clock;
