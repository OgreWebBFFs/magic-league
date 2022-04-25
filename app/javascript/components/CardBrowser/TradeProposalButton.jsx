import React from 'react';

const TradeProposalButton = ({ isAvailable, onClick }) => {
  const availabilityClass = isAvailable ? 'for-trade' : 'not-in-league';
  return (
    <div class="card-grid__trade-proposal">
      <button
        type="button"
        className={`card-grid__trade-proposal__btn ${availabilityClass}`}
        onClick={isAvailable ? onClick : ()=>{}}/>
    </div>
  );
}

export default TradeProposalButton;