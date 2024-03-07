import React from 'react';
import Select from 'react-select';

const makeOptions = (options) => options.map((option) => (
  {value: option, label: option}
));

const TypePicker = ({ options, value, onChange}) => (
  <Select
      isMulti
      options={makeOptions(options)}
      value={makeOptions(value)}
      isOptionSelected={(option) => value.includes(option.value)}
      onChange={onChange}
      styles={{
        control: (base, { isFocused }) => ({
          ...base,
          borderColor: "var(--color-fill-theme-highlight)",
          ":hover": {
            borderColor: "var(--color-fill-theme-highlight)",
          },
          ...(isFocused ? {
            borderColor: "var(--color-fill-theme)",
            boxShadow: "0 0 0 1px var(--color-fill-theme)",
            ":hover": {
              borderColor: "var(--color-fill-theme)"
            }
          } : {}),
        }),
      }}
    />
)

export const CardTypePicker = ({ hashParams, onUpdate, options }) => (
  <>
    <h2>Card Type</h2>
    <TypePicker
      options={options.cardTypes}
      value={hashParams.card_types || []}
      onChange={(selectedOptions) => onUpdate({
        card_types: selectedOptions.map(({ value}) => value)
      })}
    />
  </>
);

export const SubTypePicker = ({ hashParams, onUpdate, options }) => (
  <>
    <h2>Sub Type</h2>
    <TypePicker
      options={options.subTypes}
      value={hashParams.sub_types || []}
      onChange={(selectedOptions) => onUpdate({
        sub_types: selectedOptions.map(({ value}) => value)
      })}
    />
  </>
);