import React, { useCallback } from "react";
import PlayerSelect from "../../PlayerSelect";
import Button from "../../../Button";

const PartnerSelect = ({ players, exchanges, setExchanges }) => {
    const [_, ...restExchanges] = exchanges;
    const partners = restExchanges.map((exchange) => players.find((player) => player.id === exchange.user));

    const changeTradePartner = useCallback(
        (newPartner, oldPartner) => {
            const newExchanges = [...exchanges];
            const swapIndex = newExchanges.findIndex((exchange) => exchange.user === oldPartner.id);
            newExchanges[swapIndex] = {
                user: newPartner.id,
                gives: newExchanges[swapIndex].gives,
                receives: newExchanges[swapIndex].receives,
            };
            setExchanges(newExchanges);
        },
        [exchanges, setExchanges]
    );

    const addTradePartner = useCallback(() => {
        const newPartner = players.find((user) => !partners.some((partner) => partner.id === user.id));
        setExchanges([...exchanges, { user: newPartner.id, gives: [], receives: [] }]);
    }, [exchanges, players, setExchanges]);

    const removeTradePartner = useCallback(
        (oldPartner) => {
            const newExchanges = exchanges.filter((exchange) => exchange.user !== oldPartner.id);
            setExchanges(newExchanges);
        },
        [exchanges, setExchanges]
    );

    return (
        <>
            <p>Who would you like to trade with</p>
            {partners.map((partner, i) => (
                <div
                    key={`partner-select-${partner.id}-${i}`}
                    style={{ display: "flex", gap: ".5rem", marginBottom: ".5rem" }}
                >
                    <PlayerSelect
                        player={partner}
                        players={players}
                        partners={partners}
                        setSelectedPlayer={(newPartner) => changeTradePartner(newPartner, partner)}
                    />
                    {partners.length > 1 && (
                        <Button className="button--negative" onClick={() => removeTradePartner(partner)}>
                            -
                        </Button>
                    )}
                </div>
            ))}
            {partners.length !== players.length && <a onClick={addTradePartner}>+ Add Another Participant</a>}
        </>
    );
};

export default PartnerSelect;
