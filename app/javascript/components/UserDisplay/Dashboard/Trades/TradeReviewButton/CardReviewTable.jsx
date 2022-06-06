import React from 'react';
import classNames from 'classnames';
import { Row, Table, Cell } from '../../../../Table';

const RARITY_RANKING = {
  common: 0,
  uncommon: 1,
  rare: 2,
  mythic: 3,
};

const CardCell = ({ children }) => <Cell className="cell--card">{children}</Cell>;
const RarityCell = ({ rarity }) => <Cell className={classNames('cell--rarity', rarity)}>{rarity.substr(0, 1).toUpperCase()}</Cell>;

const CardReviewTable = ({ header, cards, arrow }) => {
  const cardsOrderedByRarity = cards.sort((cardA, cardB) => (
    RARITY_RANKING[cardB.rarity] - RARITY_RANKING[cardA.rarity]
  ));

  return (
    <Table className="trade-review-modal__table">
      <Row isHeading>
        <CardCell>{header}</CardCell>
      </Row>
      {cardsOrderedByRarity.map((card) => (
        <Row>
          <Cell className="cell--arrow">{arrow}</Cell>
          <CardCell>{card.name}</CardCell>
          <RarityCell rarity={card.rarity} />
        </Row>
      ))}
    </Table>
  );
};

export default CardReviewTable;
