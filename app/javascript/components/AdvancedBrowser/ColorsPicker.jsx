import React from 'react';

const COLORS = [
  {label: "White", Symbol: () => <i className="ms ms-w" />, value: "W"},
  {label: "Blue", Symbol: () => <i className="ms ms-u" />, value: "U"},
  {label: "Black", Symbol: () => <i className="ms ms-b" />, value: "B"},
  {label: "Red", Symbol: () => <i className="ms ms-r" />, value: "R"},
  {label: "Green", Symbol: () => <i className="ms ms-g" />, value: "G"},
  {label: "Colorless", Symbol: () => <i className="ms ms-c" />, value: "C"},
]


const ColorPicker = ({ hashParams, onUpdate }) => (
  <>
    <h2>Colors</h2>
    <fieldset className="checkbox-picker__options colors">
      {COLORS.map(({label, Symbol, value}) => (
        <div key={label} className="checkbox-picker__option">
          <input 
            className="checkbox-picker__option--checkbox"
            id={label}
            name={label}
            value={value}
            type="checkbox"
            checked={hashParams.colors?.includes(value)}
            onClick={(e) => onUpdate({
              colors: hashParams.colors?.includes(e.target.value) ? (
                hashParams.colors.filter((color) => color !== e.target.value)
              ) : (
                [ ...(hashParams.colors || []), e.target.value ]
              )
            })} 
          />
          <label className="checkbox-picker__option--label" htmlFor={label}>
            <Symbol />
            {label}
          </label>
        </div>
      ))}
    </fieldset>
  </>
  )

export default ColorPicker;