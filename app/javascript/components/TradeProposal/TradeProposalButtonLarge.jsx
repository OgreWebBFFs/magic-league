import React, { useState } from "react";
import classNames from "classnames";
import Button from "../Button";
import TradeProposalModal from "./TradeProposalModal";

const ProposeTrade = () => (
    <>
        <i className="fa fa-envelope" aria-hidden="true" />
        Propose Trade
    </>
);

const TradeProposalButtonLarge = ({ isAvailable, card, currentUserId }) => {
    const [modalOn, setModalOn] = useState(false);
    return (
        <>
            <Button
                type="button"
                disabled={!isAvailable}
                className={classNames("trade-proposal-button", { "button--secondary": !isAvailable })}
                onClick={() => setModalOn(true)}
            >
                {isAvailable ? <ProposeTrade /> : "Not in League"}
            </Button>
            {modalOn && (
                <TradeProposalModal card={card} currentUserId={currentUserId} onClose={() => setModalOn(false)} />
            )}
        </>
    );
};

export default TradeProposalButtonLarge;
