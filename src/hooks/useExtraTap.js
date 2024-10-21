import { useState, useEffect, useRef } from 'react';

const useExtraTap = (initialTime = 0) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => Math.max(prevTime - .1, 0)); // Снижаем время, но не даем ему стать отрицательным
      }, 100); // Обновление каждую секунду
    }
    
    // Очистка таймера при размонтировании или изменении isActive
    return () => clearInterval(timerRef.current);
  }, [isActive]);

  useEffect(() => {
    console.log(time)
  }, [time])

  const start = () => {
    if (!isActive) {
      setIsActive(true);
    }
  };

  const stop = () => {
    if (isActive) {
      setIsActive(false);
    }
  };

  const reset = () => {
    setIsActive(false);
    setTime(initialTime);
  };

  // Возвращаем состояние и функции для управления
  return { time, isActive, start, stop, reset };
};

export default useExtraTap;