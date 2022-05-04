const getCardId = ({ card }) => parseInt(card.id);

const buildTradeData = (toId, toCards, fromId, fromCards) => ({
  to: {
    id: toId,
    cards: toCards.map(getCardId)
  },
  from: {
    id: fromId,
    cards: fromCards.map(getCardId)
  }
});
