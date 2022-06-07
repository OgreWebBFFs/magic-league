import React from 'react';
import classNames from 'classnames';
import Button from '../Button';

const EventPlayerRanking = ({
  name,
  id,
  rank,
  ranking,
  matches,
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
        <div className="rankings__player-elo">
          {`${ranking} points`}
        </div>
        <div className="rankings__player-record">
          {`${matches} match${matches === 1 ? '' : 'es'}`}
        </div>
      </div>
    </div>
  </Button>
);

export default EventPlayerRanking;
