import React from 'react';

function Button({ link, onClickButton, showMainButton }) {
  return (
    <button className="nav-button" onClick={() => { onClickButton(link); showMainButton(link) }}>
      {link}
    </button>
  );
}

export default Button;