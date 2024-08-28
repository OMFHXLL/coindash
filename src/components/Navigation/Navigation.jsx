import React, { Component, useState } from 'react';
import Button from './Button';

const Navigation = ({ activeWindow, onNavClick }) => {
  const [isMainVisible, setMainVisible] = useState(false);

  function setMain(link) {
    if (link === 'MAIN') {
      setMainVisible(false);
    } else {
      setMainVisible(true);
    }
  }

  return (
    <nav className="nav">
      <Button activeWindow={activeWindow} onClickButton={onNavClick} showMainButton={setMain} link={'REF'} />
      <Button activeWindow={activeWindow} onClickButton={onNavClick} showMainButton={setMain} link={'TASK'} />
      <Button activeWindow={activeWindow} onClickButton={onNavClick} showMainButton={setMain} link={'BOOST'} />
      {/* <Button onClickButton={onNavClick} showMainButton={setMain} link={'STATS'} /> */}
      {isMainVisible && <Button activeWindow={activeWindow} onClickButton={onNavClick} showMainButton={setMain} link={'MAIN'} />}
    </nav>
  );
};

export default Navigation;