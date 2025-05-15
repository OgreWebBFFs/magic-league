import React, { useCallback } from "react";
import CardSelect from "../CardSelect";

const TwoWayTrade = ({ exchanges, setExchanges }) => {
    const setReceivesCards = useCallback(
        (cards) => {
            const [me, them] = exchanges;
            me.receives = cards;
            them.gives = cards;
            setExchanges([me, them]);
        },
        [exchanges]
    );

    const setGivesCards = useCallback(
        (cards) => {
            const [me, them] = exchanges;
            me.gives = cards;
            them.receives = cards;
            setExchanges([me, them]);
        },
        [exchanges]
    );

    return (
        <>
            <p>What would you like to trade for</p>
            <CardSelect onUpdate={setReceivesCards} />
            <p>What are you offering</p>
            <CardSelect onUpdate={setGivesCards} />
        </>
    );
};

export default TwoWayTrade;
