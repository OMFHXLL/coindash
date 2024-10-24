import React from 'react';
import RefIcon from '../../assets/image/ref-icon.png';
import TaskIcon from '../../assets/image/task-icon.png';
import BoostIcon from '../../assets/image/boost-icon.png';
import TapIcon from '../../assets/image/tap-icon.png';
import { useGlobalState } from '../../context/state';
// import { MdGroupAdd } from "react-icons/md";
// import { AiFillInfoCircle } from "react-icons/ai";
// import { AiFillRocket } from "react-icons/ai";
// import { RiCopperCoinFill } from "react-icons/ri";

const icons = {
  'REF': RefIcon,
  'TASK': TaskIcon,
  'BOOST': BoostIcon,
  'TAP': TapIcon,
}


function Button({ activeWindow, link, onClickButton, showMainButton, hidden = false }) {
  const [ page, setPage ] = useGlobalState('page');

  return (
    <button 
      className={`${activeWindow === link ? "nav-button c-btn active" : "nav-button c-btn"} ${hidden ? "hidden" : ""}`} 
      onClick={() => { onClickButton(link); showMainButton(link); setPage(link); }}
    >
      <img src={icons[link]} className='nav-button-icon'/>
      <div className="nav-button-text">{link}</div>
    </button>
  );
}

export default Button;