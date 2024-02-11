import React from 'react';
 

export const Switch = ({ isOn  ,  handleToggle, idnum, allowEditing } ) => {
    return (
      <>
        <input
          checked={isOn}
          onChange={handleToggle}
          className="react-switch-checkbox"
          id={'react-switch-new' + idnum}
          type="checkbox"
          disabled = {!allowEditing}
        />
        <label
          className="react-switch-label"
          htmlFor={`react-switch-new`+ idnum}
        >
          <span className={`react-switch-button`} />
        </label>
      </>
    );
  };