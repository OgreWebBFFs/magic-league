import React, {useState} from 'react';
import { Table, Row, Cell} from '../Table';
import {
  TradeProposalButtonSmall,
  TradeProposalModal
} from '../TradeProposal';
import formatCard from './format-card';

const AmountCell = ({children}) => <Cell size={"75px"}>{children}</Cell>;

const TradeProposalCell = ({children}) => <Cell size={"55px"}>{children}</Cell>

const NoOwnersMessage = () => <Cell isPriority={true}>No one owns this card yet</Cell>;

const OwnershipTable = ({ card, current_user_id, total_count, owner_details }) => {
  const [modalOn, setModalOn] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  return (
  <>
    <Table>
      <Row isHeading={true}>
        <Cell isPriority={true}>Owner</Cell>
        <AmountCell size={"75px"}>Amount</AmountCell>
        <TradeProposalCell size={"50px"}></TradeProposalCell>
      </Row>
      {total_count <= 0 ? <NoOwnersMessage /> : (
        owner_details.map(({count, id, name}) => (
          <Row>
            <Cell isPriority={true}>{name}</Cell>
            <AmountCell size={"75px"}>{count}</AmountCell>
            <TradeProposalCell size={"50px"}>
              {id !== current_user_id && <TradeProposalButtonSmall
                card={formatCard(card, [{id, name}])}
                currentUserId/>}
            </TradeProposalCell>
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