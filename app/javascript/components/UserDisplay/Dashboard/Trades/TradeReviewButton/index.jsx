import React, { useState } from "react";
import { MobileLabel } from "../../../../Table";
import Button from "../../../../Button";
import Modal from "../../../../Modal";
import TradeReview from "./TradeReview";

const TradeReviewButton = ({ trade, currentUserId }) => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setModalOpen(true)} className="review-button button--small">
                <MobileLabel>REVIEW </MobileLabel>
                <i className="fas fa-reply" />
            </Button>
            {modalOpen && (
                <Modal onClose={() => setModalOpen(false)}>
                    <TradeReview trade={trade} currentUserId={currentUserId} />
                </Modal>
            )}
        </>
    );
};

export default TradeReviewButton;
