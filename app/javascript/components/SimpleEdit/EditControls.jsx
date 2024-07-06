import React, { useState } from "react"
import QuantityControl from "./QuantityControl";
import TradeableDropdown from "./TradableDropdown";

const EditControls = ({ card, collectionId }) => {
    const [owns, setOwns] = useState(!!card.attributes.ownership_attr);
    const [initialTradable, setInitialTradable] = useState(card.attributes.ownership_attr?.tradable?.toString() || "unknown");

    const updateOwns = (newQuantity) => {
        if (newQuantity > 0) {
            setOwns(true);
        } else {
            setOwns(false);
            setInitialTradable("unknown");
        }
    }

    return (
        <>
            <QuantityControl
                key={`${card.attributes.name} quantity`}
                collectionId={collectionId}
                cardId={card.attributes.id}
                initialValue={card.attributes.ownership_attr?.quantity || 0}
                onChange={updateOwns}
            />
            {owns && (
                <TradeableDropdown
                    collectionId={collectionId}
                    cardId={card.attributes.id}
                    initialValue={initialTradable}
                />
            )}
        </>
    );
}

export default EditControls;