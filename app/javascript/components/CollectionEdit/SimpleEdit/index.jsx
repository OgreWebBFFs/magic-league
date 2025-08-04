import React, { useRef, useState } from "react";
import SetPicker from "./SetPicker";
import SearchInput from "../../SearchInput";
import { CardGrid, CardImage } from "../../CardGrid";
import QuantityControl from "../QuantityControl";
import xhrRequest from "../../../helpers/xhr-request";
import LoadingIcon from "../../Icons/LoadingIcon";

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
    const selectedSets = [{ code: "EOE", name: "Edge of Eternities", symbol: "ss ss-eoe" }];
    // const [selectedSets, setSelectedSets] = useState(window.VALID_SETS);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
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
                {/* <SetPicker onPick={setSelectedSets} /> */}
                <SearchInput
                    onResults={(newCards) => {
                        setLoading(false);
                        setCards(newCards);
                    }}
                    onReset={() => {
                        setLoading(false);
                        resetToCollection();
                    }}
                    onError={() => setLoading(false)}
                    onLoading={() => {
                        setCards([]);
                        setLoading(true);
                    }}
                    // placeholder={`Search for a card name${
                    //     selectedSets.length === 1 ? ` from ${selectedSets[0].name}` : ""
                    // }`}
                    placeholder="Search for a card name"
                    scryfallQuery={`s:${selectedSets.map((set) => set.code.toLowerCase()).join(",")}`}
                />
            </div>
            {loading ? (
                <LoadingIcon />
            ) : (
                <CardGrid>
                    {setFilteredCards.map((card) => (
                        <>
                            <CardImage
                                name={card.attributes.name}
                                imageUrl={card.attributes.image_url}
                                backImageUrl={card.attributes.back_image_url}
                                key={`${card.attributes.scryfall_id} image`}
                            />
                            <QuantityControl
                                key={`${card.attributes.scryfall_id} quantity`}
                                collectionId={collectionId}
                                cardId={card.attributes.id}
                                scryfallId={card.attributes.scryfall_id}
                                initialValue={initialQuantity(card.attributes, userId)}
                            />
                        </>
                    ))}
                </CardGrid>
            )}
        </>
    );
};

export default SimpleEdit;
