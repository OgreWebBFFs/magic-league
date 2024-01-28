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

  return (
    <>
      <div className={classNames('rankings', { 'rankings--hidden': !showRankings })}>
        <DatePicker date={date} />
        <Button className="button--ghost rankings__title" onClick={() => setShowRankings(false)}>
          Rankings
        </Button>
        <ViewToggleSwitch name="rankings-type" />
        <div className="rankings__wrapper">
          <div className="rankings__scroll-catcher">
            <div className="rankings__player-listing">
              <div id="ranked-players" className="rankings__player-bucket">
                {isSeasonView
                  ? rankedPlayers.map((ranking, i) => <PlayerRanking {...ranking} rank={i + 1} />)
                  : eventRankedPlayers.map(
                    (ranking, i) => <EventPlayerRanking {...ranking} rank={i + 1} />,
                  )}
              </div>
              { unrankedPlayers.length > 0
                    && (
                    <>
                      <hr className="rankings__divider" />
                      <div id="unranked-players" className="rankings__player-bucket">
                        { isSeasonView
                          ? unrankedPlayers.map((player) => <PlayerRanking user={player} wins={0} losses={0} />)
                          : eventUnrankedPlayers.map(
                            (ranking) => <EventPlayerRanking {...ranking} />,
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
    <Button className={classNames('rankings__toggle-visbility-button', 'button--inverse')} onClick={() => setShowRankings(true)}>
      {' '}
      <i className="fas fa-list" />
    </Button>
    )}
    </>
  );
};

export default Rankings;
