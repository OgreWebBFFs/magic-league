const getCardId = ({ card }) => parseInt(card.id);

const ParamValidationError = () => {
  const error = new Error('[ERROR] Insufficient Parameters: trade request could not be processed')
  error.data = {
    status: 'invalid'
  }
  return error
}

const validateParams = (...params) => {
  params.forEach((param) => {
    if(!param || param.length === 0) {
      throw new ParamValidationError()
    }
  })
}

const buildTradeData = (toId, toCards, fromId, fromCards) => {
  validateParams(toId, toCards, fromId, fromCards)
  return {
    to: {
      id: toId,
      cards: toCards.map(getCardId)
    },
    from: {
      id: fromId,
      cards: fromCards.map(getCardId)
    }
  };
}

export default buildTradeData;
