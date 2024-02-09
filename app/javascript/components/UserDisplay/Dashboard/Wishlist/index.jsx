import React, { useContext } from "react";
import WishlistContext from "../../../../contexts/WishlistContext";
import CardList from "../CardList";
import { CardGrid, CardImageLink } from "../../../CardGrid";
import EmptyState from "../EmptyState";
import Button from "../../../Button";
import RemoveWish from "./RemoveWish";
import { Cell, Row } from "../../../Table";

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
                    {wishlistToRender.map((card) => (
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
                        {wishlistToRender.map((card) => (
                            <>
                                {isOwner && (
                                    <RemoveWish
                                        user={user}
                                        card={card}
                                        classes="button button--accent card-grid__wishlist__toggle active"
                                    />
                                )}
                                <CardImageLink card={card} />
                            </>
                        ))}
                    </CardGrid>
                </div>
            )}
        </>
    );
};
export default Wishlist;
