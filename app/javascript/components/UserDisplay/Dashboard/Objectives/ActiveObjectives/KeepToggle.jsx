/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useId } from 'react';
import { KeptObjectivesContext } from '../../../../../contexts/KeptObjectivesContext';
import xhrRequest from '../../../../../helpers/xhr-request';

const storeKeptObjective = (id) => xhrRequest({
  url: `/user_objectives/${id}/keep`,
  options: {
    method: 'PUT',
  },
});

const KeepToggle = ({ id }) => {
  const { keptObjectives, toggleKeptObjective } = useContext(KeptObjectivesContext);
  const inputId = useId();

  return (
    <>
      <input
        type="checkbox"
        checked={keptObjectives.includes(id)}
        id={`${inputId}-objective${id}`}
        onChange={() => {
          toggleKeptObjective(id);
          storeKeptObjective(id);
        }}
      />
      <label className="dashboard_tradable__label" htmlFor={`${inputId}-objective${id}`} />
    </>
  );
};

export default KeepToggle;
