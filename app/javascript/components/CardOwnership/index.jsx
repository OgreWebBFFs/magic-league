import React, { useMemo, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import OwnershipTable from "./OwnershipTable";
import WishlistTable from "./WishlistTable";
import { CardImage } from "../CardGrid";
import WishlistToggle from "../WishlistToggle";
import WishlistContext from "../../contexts/WishlistContext";

import "swiper/css";
import "swiper/css/pagination";

const CardOwnership = ({ card, currentUserId, wishlist_grid: wishlistGrid, grid, variants }) => {
    const [selectedSet, setSelectedSet] = useState(card.set);
    const swiperRef = useRef(null);
    const [currentUserWishlist, setCurrentUserWishlist] = useState(
        wishlistGrid.rows.some((row) => row.id === currentUserId) ? [{ card }] : []
    );
    const wishlistContextValues = useMemo(
        () => ({
            currentUserWishlist,
            setCurrentUserWishlist,
        }),
        [wishlistGrid, currentUserWishlist]
    );

    return (
        <WishlistContext.Provider value={wishlistContextValues}>
            <h3 className="card-profile__title">{card.name}</h3>
            <div className="card-profile__card">
                {/*
                The below style seems to override what's in card-profile.scss for the above className
                When the below style is removed, card image is as large as it seemingly can be
                */}
                <div style={{ maxWidth: "350px", margin: "auto" }}>
                    <Swiper
                        className="card-profile__image-carousel"
                        modules={[Pagination]}
                        navigation
                        pagination={{
                            clickable: true,
                            renderBullet: (index, className) => {
                                if (index === 0) {
                                    return `<span class="${className}"><i class="ss ss-${card.set}"></i></span>`;
                                }
                                return `<span class="${className}"><i class="ss ss-${
                                    variants[index - 1].set
                                }"></i></span>`;
                            },
                        }}
                        onSlideChange={(swiper) => {
                            const index = swiper.activeIndex;
                            const slide = swiper.slides[index];
                            const set = slide.getAttribute("data-set");
                            setSelectedSet(set);
                        }}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                    >
                        <SwiperSlide data-set={card.set}>
                            <CardImage name={card.name} imageUrl={card.image_url} backImageUrl={card.back_image_url} />
                        </SwiperSlide>
                        {variants.map((variant) => (
                            <SwiperSlide key={variant.id} data-set={variant.set}>
                                <CardImage
                                    name={variant.name}
                                    imageUrl={variant.image_url}
                                    backImageUrl={variant.back_image_url}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="card-grid__card-action" style={{ marginBottom: "1rem" }}>
                        <WishlistToggle cardId={card.id} userId={currentUserId} />
                    </div>
                </div>
            </div>
            <div className="card-profile__details">
                <OwnershipTable
                    grid={grid}
                    selectedSet={selectedSet}
                    onSetChange={(set) => {
                        setSelectedSet(set);
                        swiperRef.current.slideTo(
                            set === card.set ? 0 : variants.findIndex((variant) => variant.set === set) + 1
                        );
                    }}
                    currentUserId={currentUserId}
                />
                <WishlistTable wishlistGrid={wishlistGrid} />
            </div>
        </WishlistContext.Provider>
    );
};

export default CardOwnership;
