import React from 'react';

const TradeProposalButton = ({ isAvailable, onClick }) => {
  const availabilityClass = isAvailable ? 'for-trade' : 'not-in-league';
  return (
    <div class="card-grid__trade-proposal">
      <button
        type="button"
        disabled={!isAvailable}
        className={`card-grid__trade-proposal__btn ${availabilityClass}`}
        onClick={onClick}/>
    </div>
  );
}

export default TradeProposalButton;