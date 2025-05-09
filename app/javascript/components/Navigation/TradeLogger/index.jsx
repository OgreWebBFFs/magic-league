import React, { useState } from "react";
import xhrRequest from "../../../helpers/xhr-request";
import Button from "../../Button";
import PlayerSelect from "../PlayerSelect";
import CardSelect from "./CardSelect";
import StatusMessage from "./StatusMessage";
import buildTradeData from "./build-trade-data";

const createTrade = async (tradeData) =>
    xhrRequest({
        url: "/multi_trades",
        options: {
            method: "POST",
            body: JSON.stringify(tradeData),
        },
    });

const TradeLogger = ({ unlockedUsers, currentUserId }) => {
    const otherUsers = unlockedUsers
        .filter((user) => user.id !== currentUserId)
        .sort((a, b) => a.name.localeCompare(b.name));
    const [tradePartner, setTradePartner] = useState(otherUsers[0]);
    const [receiveCards, setReceiveCards] = useState([]);
    const [giveCards, setGiveCards] = useState([]);
    const [xhrResponse, setXhrResponse] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const postBody = buildTradeData(tradePartner.id, receiveCards, currentUserId, giveCards);
            const response = await createTrade(postBody);
            setXhrResponse(response);
            window.location.reload();
            setIsSubmitting(false);
        } catch (error) {
            setXhrResponse(error.data);
            setIsSubmitting(false);
        }
    };
    return (
        <div className="trade-logger">
            <form id="trade-form" onSubmit={handleSubmit}>
                <h3>Make a Trade</h3>
                <p>Who would you like to trade with</p>
                <PlayerSelect player={tradePartner} players={otherUsers} setSelectedPlayer={setTradePartner} />
                <a onClick={() => e.preventDefault()}>+ Add Another Participant</a>
                <p>What would you like to trade for</p>
                <CardSelect onUpdate={setReceiveCards} />
                <p>What are you offering</p>
                <CardSelect onUpdate={setGiveCards} />
                <Button type="submit" className="drawer_submit__button" disabled={isSubmitting}>{`Submit${
                    isSubmitting ? "ing..." : ""
                }`}</Button>
            </form>
            {xhrResponse && (
                <StatusMessage status={xhrResponse.status} invalidTradeTargets={xhrResponse.invalid_trade_targets} />
            )}
        </div>
    );
};

export default TradeLogger;
