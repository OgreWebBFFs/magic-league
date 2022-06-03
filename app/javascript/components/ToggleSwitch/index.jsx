import React from 'react';

const ToggleSwitch = ({ name, value, onChange }) => (
  <div className="toggle-switch">
    <input
      type="checkbox"
      className="toggle-switch-checkbox"
      defaultChecked={value}
      onChange={onChange}
      name={name}
      id={name}
    />
    <label className="toggle-switch-label" htmlFor={name}>
      <span className="toggle-switch-inner" data-a="H2H" data-b="Multi" />
      <span className="toggle-switch-switch" />
    </label>
  </div>
);

export default ToggleSwitch;
