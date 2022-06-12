import React from 'react';
import classNames from 'classnames';
import Button from '../Button';

const PlayerRanking = ({
  name, id, rank, ranking, wins = 0, losses = 0,
}) => (
  <Button key={`${name}-${id}`} className={classNames('rankings__user-button', { 'rankings__user-button--unranked': !rank })} href={`/users/${id}`}>
    { rank && (
    <div className="rankings__player-position">
      {rank}
    </div>
    )}
    <div className="rankings__player">
      <div className={classNames('rankings__player-name', { 'rankings__player-name--unranked': !rank })}>
        {name}
      </div>
      <div className="rankings__player-stats">
        { rank && (
        <div className="rankings__player-elo">
          {ranking}
        </div>
        )}
        <div className="rankings__player-record">
          {wins}
          -
          {losses}
        </div>
      </div>
    </div>
  </Button>
);

export default PlayerRanking;
