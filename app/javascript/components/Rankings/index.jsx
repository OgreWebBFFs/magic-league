/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import useIsMobile from "../../helpers/hooks/use-is-mobile";

import Button from "../Button";
import ViewToggleSwitch from "../ViewToggleSwitch";
import useIsSeasonView from "../../helpers/hooks/use-is-season-view";
import DatePicker from "./DatePicker";
import PlayerRanking from "./PlayerRanking";
import EventPlayerRanking from "./EventPlayerRanking";
import useTheme from "../../helpers/hooks/use-theme";

const Rankings = ({ date, rankedPlayers, unrankedPlayers, eventRankedPlayers, eventUnrankedPlayers }) => {
    const [showRankings, setShowRankings] = useState(true);
    const [isSeasonView] = useIsSeasonView();
    const dateWrapperRef = useRef();
    const isMobile = useIsMobile();

    useEffect(() => {
        const draffleButton = document.querySelector(".draffle-view-button");
        let draffleFullButtonHeight;
        if (draffleButton) {
            const draffleButtonHeight = draffleButton?.offsetHeight;
            const draffleButtonStyle = window.getComputedStyle(draffleButton);

            draffleFullButtonHeight = `${draffleButtonHeight + parseInt(draffleButtonStyle.marginBottom, 10)}px`;
        }

        const dateWrapperHeight = dateWrapperRef?.current?.offsetHeight;
        const dateWrapperStyle = window.getComputedStyle(dateWrapperRef?.current);
        const dateFullHeight = `${dateWrapperHeight + parseInt(dateWrapperStyle.marginBottom, 10)}px`;

        document.documentElement.style.setProperty("--draffle-button-height", `${draffleFullButtonHeight || "0px"}`);
        document.documentElement.style.setProperty("--date-wrapper-height", dateFullHeight);
    }, [isMobile]);

    const { setCurrentTheme } = useTheme();

    useEffect(() => {
        const clueThemes = ["white", "mustard", "scarlet", "peacock", "plum", "green"];
        const randomTheme = clueThemes[Math.floor(Math.random() * clueThemes.length)];
        setCurrentTheme(randomTheme);
    }, []);

    return (
        <div className="rankings__page">
            <div className={classNames("rankings", { "rankings--hidden": !showRankings })}>
                <div ref={dateWrapperRef} className="rankings__date-wrapper">
                    <DatePicker date={date} />
                </div>
                <ViewToggleSwitch name="rankings-type" />
                <div className="rankings__wrapper">
                    <div className="rankings__scroll-catcher">
                        <div className="rankings__player-listing">
                            <div id="ranked-players" className="rankings__player-bucket">
                                {isSeasonView
                                    ? rankedPlayers.map((ranking, i) => <PlayerRanking {...ranking} rank={i + 1} />)
                                    : eventRankedPlayers.map((ranking, i) => (
                                          <EventPlayerRanking {...ranking} rank={i + 1} />
                                      ))}
                            </div>
                            {unrankedPlayers.length > 0 && (
                                <>
                                    <hr className="rankings__divider" />
                                    <div id="unranked-players" className="rankings__player-bucket">
                                        {isSeasonView
                                            ? unrankedPlayers.map((player) => (
                                                  <PlayerRanking user={player} wins={0} losses={0} />
                                              ))
                                            : eventUnrankedPlayers.map((ranking) => (
                                                  <EventPlayerRanking {...ranking} />
                                              ))}
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
            <Button
                className={classNames("rankings__toggle-visbility-button", "button--inverse")}
                onClick={() => setShowRankings(!showRankings)}
            >
                <i className={showRankings ? "fas fa-paint-brush" : "fas fa-list"} />
            </Button>
        </div>
    );
};

export default Rankings;
