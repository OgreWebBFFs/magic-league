/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import useIsMobile from '../../helpers/hooks/use-is-mobile';

import Button from '../Button';
import ViewToggleSwitch from '../ViewToggleSwitch';
import useIsSeasonView from '../../helpers/hooks/use-is-season-view';
import DatePicker from './DatePicker';
import PlayerRanking from './PlayerRanking';
import EventPlayerRanking from './EventPlayerRanking';
import useTheme from '../../helpers/hooks/use-theme';




const Rankings = ({
  date,
  rankedPlayers,
  unrankedPlayers,
  eventRankedPlayers,
  eventUnrankedPlayers,
  draffle
}) => {
  const [showRankings, setShowRankings] = useState(true);
  const [isSeasonView] = useIsSeasonView();
  const dateWrapperRef = useRef();
  const isMobile = useIsMobile();

  useEffect(()=>{
    const draffleButtonHeight = document.querySelector('.draffle-view-button')?.offsetHeight;
    const dateWrapperHeight = dateWrapperRef?.current?.offsetHeight;
    console.log(draffleButtonHeight);
    const dateWrapperStyle = window.getComputedStyle(dateWrapperRef?.current);
    const dateFullHeight = dateWrapperHeight + parseInt( dateWrapperStyle.marginTop) + parseInt( dateWrapperStyle.marginBottom) + "px";
    document.documentElement.style.setProperty('--draffle-button-height', `${draffleButtonHeight}px`);
    document.documentElement.style.setProperty('--date-wrapper-height', dateFullHeight);
  },[isMobile]) 

  const { setCurrentTheme } = useTheme();

  useEffect(()=>{
    const clueThemes = ['white','mustard', 'scarlet', 'peacock', 'plum', 'green'];
    const randomTheme =  clueThemes[Math.floor(Math.random() * clueThemes.length)];
    setCurrentTheme(randomTheme);
  },[])

  return (
    <div class="rankings__page">
      <div className={classNames('rankings', { 'rankings--hidden': !showRankings })}>
        <div ref={dateWrapperRef} className="rankings__date-wrapper">
          <DatePicker date={date} />
          <Button className={classNames('rankings__toggle-visbility-button rankings__toggle-visbility-button--off button--small button--secondary')} onClick={() => setShowRankings(false)}>
            <i className="fas fa-paint-brush" />
          </Button>
          </div>
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
      {!showRankings &&
        <Button className={classNames('rankings__toggle-visbility-button', 'button--inverse')} onClick={() => setShowRankings(true)}>
          <i className="fas fa-list" />
        </Button>
      }
    </div>
  );
};

export default Rankings;
