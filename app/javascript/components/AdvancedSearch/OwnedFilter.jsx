import React from 'react';

const OwnedFilter = ({ hashParams: { owned }, onUpdate }) => (
  <>
      <h2>Owned</h2>
      <fieldset className="checkbox-picker__options">
        <div className="checkbox-picker__option">
          <input 
            id="owned"
            name="owned"
            value="owned"
            type="checkbox"
            checked={owned?.includes("true")}
            onChange={() => onUpdate({
              owned: owned?.includes("true") ? [] : ["true"] 
            })} 
          />
          <label htmlFor="owned" className="no-cap">
            Only show cards anyone owns
          </label>
        </div>
      </fieldset>
  </>
)

export default OwnedFilter