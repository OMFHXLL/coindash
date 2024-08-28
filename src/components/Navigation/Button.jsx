import React from 'react';
import { MdGroupAdd } from "react-icons/md";
import { AiFillInfoCircle } from "react-icons/ai";
import { AiFillRocket } from "react-icons/ai";
import { RiCopperCoinFill } from "react-icons/ri";

const icons = {
  'REF': <MdGroupAdd/>,
  'TASK': <AiFillInfoCircle/>,
  'BOOST': <AiFillRocket/>,
  'MAIN': <RiCopperCoinFill/>,
}


function Button({ activeWindow, link, onClickButton, showMainButton }) {
  return (
    <button className={activeWindow === link ? "nav-button active" : "nav-button"} onClick={() => { onClickButton(link); showMainButton(link) }}>
      {icons[link]}
    </button>
  );
}

export default Button;