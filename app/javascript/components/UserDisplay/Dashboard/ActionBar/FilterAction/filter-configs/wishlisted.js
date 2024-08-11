import { useContext } from "react"
import WishlistContext from "../../../../../../contexts/WishlistContext"

export default {
    name: 'wishlisted',
    type: 'single-value',
    options: [
        {
            id: 'wishlisted',
            display: 'Cards on my Wishlist',
            criteria: (card) => {
                const { currentUserWishlist } = useContext(WishlistContext);
                return currentUserWishlist.some((wish) => wish.card.id === card.id)
            }
        }
    ]
}