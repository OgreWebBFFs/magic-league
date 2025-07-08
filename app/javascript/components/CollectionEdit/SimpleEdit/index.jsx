import React, { useRef, useState } from "react";
import SetPicker from "./SetPicker";
import SearchInput from "../../SearchInput";
import { CardGrid, CardImageLink } from "../../CardGrid";
import QuantityControl from "../QuantityControl";
import xhrRequest from "../../../helpers/xhr-request";

const fetchCollection = async (userId) =>
    (
        await xhrRequest({
            url: `/collections/${userId}`,
            options: { method: "GET" },
        })
    ).data;

const initialQuantity = (card, userId) =>
    card.ownerships.find((ownership) => ownership.user_id === userId)?.quantity || 0;

const SimpleEdit = ({ userId, collectionId }) => {
    const [cards, setCards] = useState([]);
    const ref = useRef();

    const resetToCollection = async () => setCards(await fetchCollection(userId));

    return (
        <>
            <div>
                <h1>
                    Edit Your Collection
                    <div style={{ fontSize: "1rem" }}>
                        <a href={`/collections/${collectionId}/bulk_edit`}>Go to Bulk Edit &gt;</a>
                    </div>
                </h1>
            </div>

            <div ref={ref} className="search-bar">
                <SetPicker />
                <SearchInput onResults={setCards} onReset={resetToCollection} />
            </div>
            <CardGrid>
                {cards.map((card) => (
                    <>
                        <CardImageLink key={`${card.attributes.name} image`} card={card.attributes} />
                        <QuantityControl
                            key={`${card.attributes.name} quantity`}
                            collectionId={collectionId}
                            cardId={card.attributes.id}
                            initialValue={initialQuantity(card.attributes, userId)}
                        />
                    </>
                ))}
            </CardGrid>
        </>
    );
};

export default SimpleEdit;
