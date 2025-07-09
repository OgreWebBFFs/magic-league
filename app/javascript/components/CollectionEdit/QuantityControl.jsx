import React, { useState } from "react";
import { useDebounce, useFirstMountState } from "react-use";
import xhrRequest from "../../helpers/xhr-request";

import Button from "../Button";

const storeQuantity = ({ collectionId, cardId, quantity, scryfallId }) =>
    xhrRequest({
        url: `/collections/${collectionId}`,
        options: {
            method: "PUT",
            body: JSON.stringify({
                id: collectionId,
                quantity: {
                    quantity,
                    card_id: cardId,
                    scryfall_id: scryfallId,
                    collection_id: collectionId,
                },
            }),
        },
    });

const QuantityControl = ({ collectionId, cardId, initialValue, scryfallId }) => {
    const [quantity, setQuantity] = useState(initialValue);
    const isInitial = useFirstMountState();

    useDebounce(
        async () => {
            if (!isInitial) storeQuantity({ collectionId, cardId, quantity, scryfallId });
        },
        300,
        [quantity]
    );

    return (
        <div className="card-grid__quantity-control">
            <Button type="button" className="button--ghost" onClick={() => quantity > 0 && setQuantity(quantity - 1)}>
                <i className="material-icons">indeterminate_check_box</i>
            </Button>
            <input type="number" readOnly="readonly" className="card-grid__quantity" value={quantity} />
            <Button type="button" className="button--ghost" onClick={() => setQuantity(quantity + 1)}>
                <i className="material-icons">add_box</i>
            </Button>
        </div>
    );
};

export default QuantityControl;
