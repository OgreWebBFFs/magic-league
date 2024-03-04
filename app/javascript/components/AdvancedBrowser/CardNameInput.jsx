import React from "react";

const CardNameInput = ({ hashParams, onUpdate }) => (
  <div>
    <h2>Card Name</h2>
    <div>
      <input
        type="text"
        placeholder="Any words in the name..."
        value={hashParams.name?.[0] || ''}
        onChange={(e) => onUpdate({ name: [e.target.value] })}
      />
    </div>
  </div>
);

export default CardNameInput;