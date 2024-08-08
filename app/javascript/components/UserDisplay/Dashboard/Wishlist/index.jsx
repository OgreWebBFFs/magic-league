import React, { useContext } from "react";
import WishlistContext from "../../../../contexts/WishlistContext";
import CardList from "../CardList";
import { CardGrid, CardImageLink } from "../../../CardGrid";
import EmptyState from "../EmptyState";
import Button from "../../../Button";
import RemoveWish from "./RemoveWish";
import { Cell, Row } from "../../../Table";
import AvailabilityChecker from "./AvailabilityChecker";
import { TradeProposalButtonSmall } from "../../../TradeProposal";

const Wishlist = ({ currentUserId, user, isListView }) => {
    const { wishlist, currentUserWishlist } = useContext(WishlistContext);
    const isOwner = currentUserId === user.id;
    const wishlistToRender = isOwner ? currentUserWishlist : wishlist;
    const isEmpty = wishlistToRender.length < 1;
    return (
        <>
            {isEmpty && (
                <EmptyState
                    isOwner={isOwner}
                    name={user?.name}
                    ActionButton={
                        <Button className="empty-card-view__button button--small" href="/browse">
                            Make some wishes
                        </Button>
                    }
                />
            )}
            {isListView && !isEmpty && (
                <CardList>
                    {wishlistToRender.map(({ card }) => (
                        <Row>
                            <Cell isPriority>
                                <a href={`/cards/${card.id}`}>{card.name}</a>
                            </Cell>
                            <Cell>{isOwner && <RemoveWish user={user} card={card} classes="" />}</Cell>
                        </Row>
                    ))}
                </CardList>
            )}
            {!isListView && !isEmpty && (
                <div className="dashboard__card-grid-wrapper">
                    <CardGrid>
                        {wishlistToRender.map(({ card, availablities }) => (
                            <>
                                <CardImageLink card={card} />
                                {isOwner && (
                                    <div className="card-grid__card-actions">
                                        <div className="card-grid__card-action">
                                            <AvailabilityChecker availabilities={availablities} />  
                                        </div>
                                        <div className="card-grid__card-action">
                                            <RemoveWish user={user} card={card} />
                                        </div>
                                    </div>
                                )}
                                {!isOwner && availablities.some(({ collection }) => collection.user.id === currentUserId) && (
                                    <div className="card-grid__card-actions">
                                        <div
                                            className="card-grid__card-action"
                                            style={{ fontSize: '1.2rem', fontWeight: 'bold', display: 'grid', alignItems: 'center', padding: '0 .5rem' }}
                                        >
                                         {`You have ${availablities.find(({ collection }) => collection.user.id === currentUserId).quantity}\navailable for trade!`}   
                                        </div>
                                        <div className="card-grid__card-action">
                                            <TradeProposalButtonSmall user={user} card={card} />
                                        </div>
                                    </div>
                                )}
                            </>
                        ))}
                    </CardGrid>
                </div>
            )}
        </>
    );
};
export default Wishlist;
