import React from 'react';
import { Table, Row, Cell} from '../Table';
import {
  TradeProposalButtonSmall,
} from '../TradeProposal';
import formatCard from './format-card';

const AmountCell = ({children}) => <Cell className="card-profile__cell--amount">{children}</Cell>;

const NoOwnersMessage = () => <Cell isPriority={true}>No one owns this card yet</Cell>;

const OwnershipTable = ({ card, current_user_id, total_count, owner_details }) => {
  return (
  <>
    <Table>
      <Row className="card-profile__row--headings" isHeading={true}>
        <Cell isPriority={true}>Owner</Cell>
        <AmountCell>Amount</AmountCell>
      </Row>
      {total_count <= 0 ? <NoOwnersMessage /> : (
        owner_details.map(({count, id, name}) => (
          <Row>
            <Cell isPriority={true}>{name}</Cell>
            <AmountCell>{count} 
            {id !== current_user_id && <TradeProposalButtonSmall
                card={formatCard(card, [{id, name}])}
                currentUserId/>}
              </AmountCell>
          </Row>
        ))
      )}
    </Table>
    <p>{`*total copies in league: ${total_count}`}</p>
  </>)
}

export default OwnershipTable;