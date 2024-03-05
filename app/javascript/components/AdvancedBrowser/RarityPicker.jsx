import React from 'react';

const RARITIES = [
  "common", "uncommon", "rare", "mythic"
];


const RarityPicker = ({ hashParams, onUpdate }) => (
  <>
    <h2>Rarity</h2>
    <fieldset className="checkbox-picker__options">
      {RARITIES.map((rarity) => (
        <div key={rarity} className="checkbox-picker__option">
          <input 
            className="checkbox-picker__option--checkbox"
            id={rarity}
            name={rarity}
            value={rarity}
            type="checkbox"
            checked={hashParams.rarity?.includes(rarity)}
            onClick={(e) => onUpdate({
              rarity: hashParams.rarity?.includes(e.target.value) ? (
                hashParams.rarity.filter((r) => r !== e.target.value)
              ) : (
                [ ...(hashParams.rarity || []), e.target.value ]
              )
            })} 
          />
          <label className="checkbox-picker__option--label" htmlFor={rarity}>
            {rarity}
          </label>
        </div>
      ))}
    </fieldset>
  </>
  )

export default RarityPicker;