export default {
  name: 'card type',
  options: [
    {
      id: 'creature',
      display: 'Creature',
      criteria: (card) => card.type_line?.match(/creature/ig),
    },
    {
      id: 'instant',
      display: 'Instant',
      criteria: (card) => card.type_line?.match(/instant/ig),
    },
    {
      id: 'sorcery',
      display: 'Sorcery',
      criteria: (card) => card.type_line?.match(/sorcery/ig),
    },
    {
      id: 'artifact',
      display: 'Artifact',
      criteria: (card) => card.type_line?.match(/artifact/ig),
    },
    {
      id: 'enchantment',
      display: 'Enchantment',
      criteria: (card) => card.type_line?.match(/enchantment/ig),
    },
    {
      id: 'land',
      display: 'Land',
      criteria: (card) => card.type_line?.match(/land/ig),
    },
  ],
};
