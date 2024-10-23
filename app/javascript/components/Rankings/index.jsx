/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import useIsMobile from "../../helpers/hooks/use-is-mobile";
import Button from "../Button";
import RankingsControls from "./RankingsControls";
import PlayerRanking from "./PlayerRanking";

const buildRankingsMap = (rankedPlayers) =>
    rankedPlayers.reduce(
        (acc, val, index) => ({
            ...acc,
            [val.user.id]: index + 1,
        }),
        {}
    );

const Rankings = ({ date, rankedPlayers, unrankedPlayers, eventRankedPlayers, eventUnrankedPlayers }) => {
    const [showRankings, setShowRankings] = useState(true);
    const [searchedPlayer, setSearchedPlayer] = useState("");

    const playerRanks = buildRankingsMap(rankedPlayers);

    return (
        <div className="rankings__page">
            <div className={classNames("rankings", { "rankings--hidden": !showRankings })}>
                <RankingsControls date={date} onPlayerSearch={(val) => setSearchedPlayer(val)} />
                <div className="rankings__wrapper">
                    <div className="rankings__scroll-catcher">
                        <div className="rankings__player-listing">
                            <div id="ranked-players" className="rankings__player-bucket">
                                {rankedPlayers
                                    .filter(
                                        ({ user }) =>
                                            searchedPlayer === "" ||
                                            user.name.toLowerCase().includes(searchedPlayer.toLowerCase())
                                    )
                                    .map((ranking, i) => (
                                        <PlayerRanking {...ranking} rank={playerRanks[ranking.user.id]} />
                                    ))}
                            </div>
                            {unrankedPlayers.length > 0 && (
                                <>
                                    <hr className="rankings__divider" />
                                    <div id="unranked-players" className="rankings__player-bucket">
                                        {unrankedPlayers
                                            .filter(
                                                (player) =>
                                                    searchedPlayer === "" ||
                                                    player.name.toLowerCase().includes(searchedPlayer.toLowerCase())
                                            )
                                            .map((player) => (
                                                <PlayerRanking user={player} wins={0} losses={0} />
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
