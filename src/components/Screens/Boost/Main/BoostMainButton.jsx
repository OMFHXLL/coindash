import { PiCoinsFill } from "react-icons/pi";
import { AiFillThunderbolt } from "react-icons/ai";
import { PiTimerFill } from "react-icons/pi";

const BoostMainButton = ({ icon, title, type, handleActiveWindow }) => {
  const icons = {
    'PiCoinsFill': <PiCoinsFill className="boost-main-button-icon"/>,
    'AiFillThunderbolt': <AiFillThunderbolt className="boost-main-button-icon"/>,
    'PiTimerFill': <PiTimerFill className="boost-main-button-icon"/>
  }
  return(
    <button className='boost-main-button a-btn' onClick={() => handleActiveWindow(type)}>
      {icons[icon]}
      {title}
    </button>
  )
}

export default BoostMainButton;