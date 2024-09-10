import { IoIosArrowRoundBack } from "react-icons/io";

function BoostHeader({ isMainWindow, changeWindow }) {
  return(
    <div className="window__header">
      <h2>Улучшения</h2>
      {!isMainWindow && <div className="back-button" onClick={() => changeWindow('TAP')}><IoIosArrowRoundBack/></div>}
    </div>
  )
}

export default BoostHeader