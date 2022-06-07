import React, { useState } from 'react';
import classNames from 'classnames';

import Button from '../Button';
import ViewToggleSwitch from '../ViewToggleSwitch';
import useIsSeasonView from '../../helpers/hooks/use-is-season-view';
import DatePicker from './DatePicker';

const Rankings = ({
  date,
  rankedPlayers,
  unrankedPlayers,
  eventRankedPlayers,
  eventUnrankedPlayers,
}) => {
  const [showRankings, setShowRankings] = useState(true);
  const [isSeasonView] = useIsSeasonView();

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

  const getEventPlayers = (playerArr) => playerArr.map((user, i) => {
    const {
      name,
      id,
      ranking,
      matches,
    } = user.table;
    return (
      <Button key={`${name}-${id}`} className={classNames('rankings__user-button', { 'rankings__user-button--unranked': matches === 0 })} href={`/users/${id}`}>
        { matches > 0 && (
        <div className="rankings__player-position">
          {i + 1}
        </div>
        )}
        <div className="rankings__player">
          <div className={classNames('rankings__player-name', { 'rankings__player-name--unranked': matches === 0 })}>
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
  });

  const toggleRankingsVisible = () => {
    const dateForm = document.querySelector('.rankings__date_form');
    dateForm.classList.toggle('rankings__date_form--hidden');
    setShowRankings(!showRankings);
  };

  return (
    <>
      <DatePicker date={date} />
      <div className={classNames('rankings', { 'rankings--hidden': !showRankings })}>
        <Button className="button--ghost rankings__title" onClick={() => { toggleRankingsVisible(); }}>
          Rankings
        </Button>
        <ViewToggleSwitch name="rankings-type" />
        <div className="rankings__wrapper">
          <div className="rankings__scroll-catcher">
            <div className="rankings__player-listing">
              <div id="ranked-players" className="rankings__player-bucket">
                {isSeasonView
                  ? getPlayers(rankedPlayers) : getEventPlayers(eventRankedPlayers)}
              </div>
              { unrankedPlayers.length > 0
                    && (
                    <>
                      <hr className="rankings__divider" />
                      <div id="unranked-players" className="rankings__player-bucket">
                        { isSeasonView
                          ? getPlayers(unrankedPlayers, false)
                          : getEventPlayers(eventUnrankedPlayers, false) }
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
