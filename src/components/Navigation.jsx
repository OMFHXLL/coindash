import React, { Component, useContext } from 'react';

const Navigation = ({ onNavClick }) => {
  return (
    <nav className="nav">
      <button className="nav-button" onClick={() => onNavClick('MAIN')}>MAIN</button>
      <button className="nav-button" onClick={() => onNavClick('REF')}>REF</button>
      <button className="nav-button" onClick={() => onNavClick('TASK')}>TASK</button>
      <button className="nav-button" onClick={() => onNavClick('BOOST')}>BOOST</button>
      <button className="nav-button" onClick={() => onNavClick('STATS')}>STATS</button>
    </nav>
  );
};

export default Navigation;