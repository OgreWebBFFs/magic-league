import React, { useCallback } from "react";
import CardSelect, { LimitedCardSelect } from "../CardSelect";

const consolidatedReceiveOptions = (userId, exchanges) => {
    const userReceives = exchanges.find((exchange) => exchange.user === userId).receives;
    const otherGives = exchanges.flatMap((exchange) => (exchange.user === userId ? [] : exchange.gives));
    const otherReceives = exchanges.flatMap((exchange) => (exchange.user === userId ? [] : exchange.receives));
    return [
        ...userReceives,
        ...otherGives.filter((giveCard) => !otherReceives.some((receiveCard) => giveCard.value === receiveCard.value)),
    ];
};

const MultiWayTrade = ({ exchanges, setExchanges, players }) => {
    const [me, ...others] = exchanges;
    const partners = others.map((partner) => players.find((user) => user.id === partner.user));

    const addGiveCards = useCallback(
        (userId, cards) => {
            const newExchanges = [...exchanges];
            const exchangeToUpdateIndex = newExchanges.findIndex((exchange) => exchange.user === userId);
            const { user, receives } = newExchanges[exchangeToUpdateIndex];
            newExchanges[exchangeToUpdateIndex] = { user, gives: cards, receives };
            setExchanges(newExchanges);
        },
        [exchanges, setExchanges]
    );

    const addReceiveCards = useCallback(
        (userId, cards) => {
            const newExchanges = [...exchanges];
            const exchangeToUpdateIndex = newExchanges.findIndex((exchange) => exchange.user === userId);
            const { user, gives } = newExchanges[exchangeToUpdateIndex];
            newExchanges[exchangeToUpdateIndex] = { user, gives, receives: cards };
            setExchanges(newExchanges);
        },
        [exchanges, setExchanges]
    );

    return (
        <>
            <p>What is each player giving?</p>
            <div style={{ marginBottom: ".5rem" }}>
                <div style={{ textAlign: "left", fontWeight: "700" }}>You: </div>
                <CardSelect onUpdate={(cards) => addGiveCards(me.user, cards)} />
            </div>
            {partners.map((partner) => (
                <div style={{ marginBottom: ".5rem" }}>
                    <div style={{ textAlign: "left", fontWeight: "700" }}>{partner.name}: </div>
                    <CardSelect onUpdate={(cards) => addGiveCards(partner.id, cards)} />
                </div>
            ))}
            <p>What is each player receiving?</p>
            <div>
                <div style={{ textAlign: "left", fontWeight: "700" }}>You: </div>
                <LimitedCardSelect
                    onUpdate={(cards) => addReceiveCards(me.user, cards)}
                    cardOptions={consolidatedReceiveOptions(me.user, exchanges)}
                />
            </div>
            {partners.map((partner) => (
                <div>
                    <div style={{ textAlign: "left", fontWeight: "700" }}>{partner.name}: </div>
                    <LimitedCardSelect
                        onUpdate={(cards) => addReceiveCards(partner.id, cards)}
                        cardOptions={consolidatedReceiveOptions(partner.id, exchanges)}
                    />
                </div>
            ))}
        </>
    );
};

export default MultiWayTrade;
