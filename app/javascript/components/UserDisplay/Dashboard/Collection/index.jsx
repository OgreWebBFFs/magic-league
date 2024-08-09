import React from "react";
import { Row, Cell } from "../../../Table";
import CardList from "../CardList";
import { CardGrid, CardImageLink } from "../../../CardGrid";
import WishlistToggle from "../../../WishlistToggle";
import EmptyState from "../EmptyState";
import Button from "../../../Button";
import KeeperToggle from "./KeeperToggle";
import { TradeProposalButton } from "../../../TradeProposal";

const Collection = ({ collection, currentUserId, user, isListView, viewModifiers }) => {
    const isEmpty = collection.length < 1;
    const isOwner = currentUserId === user.id;
    const filteredCollection = collection.filter(({ card }) =>
        viewModifiers.every((filters) => filters.find((filter) => filter(card)))
    );
    return (
        <>
            {isEmpty && (
                <EmptyState
                    isOwner={isOwner}
                    name={user?.name}
                    ActionButton={
                        <Button className="empty-card-view__button button--small" href={`/collections/${user.id}/edit`}>
                            Build Your Collection
                        </Button>
                    }
                />
            )}
            {isListView && !isEmpty && (
                <CardList>
                    {filteredCollection.map(({ card }) => (
                        <Row>
                            <Cell isPriority>
                                <a className="invert" href={`/cards/${card.id}`}>
                                    {card.name}
                                </a>
                            </Cell>
                        </Row>
                    ))}
                </CardList>
            )}
            {!isListView && !isEmpty && (
                <div className="dashboard__card-grid-wrapper">
                    <CardGrid>
                        {filteredCollection.map(({ card, quantity, keeper, collection_id: collectionId }, i) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={`${card.id}-${i}`}>
                                {quantity > 1 && (
                                    <div className="card-grid__quantity-display">
                                        {`x${quantity}`}
                                    </div>
                                )}
                                <CardImageLink card={card} />
                                <div className="card-grid__card-actions">
                                    <div className="card-grid__card-action">
                                        {user.id === currentUserId ? (
                                            <KeeperToggle
                                                keeper={keeper}
                                                cardId={card.id}
                                                collectionId={collectionId}
                                            />
                                        ) : (
                                            <TradeProposalButton
                                                card={card}
                                                currentUserId={currentUserId}
                                                user={user}
                                                unavailable={keeper}
                                                large
                                            />
                                        )}
                                    </div>
                                    <div className="card-grid__card-action">
                                        <WishlistToggle userId={user.id} cardId={card.id} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardGrid>
                </div>
            )}
            {filteredCollection.length === 0 && !isEmpty && (
                <p className="dashboard__no-filter-results">You&apos;ve filtered too far... turn back now</p>
            )}
        </>
    );
};
export default Collection;
