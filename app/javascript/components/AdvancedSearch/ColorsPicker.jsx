import React from 'react';

const COLORS = [
  {label: "White", Symbol: () => <i className="ms ms-w" />, value: "W"},
  {label: "Blue", Symbol: () => <i className="ms ms-u" />, value: "U"},
  {label: "Black", Symbol: () => <i className="ms ms-b" />, value: "B"},
  {label: "Red", Symbol: () => <i className="ms ms-r" />, value: "R"},
  {label: "Green", Symbol: () => <i className="ms ms-g" />, value: "G"},
  {label: "Colorless", Symbol: () => <i className="ms ms-c" />, value: "colorless"},
]


const ColorPicker = ({ hashParams, onUpdate }) => {
  const populatedOption = (!!hashParams.colors_include && 'colors_include') ||
    (!!hashParams.colors_atmost && 'colors_atmost') ||
    'colors_exact';

  const removeColor = (color) => (hashParams[populatedOption] || []).filter((c) => c !== color);

  const addColor = (color) => color === 'colorless' ? [color] : [...removeColor('colorless'), color];
    
  return (
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
              checked={hashParams[populatedOption]?.includes(value)}
              onChange={(e) => onUpdate({
                [populatedOption]: hashParams[populatedOption]?.includes(e.target.value) ?
                  removeColor(e.target.value) :
                  addColor(e.target.value)
              })} 
            />
            <label className="checkbox-picker__option--label" htmlFor={label}>
              <Symbol />
              {label}
            </label>
          </div>
        ))}
      </fieldset>
      <select
        name="color_options"
        className="color-picker__select-options"
        value={populatedOption}
        onChange={(e) => {
          const value = {
            [e.target.value]: hashParams[populatedOption] || [],
            [populatedOption]: undefined,
          }
          onUpdate(value);
        }}
      >
        <option value="colors_exact">Exactly these colors</option>
        <option value="colors_include">Including these colors</option>
        <option value="colors_atmost">At most these colors</option>
      </select>
      <div className="rules-text__reminder">
      &quot;Including&quot; means cards that are all the colors you select, with or without any others.
      &quot;At most&quot; means cards that have some or all of the colors you select and no others.
      </div>
    </>
  )
};

export default ColorPicker;