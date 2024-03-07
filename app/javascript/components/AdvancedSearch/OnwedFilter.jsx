import React from 'react';

const OwnedFilter = ({ hashParams: { owned }, onUpdate }) => (
  <>
      <h2>Owned</h2>
     <input 
        id="owned"
        name="owned"
        value="owned"
        type="checkbox"
        defaultChecked={owned?.includes("true")}
        onClick={() => onUpdate({
          owned: owned?.includes("true") ? [] : ["true"] 
        })} 
      />
      <label htmlFor="owned" className="owned-filter__checkbox">
        Only show cards anyone owns
      </label>
  </>
)

export default OwnedFilter