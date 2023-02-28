import React from 'react';

export default {
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
};
