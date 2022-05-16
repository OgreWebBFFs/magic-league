import React, { useState } from 'react';
import classNames from 'classnames';

import Button from '../Button';

const Rankings = ({ rankedPlayers, unrankedPlayers }) => {
  const [showRankings, setShowRankings] = useState(true);

  const getPlayers = (playerArr, isRanked = true) => playerArr.map((user, i) => {
    const {
      name, id, ranking, wins = 0, losses = 0,
    } = user.table;
    return (
      <Button key={`${name}-${id}`} className={classNames('rankings__user-button', { 'rankings__user-button--unranked': !isRanked })} href={`/users/${id}`}>
        { isRanked && (
        <div className="rankings__player-position">
          {i + 1}
        </div>
        )}
        <div className="rankings__player">
          <div className={classNames('rankings__player-name', { 'rankings__player-name--unranked': !isRanked })}>
            {name}
          </div>
          <div className="rankings__player-stats">
            { isRanked && (
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
  });

  const toggleRankingsVisible = () => {
    const dateForm = document.querySelector('.rankings__date_form');
    dateForm.classList.toggle('rankings__date_form--hidden');
    setShowRankings(!showRankings);
  };

  return (
    <>
      <div className={classNames('rankings', { 'rankings--hidden': !showRankings })}>
        <Button className="button--ghost rankings__title" onClick={() => { toggleRankingsVisible(); }}>
          Rankings
        </Button>

        <div className="rankings__wrapper">
          <div className="rankings__scroll-catcher">
            <div className="rankings__player-listing">
              <div id="ranked-players" className="rankings__player-bucket">
                {getPlayers(rankedPlayers)}
              </div>
              { unrankedPlayers.length > 0
                    && (
                    <>
                      <hr className="rankings__divider" />
                      <div id="unranked-players" className="rankings__player-bucket">
                        {getPlayers(unrankedPlayers, false)}
                      </div>
                    </>
                    )}
            </div>
          </div>
          <div className="rankings__border-wrapper">
            <div className="rankings__border rankings__border--left" />
            <div className="rankings__border rankings__border--top" />
            <div className="rankings__border rankings__border--right" />
            <div className="rankings__border rankings__border--bottom" />
          </div>
        </div>

      </div>
      { !showRankings
    && (
    <Button className={classNames('rankings__toggle-visbility-button', 'button--inverse')} onClick={() => { toggleRankingsVisible(); }}>
      {' '}
      <i className="fas fa-list" />
    </Button>
    )}
    </>
  );
};

export default Rankings;
