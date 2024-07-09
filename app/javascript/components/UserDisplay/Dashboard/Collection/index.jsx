import React from "react";
import { Row, Cell } from "../../../Table";
import CardList from "../CardList";
import { CardGrid, CardImageLink } from "../../../CardGrid";
import { WishlistToggleSmall } from "../../../WishlistToggle";
import EmptyState from "../EmptyState";
import Button from "../../../Button";
import KeeperToggle from "./KeeperToggle";

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
                    {filteredCollection.map(({ card }, row) => (
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
                        {filteredCollection.map(({ card, quantity, keeper, collection_id }, i) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={`${card.id}-${i}`}>
                                <div className="card-grid__card-rail">
                                    <WishlistToggleSmall userId={user.id} cardId={card.id} />
                                    {quantity > 1 && (
                                        <div className="card-grid__icon" style={{background: 'black', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            {`x${quantity}`}
                                        </div>
                                    )}
                                </div>
                                <CardImageLink card={card} />
                                <KeeperToggle
                                    keeper={keeper}
                                    interactive={currentUserId === user.id}
                                    cardId={card.id}
                                    collectionId={collection_id}
                                />
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
