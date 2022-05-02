import React, {useState} from 'react';
import { Table, Row, Cell} from '../Table';
import {
  TradeProposalButtonSmall,
  TradeProposalModal
} from '../TradeProposal';
import formatCard from './format-card';

const AmountCell = ({children}) => <Cell className="card-profile__cell--amount">{children}</Cell>;

const NoOwnersMessage = () => <Cell isPriority={true}>No one owns this card yet</Cell>;

const OwnershipTable = ({ card, current_user_id, total_count, owner_details }) => {
  const [modalOn, setModalOn] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

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
    {modalOn && (
      <TradeProposalModal 
        closeModal={() => setModalOn(false)} 
        card={{
          id: card.id,
          attributes: {
            name: card.name,
            users: {
              data: [{ attributes: selectedUser }]
            }
          }
        }}
        currentUserId={current_user_id}
      />)}
  </>)
}

export default OwnershipTable;