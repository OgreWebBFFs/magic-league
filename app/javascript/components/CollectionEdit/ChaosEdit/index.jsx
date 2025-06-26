import React, { useState } from "react";
import SearchInput from "../../SearchInput";
import { CardGrid, CardImage } from "../../CardGrid";

// const fetchCollection = async (userId) => (await xhrRequest({
//   url: `/collections/${userId}`,
//   options: { method: 'GET' },
// })).data;

// const initialQuantity = (card, userId) => card.ownerships.find((ownership) => (
//     ownership.user_id === userId
// ))?.quantity || 0;

const ChaosEdit = ({ userId, collectionId }) => {
    const [setCode, setSetCode] = useState("");
    const [cards, setCards] = useState([]);

    //   const resetToCollection = async () => setCards(await fetchCollection(userId));

    return (
        <>
            <label htmlFor="set-code">Set Code:</label>
            <input type="text" id="set-code" onChange={(e) => setSetCode(e.target.value)} maxLength={3} />
            <SearchInput onResults={(c) => setCards(c)} onReset={() => setCards([])} setCode={setCode} />
            {/* <p>{JSON.stringify(cards)}</p> */}
            <CardGrid>
                {cards.map((card) => (
                    <CardImage key={`${card.name} image`} name={card.name} imageUrl={card.image_uris.normal} />
                ))}
            </CardGrid>
        </>
    );
};
export default ChaosEdit;
