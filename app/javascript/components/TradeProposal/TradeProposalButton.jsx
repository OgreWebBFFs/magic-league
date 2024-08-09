import React, { useState } from 'react';
import Button from '../Button';
import TradeProposalModal from './TradeProposalModal';
import NoTradeIcon from '../Icons/NoTradeIcon';
import TradeMessageIcon from '../Icons/TradeMessageIcon';

const TradeProposalButton = ({ card, currentUserId, unavailable, large, user }) => {
    const [modalOn, setModalOn] = useState(false);
    return (
        <>
            <Button className="button--small" onClick={() => setModalOn(true)} style={{ flexDirection: 'column' }} disabled={unavailable}>
                {unavailable ? <NoTradeIcon /> : <TradeMessageIcon />}
                {large && (unavailable ? 'Not Trading' : 'Message')}
            </Button>
            {modalOn && (
                <TradeProposalModal
                    card={card}
                    currentUserId={currentUserId}
                    user={user}
                    onClose={() => setModalOn(false)}
                />
            )}
        </>
    );
};

export default TradeProposalButton;
