import React, { useContext } from 'react';
import TradablesContext from '../../../contexts/TradablesContext';
import xhrRequest from '../../../helpers/xhr-request';

const addTradable = async (tradableCard) => xhrRequest({
  url: '/tradables',
  options: {
    method: 'POST',
    body: JSON.stringify({ card: { id: tradableCard.id } }),
  },
});

const removeTradable = async (tradableCard) => xhrRequest({
  url: `/tradables/${tradableCard.id}`,
  options: {
    method: 'DELETE',
  },
});

const TradableToggle = ({ card, isOwner, row }) => {
  const { tradables, setTradables } = useContext(TradablesContext);
  const tradableCard = tradables.find((trade) => trade.card_id === card.id) || {};
  const handleChange = async ({ target }) => {
    const updatedTradables = target.checked
      ? addTradable(card).then((toAdd) => tradables.concat(toAdd))
      : removeTradable(tradableCard).then((toRemove) => (
        tradables.filter((toCheck) => toCheck.id !== toRemove.id)
      ));
    setTradables(await updatedTradables);
  };
  return (
    <label className="dashboard_tradable__label" htmlFor={`${card.name}_${tradableCard.id}_${row}`}>
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
    </label>
  );
};

export default TradableToggle;
