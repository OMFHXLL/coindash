import { setGlobalState } from '../context/state';


const extraTapInitialTime = 200;

let extraTapTime = extraTapInitialTime;
let isExtraTapActive = false;
let timerId = null;

const startExtraTap = () => {
  if (isExtraTapActive) {
    setGlobalState('infinity_energy', true);
    timerId = setInterval(() => {
      extraTapTime = Math.max(extraTapTime - 1, 0); // Снижаем время, но не даем ему стать отрицательным
      setGlobalState('extra_tap_time', extraTapTime)
      console.log(extraTapTime);
      // console.log(isExtraTapActive);
      if (extraTapTime === 0) {
        clearInterval(timerId); // Останавливаем интервал
        setGlobalState('infinity_energy', false); // Устанавливаем infinity_energy в false
        isExtraTapActive = false; // Устанавливаем active в false
        console.log("Таймер завершён");
      }
    }, 100);
  }
}

const stopExtraTap = () => {
  clearInterval(timerId);
}

const resetExtraTap = () => {
  setGlobalState('extra_tap_time', extraTapInitialTime)
  isExtraTapActive = true;
  extraTapTime = extraTapInitialTime;
}

export { extraTapTime, isExtraTapActive, extraTapInitialTime, startExtraTap, stopExtraTap, resetExtraTap };