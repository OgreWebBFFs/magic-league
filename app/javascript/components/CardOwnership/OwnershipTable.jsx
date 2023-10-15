import React from 'react';
import { Table, Row, Cell } from '../Table';
import {
  TradeProposalButtonSmall,
} from '../TradeProposal';
import formatCard from './format-card';

const AmountCell = ({ children }) => <Cell className="card-profile__cell--amount">{children}</Cell>;

const NoOwnersMessage = () => <Cell isPriority>No one owns this card yet</Cell>;

const OwnershipTable = ({
  card, currentUserId, totalCount, ownerDetails,
}) => (
  <>
    <Table>
      <Row className="card-profile__row--headings" isHeading>
        <Cell isPriority>Owner</Cell>
        <AmountCell>Amount</AmountCell>
      </Row>
      {totalCount <= 0 ? <NoOwnersMessage /> : (
        ownerDetails.map(({ count, id, name }) => (
          <Row>
            <Cell isPriority><a href={`/users/${id}`}>{name}</a></Cell>
            <AmountCell>
              {count}
              {id !== currentUserId && (
              <TradeProposalButtonSmall
                card={formatCard(card, [{ id, name }])}
                currentUserId
              />
              )}
            </AmountCell>
          </Row>
        ))
      )}
    </Table>
    <p>{`*total copies in league: ${totalCount}`}</p>
  </>
);

export default OwnershipTable;
