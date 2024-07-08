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
        ownerships.map(({ keeper, quantity, collection: { user: { id, name }}}, i) => (
          <Row>
            <Cell isPriority><a href={`/users/${id}`}>{name}</a></Cell>
            <AmountCell>
              {quantity}
              {id !== currentUserId && !keeper && (
              <TradeProposalButtonSmall
                card={formatCard(card, [ownerships[i]])}
                currentUserId
              />
              )}
              {id !== currentUserId && keeper && (
                <div style={{
                    color: 'var(--color-fill-negative)',
                    marginLeft: '8px',
                    width: '100%',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '1.25rem'
                }}>
                    <i className='fas fa-slash' style={{ position: 'absolute '}} />
                    <i className='fas fa-exchange-alt' />
                </div>
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
