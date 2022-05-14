import React from 'react';

const PlayerSelect = ({
  player, players, setSelectedPlayer, name,
}) => {
  const handleChange = (e) => {
    setSelectedPlayer(players.find((pl) => pl.id === parseInt(e.target.value, 10)));
  };

  return (
    <select className="browser-default player-selector" value={player.id} onChange={handleChange} name={name}>
      {players.map((user) => <option key={`${user.name}-${user.id}`} value={user.id}>{user.name}</option>)}
    </select>
  );
};
export default PlayerSelect;
