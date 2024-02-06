import React, { useContext } from "react";
import classNames from "classnames";
import WishlistContext from "../../contexts/WishlistContext";
import Button from "../Button";
import putToWishlist from "./put-to-wishlist";

const WishlistToggleSmall = ({ cardId, userId }) => {
    const { currentUserWishlist, setCurrentUserWishlist } = useContext(WishlistContext);
    const isWishlisted = currentUserWishlist.some((wishlistCard) => wishlistCard.id === cardId);
    const toggleWishlist = async () => {
        const updatedWishlist = await putToWishlist(userId, cardId);
        setCurrentUserWishlist(updatedWishlist);
    };
    return (
        <Button
            className={classNames(`wishlist-${cardId}__toggle`, "card-grid__wishlist-toggle button--small", {
                active: isWishlisted,
            })}
            onClick={toggleWishlist}
        >
            <i className="far fa-heart" />
        </Button>
    );
};

export default WishlistToggleSmall;
