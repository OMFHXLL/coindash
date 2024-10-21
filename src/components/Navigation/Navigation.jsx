import React, { useState } from 'react';
import Button from './Button';
import { useGlobalState } from '../../context/state';

const Navigation = ({ activeWindow, onNavClick }) => {
  const [isMainVisible, setMainVisible] = useState(false);
  const [ isNavHidden ] = useGlobalState('hide_nav');

  function setMain(link) {
    if (link === 'TAP') {
      setMainVisible(false);
    } else {
      setMainVisible(true);
    }
  }

  return (
    <nav className={isNavHidden ? (!isMainVisible ? "nav main hidden" : 'nav hidden') : (!isMainVisible ? "nav main" : "nav")}>
      <div className='nav-container'>
        <Button activeWindow={activeWindow} onClickButton={onNavClick} showMainButton={setMain} link={'REF'} />
        <Button activeWindow={activeWindow} onClickButton={onNavClick} showMainButton={setMain} link={'TASK'} />
        <Button activeWindow={activeWindow} onClickButton={onNavClick} showMainButton={setMain} link={'TAP'}/>
        {/* <Button activeWindow={activeWindow} onClickButton={onNavClick} showMainButton={setMain} link={'TAP'} hidden={!isMainVisible}/> */}
        <Button activeWindow={activeWindow} onClickButton={onNavClick} showMainButton={setMain} link={'BOOST'} />
        {/* <Button onClickButton={onNavClick} showMainButton={setMain} link={'STATS'} /> */}
      </div>
    </nav>
  );
};

export default Navigation;