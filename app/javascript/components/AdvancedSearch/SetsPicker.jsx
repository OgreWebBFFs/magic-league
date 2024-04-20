import React from 'react';

const SET_DETAILS = {
  "mkm": {
    text: "Murders at Karlov Manner",
    symbol: 'ss ss-mkm'
  },
  "plst": {
    text: "The List",
    symbol: 'ms ms-planeswalker'
  },
  "spg": {
    text: "Special Guest",
    symbol: 'ss ss-spg'
  },
  "otj": {
    text: "Outlaws of Thunder Junction",
    symbol: 'ss ss-otj'
  },
  "big": {
    text: "The Big Score",
    symbol: 'ss ss-big',
  },
  "otp": {
    text: "Breaking News",
    symbol: 'ss ss-otp',
  }
}

const SetsPicker = ({ hashParams, onUpdate, options }) => (
  <>
    <h2>Sets</h2>
    <fieldset className="checkbox-picker__options sets">
      {options.sets.map((setAbbr) => (
        <div key={setAbbr} className="checkbox-picker__option set">
          <input 
            className="checkbox-picker__option--checkbox"
            id={setAbbr}
            name={setAbbr}
            value={setAbbr}
            type="checkbox"
            checked={hashParams.sets?.includes(setAbbr)}
            onChange={(e) => onUpdate({
              sets: hashParams.sets?.includes(e.target.value) ? (
                hashParams.sets.filter((s) => s !== e.target.value)
              ) : (
                [ ...(hashParams.sets || []), e.target.value ]
              )
            })} 
          />
          <label className="checkbox-picker__option--label" htmlFor={setAbbr}>
            <i className={SET_DETAILS[setAbbr]?.symbol || 'ms ms-planeswalker'} />
            {SET_DETAILS[setAbbr]?.text || setAbbr.toUpperCase()}
            <span className='set-abbr'>({setAbbr})</span>
          </label>
        </div>
      ))}
    </fieldset>
  </>
  )

export default SetsPicker;