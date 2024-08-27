import React, { Component, useState } from 'react';
import Button from './Button';

const Navigation = ({ onNavClick }) => {
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
      <Button onClickButton={onNavClick} showMainButton={setMain} link={'REF'} />
      <Button onClickButton={onNavClick} showMainButton={setMain} link={'TASK'} />
      {isMainVisible && <Button onClickButton={onNavClick} showMainButton={setMain} link={'MAIN'} />}
      <Button onClickButton={onNavClick} showMainButton={setMain} link={'BOOST'} />
      <Button onClickButton={onNavClick} showMainButton={setMain} link={'STATS'} />
    </nav>
  );
};

export default Navigation;