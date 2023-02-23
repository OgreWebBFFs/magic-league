export default {
  name: 'mana cost',
  options: [
    {
      id: '0/1',
      display: '0 / 1',
      criteria: (card) => parseInt(card.cmc, 10) <= 1,
    },
    {
      id: '2',
      display: '2',
      criteria: (card) => parseInt(card.cmc, 10) === 2,
    },
    {
      id: '3',
      display: '3',
      criteria: (card) => parseInt(card.cmc, 10) === 3,
    },
    {
      id: '4',
      display: '4',
      criteria: (card) => parseInt(card.cmc, 10) === 4,
    },
    {
      id: '5',
      display: '5',
      criteria: (card) => parseInt(card.cmc, 10) === 5,
    },
    {
      id: '6',
      display: '6',
      criteria: (card) => parseInt(card.cmc, 10) === 6,
    },
    {
      id: '7+',
      display: '7+',
      criteria: (card) => parseInt(card.cmc, 10) >= 7,
    },
  ],
};
