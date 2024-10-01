import { useState, useEffect, useRef } from 'react';

const useExtraTap = (initialTime = 0) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1); // Или другую логику увеличения времени
      }, 10); // Обновление каждую секунду

      // Очистка таймера при размонтировании или изменении isActive
      return () => clearInterval(timerRef.current);
    } else {
      clearInterval(timerRef.current);
    }
  }, [isActive]);

  const start = () => setIsActive(true);
  const stop = () => setIsActive(false);
  const reset = () => {
    setIsActive(false);
    setTime(initialTime);
  };

  return { time, isActive, start, stop, reset };
};

export default useExtraTap;