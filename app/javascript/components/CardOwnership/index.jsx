import React, { useMemo, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import OwnershipTable from "./OwnershipTable";
import WishlistTable from "./WishlistTable";
import { CardImage } from "../CardGrid";
import WishlistToggle from "../WishlistToggle";
import WishlistContext from "../../contexts/WishlistContext";
import { Row, Cell } from "../Table";
import UserLink from "../UserLink";
import KeeperButton from "./KeeperButton";
import { TradeProposalButton } from "../TradeProposal";

import "swiper/css";
import "swiper/css/pagination";

const CardOwnership = ({ card, currentUserId, wishlists, ownerships, variants }) => {
    const [selectedSet, setSelectedSet] = useState(card.set);
    const swiperRef = useRef(null);
    const [currentUserWishlist, setCurrentUserWishlist] = useState(
        wishlists.rows.some((row) => row.id === currentUserId) ? [{ card }] : []
    );
    const wishlistContextValues = useMemo(
        () => ({
            currentUserWishlist,
            setCurrentUserWishlist,
        }),
        [wishlists, currentUserWishlist]
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
                <OwnershipTable>
                    {ownerships.rows.map((row) => (
                        <Row key={row.user.id}>
                            <div className="ownership-table__row">
                                <div className="ownership-table__user">
                                    <UserLink user={row.user} />
                                </div>
                                <div className="ownership-table__quantity">Total: {row.total_quantity}</div>
                                <div className="ownership-table__message">
                                    {row.message_statuses &&
                                        (row.message_statuses[selectedSet] === "keeper" ? (
                                            <KeeperButton />
                                        ) : (
                                            <TradeProposalButton
                                                card={card}
                                                currentUserId={currentUserId}
                                                user={row.user}
                                                priorMessageTimestamp={row.message_statuses[selectedSet]}
                                            />
                                        ))}
                                </div>
                                <div className="ownership-table__sets">
                                    {Object.entries(row.quantity_by_set).map(([set, quantity]) => (
                                        <button
                                            key={set}
                                            type="button"
                                            onClick={() => setSelectedSet(set)}
                                            className={`set-tag ${set === selectedSet ? "current" : ""}`}
                                        >
                                            <i className={`ss ss-${set}`} style={{ fontSize: "1.5rem" }} />{" "}
                                            <span style={{ fontSize: ".75rem" }}>{quantity}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Row>
                    ))}
                    {ownerships.rows.length > 0 && (
                        <Row>
                            <div className="ownership-table__row">
                                <div>
                                    <b>
                                        <i>Total</i>
                                    </b>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <b>
                                        <i>{ownerships.rows.reduce((sum, r) => sum + r.total_quantity, 0)}</i>
                                    </b>
                                </div>
                            </div>
                        </Row>
                    )}
                    {ownerships.rows.length === 0 && <Cell isPriority>No one owns this card yet</Cell>}
                </OwnershipTable>
                <WishlistTable wishlists={wishlists} />
            </div>
        </WishlistContext.Provider>
    );
};

export default CardOwnership;
