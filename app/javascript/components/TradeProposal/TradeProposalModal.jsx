import React, { useState } from 'react';
import classNames from 'classnames';
import xhrRequest from '../../helpers/xhr-request';
import { saveScrollPos } from '../../helpers/scroll-restoration';
import Button from '../Button';
import Modal from '../Modal';

const sendTradeMessage = (fromUserId, toUserId,  cardId) => xhrRequest({
    url: '/trade_message',
    options: {
      method: 'POST',
      body: JSON.stringify({ from_user_id: fromUserId, to_user_id: toUserId, card_id: cardId}),
    },
})

const refreshPage = () => {
    saveScrollPos();
    Turbolinks.visit(window.location.href, { action: 'replace' });
}

const TradeProposalModal = ({ onClose, card, currentUserId, user, priorMessageTimestamp }) => {
    const [reqState, setReqState] = useState('initial');
    return (
        <Modal onClose={reqState === 'initial' ? onClose : refreshPage}>
            <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <div style={{ fontSize: '.8rem', fontWeight: '700'}}>You are contacting:</div>
                    <div>{user.name}</div>
                </div>
                <div>
                    <div style={{ fontSize: '.8rem', fontWeight: '700'}}>To talk about trading for:</div>
                    <div>{card.name}</div>
                </div>
                {priorMessageTimestamp && (
                    <div>
                        <div style={{ fontSize: '.8rem', fontWeight: '700'}}>You previously messaged them about this card on:</div>
                        <div>
                            {(new Date(priorMessageTimestamp).toLocaleDateString('en-US', {  year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }))}
                        </div>
                    </div>
                )}
            </div>
            {reqState === 'loading' && (
                <div style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    background: '#ffffff88',
                }}>
                    <div className="lds-ring"><div /><div /><div /><div /></div>
                </div>
            )}
            <Button type="submit" className={classNames({"button--negative": reqState === 'error'})} disabled={reqState !== 'initial'} style={{ width: '100%' }} onClick={async () => {
                setReqState('loading');
                try {
                    await sendTradeMessage(currentUserId, user.id, card.id);
                    setReqState('success');
                } catch (e) {
                    setReqState('error');
                }
            }}>
                {reqState === 'initial' && (
                    <>
                        <i className="fab fa-discord" /> {priorMessageTimestamp ? 'Resend' : 'Send'} Message
                    </>
                )}
                {reqState === 'loading' && 'Sending...'}
                {reqState === 'success' && 'Message Sent!'}
                {reqState === 'error' && (
                    <>
                        <i className="fas fa-exclamation-circle" /> Message Error
                    </>
                )}
            </Button>
            {(reqState === 'success' || reqState === 'error') && (
                <Button className='button--no-button' onClick={refreshPage}>Return to the Previous Page</Button>
            )}
        </Modal>
    )
};

export default TradeProposalModal;
