import React from 'react';

const PlayerSelect = ({player, players, setSelectedPlayer, ...props}) => {

  const handleChange = (e) => {
    setSelectedPlayer(players.find(player => player.id === parseInt(e.target.value)));
  }

  return (
    <select className="browser-default player-selector" value={player.id} onChange={handleChange} {...props}>
        {players.map(user => <option key={`${user.name}-${user.id}`} value={user.id}>{user.name}</option>)}
    </select>
  );
}
export default PlayerSelect;