import React from 'react';
import tradablesApi from './tradables-api';

const addTradable = async (tradableCard) => tradablesApi({
  url: '/tradables',
  options: {
    method: 'POST',
    body: JSON.stringify({ card: { id: tradableCard.id }}),
  }
});

const removeTradable = async (tradableCard) => tradablesApi({
  url: `/tradables/${tradableCard.id}`, 
  options: {
    method: 'DELETE',
  }
});

const TradableToggle = ({card, tradables, setTradables, isOwner, row}) => {
  const tradableCard = tradables.find(tradableCard => tradableCard.card_id === card.id) || {};
  const handleChange = async ({ target }) => {
    const updatedTradables = target.checked ? 
      addTradable(card).then(toAdd => tradables.concat(toAdd)) : 
      removeTradable(tradableCard).then(toRemove => (
        tradables.filter(toCheck => toCheck.id !== toRemove.id)
      ));
    setTradables(await updatedTradables);
  }
  return (
    <>
      <input
        className={`dashboard_tradable__toggle tradable-toggle-${card.id}`}
        type="checkbox"
        disabled={!isOwner}
        checked={tradableCard.id !== undefined}
        data-tradable-id={tradableCard.id}
        data-id={card.id}
        id={`${card.name}_${tradableCard.id}_${row}`}
        onChange={handleChange}
      />
      <label className="dashboard_tradable__label" htmlFor={`${card.name}_${tradableCard.id}_${row}`}></label>
    </>
  );
}

export default TradableToggle;