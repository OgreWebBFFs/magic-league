import React, { useState, useCallback } from "react";
import xhrRequest from "../../../helpers/xhr-request";
import Button from "../../Button";
import StatusMessage from "./StatusMessage";
import buildTradeData from "./build-trade-data";
import TwoWayTrade from "./TwoWayTrade";
import MultiWayTrade from "./MultiWayTrade";
import PartnerSelect from "./PartnerSelect";

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
    const [exchanges, setExchanges] = useState([
        { user: currentUserId, gives: [], receives: [] },
        { user: otherUsers[0].id, gives: [], receives: [] },
    ]);
    const [xhrResponse, setXhrResponse] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(exchanges);
        setIsSubmitting(true);
        try {
            const postBody = buildTradeData(exchanges);
            console.log(postBody);
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
                <PartnerSelect players={otherUsers} exchanges={exchanges} setExchanges={setExchanges} />
                {exchanges.length === 2 ? (
                    <TwoWayTrade exchanges={exchanges} setExchanges={setExchanges} />
                ) : (
                    <MultiWayTrade exchanges={exchanges} setExchanges={setExchanges} players={otherUsers} />
                )}
                <Button type="submit" className="drawer_submit__button" disabled={isSubmitting}>{`Submit${
                    isSubmitting ? "ing..." : ""
                }`}</Button>
            </form>
            {xhrResponse && <StatusMessage status={xhrResponse.status} errors={xhrResponse.errors.base} />}
        </div>
    );
};

export default TradeLogger;
