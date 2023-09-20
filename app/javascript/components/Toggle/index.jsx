import React from 'react';

const Toggle = ({ name, checked, onClick, options }) => (
  <div className="toggle-switch">
    <input
      type="checkbox"
      className="toggle-switch-checkbox"
      checked={checked}
      onClick={onClick}
      name={name}
      id={name}
    />
    <label className="toggle-switch-label" htmlFor={name}>
      <span className="toggle-switch-inner" data-a={options[0]} data-b={options[1]} />
      <span className="toggle-switch-switch" />
    </label>
  </div>
);

export default Toggle;