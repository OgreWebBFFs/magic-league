import React, { useRef, useState } from "react";
import SetPicker from "./SetPicker";
import SearchInput from "../../SearchInput";
import { CardGrid, CardImageLink } from "../../CardGrid";
import QuantityControl from "../QuantityControl";
import xhrRequest from "../../../helpers/xhr-request";
import { SETS } from "./sets-data";

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
    const [selectedSets, setSelectedSets] = useState(SETS);
    const [cards, setCards] = useState([]);
    const ref = useRef();

    const resetToCollection = async () => setCards(await fetchCollection(userId));

    const setFilteredCards = cards.filter((card) =>
        selectedSets.some((set) => set.code.toLowerCase() === card.attributes.set.toLowerCase())
    );

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
                <SetPicker onPick={setSelectedSets} />
                <SearchInput
                    onResults={setCards}
                    onReset={resetToCollection}
                    placeholder={`Search for a card name${
                        selectedSets.length === 1 ? ` from ${selectedSets[0].name}` : ""
                    }`}
                    sets={selectedSets}
                />
            </div>
            <CardGrid>
                {setFilteredCards.map((card) => (
                    <>
                        <CardImageLink key={`${card.attributes.scryfall_id} image`} card={card.attributes} />
                        <QuantityControl
                            key={`${card.attributes.scryfall_id} quantity`}
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
