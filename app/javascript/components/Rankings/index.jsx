/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import classNames from 'classnames';

import Button from '../Button';
import ViewToggleSwitch from '../ViewToggleSwitch';
import useIsSeasonView from '../../helpers/hooks/use-is-season-view';
import DatePicker from './DatePicker';
import PlayerRanking from './PlayerRanking';
import EventPlayerRanking from './EventPlayerRanking';

const Rankings = ({
  date,
  rankedPlayers,
  unrankedPlayers,
  eventRankedPlayers,
  eventUnrankedPlayers,
}) => {
  const [showRankings, setShowRankings] = useState(true);
  const [isSeasonView] = useIsSeasonView();

  const toggleRankingsVisible = () => {
    const dateForm = document.querySelector('.rankings__date_form');
    dateForm.classList.toggle('rankings__date_form--hidden');
    setShowRankings(!showRankings);
  };

  return (
    <>
      {isSeasonView ? <DatePicker date={date} /> : <h1 className="rankings__title">Baldur&apos;s Gate Event</h1>}
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
                  ? rankedPlayers.map((user, i) => <PlayerRanking {...user.table} rank={i + 1} />)
                  : eventRankedPlayers.map(
                    (user, i) => <EventPlayerRanking {...user.table} rank={i + 1} />,
                  )}
              </div>
              { unrankedPlayers.length > 0
                    && (
                    <>
                      <hr className="rankings__divider" />
                      <div id="unranked-players" className="rankings__player-bucket">
                        { isSeasonView
                          ? unrankedPlayers.map((user) => <PlayerRanking {...user.table} />)
                          : eventUnrankedPlayers.map(
                            (user) => <EventPlayerRanking {...user.table} />,
                          )}
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
