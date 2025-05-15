import React from "react";

const PlayerSelect = ({ player, players, partners, setSelectedPlayer }) => {
    const handleChange = (e) => {
        setSelectedPlayer(players.find((pl) => pl.id === parseInt(e.target.value, 10)));
    };

    return (
        <select className="browser-default player-selector" value={player.id} onChange={handleChange}>
            {players.map((user) => (
                <option
                    key={`${user.name}-${user.id}`}
                    value={user.id}
                    disabled={partners.some((p) => p.id === user.id)}
                >
                    {user.name}
                </option>
            ))}
        </select>
    );
};
export default PlayerSelect;
