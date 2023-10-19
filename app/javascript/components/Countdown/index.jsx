// Countdown.js

import React, { useEffect, useState } from 'react';

const renderTime = (ms) => {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);

  const check0 = (val, str) => val > 0 ? `${val} ${str}, ` : '';

  return `${check0(hours, 'hours')}${check0(minutes, 'minutes')}${seconds} seconds`;
}

const Countdown = ({ end }) => {
  const targetDate = new Date(end);
  const [timeRemaining, setTimeRemaining] = useState(targetDate - new Date());
  
  const updateCountdown = () => {
    const now = new Date();
    setTimeRemaining(targetDate - now);
  };

  useEffect(() => {
    setTimeout(updateCountdown, 1000);
  }, [timeRemaining]);


  return (
    <div>
      {renderTime(timeRemaining)}
    </div>
  );
}

export default Countdown;