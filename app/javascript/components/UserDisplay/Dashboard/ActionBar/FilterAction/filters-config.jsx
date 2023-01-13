import React from 'react';

export default [
  {
    name: 'rarity',
    options: [
      {
        id: 'common',
        display: 'Common',
        criteria: (card) => card.rarity === 'common',
      },
      {
        id: 'uncommon',
        display: 'Uncommon',
        criteria: (card) => card.rarity === 'uncommon',
      },
      {
        id: 'rare',
        display: 'Rare',
        criteria: (card) => card.rarity === 'rare',
      },
      {
        id: 'mythic',
        display: 'Mythic',
        criteria: (card) => card.rarity === 'mythic',
      }],
  },
  {
    name: 'color',
    options: [
      {
        id: 'white',
        display: (
          <>
            <i className="ms ms-w" />
            White
          </>
        ),
        criteria: (card) => card.colors.includes('W'),
      }, {
        id: 'blue',
        display: (
          <>
            <i className="ms ms-u" />
            Blue
          </>
        ),
        criteria: (card) => card.colors.includes('U'),
      },
      {
        id: 'black',
        display: (
          <>
            <i className="ms ms-b" />
            Black
          </>
        ),
        criteria: (card) => card.colors.includes('B'),
      },
      {
        id: 'red',
        display: (
          <>
            <i className="ms ms-r" />
            Red
          </>
        ),
        criteria: (card) => card.colors.includes('R'),
      },
      {
        id: 'green',
        display: (
          <>
            <i className="ms ms-g" />
            Green
          </>
        ),
        criteria: (card) => card.colors.includes('G'),
      },
      {
        id: 'colorless',
        display: (
          <>
            <i className="ms ms-c" />
            Colorless
          </>
        ),
        criteria: (card) => card.colors.length === 0,
      }],
  },
  {
    name: 'card type',
    options: [
      {
        id: 'creature',
        display: 'Creature',
        criteria: (card) => card.type_line?.match(/creature/ig),
      },
      {
        id: 'artifact',
        display: 'Artifact',
        criteria: (card) => {
          console.log('debug -- ', card.name)
          console.log('debug -- ', card.type_line?.match(/artifact/ig))
          return card.type_line?.match(/artifact/ig)
        },
      },
    ],
  },
];
