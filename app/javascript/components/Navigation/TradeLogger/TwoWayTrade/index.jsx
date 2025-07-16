import React, { useCallback } from "react";
import CardSelect from "../CardSelect";

const TwoWayTrade = ({ exchanges, setExchanges }) => {
    const [me, them] = exchanges;
    const setReceivesCards = useCallback(
        (cards) => {
            me.receives = cards;
            them.gives = cards;
            setExchanges([me, them]);
        },
        [me, them]
    );

    const setGivesCards = useCallback(
        (cards) => {
            me.gives = cards;
            them.receives = cards;
            setExchanges([me, them]);
        },
        [me, them]
    );

    return (
        <>
            <p>What would you like to trade for</p>
            <CardSelect onUpdate={setReceivesCards} userId={them.user} />
            <p>What are you offering</p>
            <CardSelect onUpdate={setGivesCards} userId={me.user} />
        </>
    );
};

export default TwoWayTrade;
