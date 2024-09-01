import React, { useState } from 'react';
import Button from '../Button';
import TradeProposalModal from './TradeProposalModal';
import NoTradeIcon from '../Icons/NoTradeIcon';
import TradeMessageIcon from '../Icons/TradeMessageIcon';
import ResendMessageIcon from '../Icons/ResendMessageIcon';



const TradeProposalButton = ({ card, currentUserId, unavailable, large, user, priorMessageTimestamp }) => {
    const [modalOn, setModalOn] = useState(false);

    const btnText = (unavailable && 'Not Trading') || (priorMessageTimestamp && 'Resend') || 'Message';
    const BtnIcon = (unavailable && NoTradeIcon) || (priorMessageTimestamp && ResendMessageIcon) || TradeMessageIcon;

    return (
        <>
            <Button className="button--small" onClick={() => setModalOn(true)} style={{ flexDirection: 'column' }} disabled={unavailable}>
                <BtnIcon />
                {large && btnText}
            </Button>
            {modalOn && (
                <TradeProposalModal
                    card={card}
                    currentUserId={currentUserId}
                    user={user}
                    priorMessageTimestamp={priorMessageTimestamp}
                    onClose={() => setModalOn(false)}
                />
            )}
        </>
    );
};

export default TradeProposalButton;
