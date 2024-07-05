import React from 'react';
import { Table, Row, Cell } from '../Table';
import {
  TradeProposalButtonSmall,
} from '../TradeProposal';
import formatCard from './format-card';

const AmountCell = ({ children }) => <Cell className="card-profile__cell--amount">{children}</Cell>;

const NoOwnersMessage = () => <Cell isPriority>No one owns this card yet</Cell>;

const OwnershipTable = ({
  card, currentUserId, totalCount, ownerships,
}) => (
    <Table className="card-profile__table--ownership">
      <Row className="card-profile__row--headings" isHeading>
        <Cell isPriority>Owned By</Cell>
        <AmountCell>Amount</AmountCell>
      </Row>
      {totalCount <= 0 ? <NoOwnersMessage /> : (
        ownerships.map(({ quantity, collection: { user: { id, name }}}, i) => (
          <Row>
            <Cell isPriority><a href={`/users/${id}`}>{name}</a></Cell>
            <AmountCell>
              {quantity}
              {id !== currentUserId && (
              <TradeProposalButtonSmall
                card={formatCard(card, [ownerships[i]])}
                currentUserId
              />
              )}
            </AmountCell>
          </Row>
        ))
      )}
      {totalCount > 0 && 
        <Row>
          <Cell isPriority><b><i>Total</i></b></Cell>
          <AmountCell><b><i>{totalCount}</i></b></AmountCell>
        </Row>
      }
    </Table>
);

export default OwnershipTable;
