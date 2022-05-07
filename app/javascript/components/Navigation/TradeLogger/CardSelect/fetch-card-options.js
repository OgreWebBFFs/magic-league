import xhrRequest from '../../../../helpers/xhr-request';

const searchCards = async (query) => (await xhrRequest({
  url: `/cards?query=${query}`,
  options: {
    method: 'GET'
  }
})).data;

const fetchCardOptions = async (inputValue) => (await searchCards(inputValue)).map(card => ({
  value: `${card.id}#${Date.now()}`,
  label: card.attributes.name,
  card
}));

export default fetchCardOptions;