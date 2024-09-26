import React from "react";

function WindowNavigation({ windows, handle, active }) {
  return (
    <div className="window__navigation">
      {windows.map((window) => {
        const Icon = window.logo;
        return(
          <div 
            key={window.slug} 
            className={`window__navigation-item ${window.slug === active ? 'active' : ''}`} 
            onClick={() => handle(window.slug)}
          >
            {<Icon className='icon'/>}
            {window.title}
          </div>)
      })}
    </div>
  );
}

export default WindowNavigation;