import React, { useContext, useState } from 'react';
import { GameContext } from '../../context/GameContext';
import Button from './Button';

const Navigation = ({ activeWindow, onNavClick }) => {
  const [isMainVisible, setMainVisible] = useState(false);
  const { state } = useContext(GameContext);
  const isNavHidden = state.hideNav;

  function setMain(link) {
    if (link === 'TAP') {
      setMainVisible(false);
    } else {
      setMainVisible(true);
    }
  }

  return (
    <nav className={isNavHidden ? "nav hidden" : "nav"}>
      <Button activeWindow={activeWindow} onClickButton={onNavClick} showMainButton={setMain} link={'TAP'} hidden={!isMainVisible}/>
      <Button activeWindow={activeWindow} onClickButton={onNavClick} showMainButton={setMain} link={'REF'} />
      <Button activeWindow={activeWindow} onClickButton={onNavClick} showMainButton={setMain} link={'TASK'} />
      <Button activeWindow={activeWindow} onClickButton={onNavClick} showMainButton={setMain} link={'BOOST'} />
      {/* <Button onClickButton={onNavClick} showMainButton={setMain} link={'STATS'} /> */}
    </nav>
  );
};

export default Navigation;