import { useState, useEffect } from 'react';

const useTimer = (duration) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    if (duration > 0) {
      setTimeRemaining(duration);
      const interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [duration]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      setTimeRemaining(-1);
    }
  }, [timeRemaining]);

  return timeRemaining;
};

export default useTimer;