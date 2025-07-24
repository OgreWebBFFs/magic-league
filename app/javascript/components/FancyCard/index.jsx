import React, { useCallback, useState, useEffect } from "react";
import Button from "../Button";
import { CardGrid, CardImage } from "../CardGrid";
import LoadingIcon from "../Icons/LoadingIcon";

const getStoredCards = () => JSON.parse(window.localStorage.getItem("fancyCards") || "[]");

const getStoredCast = (cards) => {
    const storedCastCards = JSON.parse(window.localStorage.getItem("castFancyCards") || "[]");
    return cards.filter((card) => storedCastCards.some((c) => c.name === card.name));
};

const isCast = (checkCard, castedCards) => castedCards.some((card) => card === checkCard);

const FancyCard = () => {
    const [cards, setCards] = useState(getStoredCards());
    const [castCards, setCastCards] = useState(getStoredCast(cards));
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (cards.length === 0) {
            window.localStorage.removeItem("fancyCards");
        } else {
            window.localStorage.setItem("fancyCards", JSON.stringify(cards));
        }
    }, [cards]);

    useEffect(() => {
        if (castCards.length === 0) {
            window.localStorage.removeItem("castFancyCards");
        } else {
            window.localStorage.setItem("castFancyCards", JSON.stringify(castCards));
        }
    }, [castCards]);

    const fetchCard = useCallback(async () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsLoading(true);
        const res = await fetch("/fancycard", {
            method: "GET",
            headers: {
                Accept: "application/json", // Specifies that the client prefers JSON responses
                "Content-Type": "application/json", // Specifies the type of content being sent in the request body (if applicable)
            },
        });
        const newCard = await res.json();
        setIsLoading(false);
        setCards([newCard, ...cards]);
    }, [cards, setCards]);

    const removeCard = useCallback(
        (card) => {
            const newCards = cards.filter((c) => c !== card);
            const newCast = castCards.filter((c) => c.name !== card.name);
            setCards(newCards);
            setCastCards(newCast);
        },
        [cards, setCards, castCards, setCastCards]
    );

    return (
        <div>
            <div className="fancy-card__top-controls">
                <Button onClick={() => fetchCard()}>Fetch a Card</Button>
                <Button
                    className="button--negative"
                    onClick={() => {
                        setCards([]);
                        setCastCards([]);
                    }}
                    disabled={cards.length === 0}
                >
                    Clear Cards
                </Button>
            </div>
            <CardGrid>
                {isLoading ? (
                    <div className="fancy-card__loading">
                        <LoadingIcon />
                    </div>
                ) : null}
                {cards.map((card) => (
                    <div key={card.name} className="fancy-card__card-wrapper">
                        <div className={`fancy-card__card-image ${isCast(card, castCards) ? "cast" : ""}`}>
                            <CardImage name={card.name} imageUrl={card.image_url} backImageUrl={card.back_image_url} />
                        </div>
                        <div className="fancy-card__card-controls">
                            <Button
                                type="link"
                                className="button--no-button"
                                onClick={() => window.open(card.link, "_blank")}
                            >
                                View on Sryfall
                            </Button>
                            <Button
                                onClick={() => setCastCards([card, ...castCards])}
                                disabled={isCast(card, castCards)}
                            >
                                {isCast(card, castCards) ? "Already Cast" : "Mark as Cast"}
                            </Button>
                            <Button className="button--negative" onClick={() => removeCard(card)}>
                                Remove Card
                            </Button>
                        </div>
                    </div>
                ))}
            </CardGrid>
        </div>
    );
};

export default FancyCard;
