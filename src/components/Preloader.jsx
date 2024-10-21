import React, { useState } from "react";
import { PiSpinnerBold } from "react-icons/pi";

function Preloader({ loading }) {
  const [ hide, setHide ] = useState(false);

  if (!loading) {
    setTimeout(() => {
      setHide(true);
    }, 1000);
  }

  return(
    <div className={hide ? "loader hidden" : "loader"}>
      <PiSpinnerBold className="loader__spinner"/>
      <div className="loader__text">Загрузка...</div>
    </div>
  )
}

export default Preloader;