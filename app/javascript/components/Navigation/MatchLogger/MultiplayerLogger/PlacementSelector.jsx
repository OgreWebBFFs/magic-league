import React, { useEffect, useState } from 'react';

const PlacementSelector = ({ participants }) => {
  const [placements, setPlacements] = useState([]);

  useEffect(() => {
    setPlacements(participants.map(({ id }) => id));
  }, [participants]);

  const updatePlacements = (selectedValue, i) => {
    const newPlace = Number.parseInt(selectedValue, 10);
    const newPlacements = [...placements];
    const toReplace = placements.indexOf(newPlace);
    const replaceWith = placements[i];
    newPlacements[i] = newPlace;
    newPlacements[toReplace] = replaceWith;
    setPlacements(newPlacements);
  };

  return (
    <ul>
      {participants.map((participant, i) => (
        <li style={{ display: 'flex', justifyContent: 'space-evenly', gap: '1rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.25rem',
            fontWeight: 'bold',
          }}
          >
            {i + 1}
          </div>
          <select style={{ textAlign: 'center' }} value={placements[i]} onChange={(e) => updatePlacements(e.target.value, i)} name={`match[${i + 1}]`}>
            {participants.map(
              ({ id, name }) => <option key={`${name}${id}`} value={id}>{name}</option>,
            )}
          </select>
        </li>
      ))}
    </ul>
  );
};

export default PlacementSelector;
