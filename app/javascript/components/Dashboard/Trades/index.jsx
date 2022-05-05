import React from 'react';
import { Table, Row, Cell } from '../../Table';
import StatusAction from './StatusAction';

const EmptyState = () => (
  <div class="empty-card-view">
    <p class="empty-card-view__message">
      Doesn't Look like you've made any trades. Better start wheelin' and dealin'
    </p>
</div>
)

const DateCell = ({children}) => <Cell size={"15%"}>{children}</Cell>
const CardListCell = ({children}) => <Cell size={"25%"} isPriority={true}>{children}</Cell>
const NameCell = ({children}) => <Cell size={"20%"} isPriority={true}>{children}</Cell>
const StatusCell = ({children}) => <Cell size={"15%"}>{children}</Cell>

const Trades = ({ trades, user, currentUserId }) => {
  const isEmpty = trades.length === 0;
  return (
    <>
      {isEmpty && <EmptyState />}
      {!isEmpty && (
        <Table>
          <Row isHeading={true}>
            <DateCell>Date</DateCell>
            <NameCell>With</NameCell>
            <CardListCell>Giving</CardListCell>
            <CardListCell>Receiving</CardListCell>
            <StatusCell>Status</StatusCell>
          </Row>
          {trades.map(trade => {
            const info = trade.data.attributes;
            const me = info.from.id === user.id ? info.from : info.to;
            const them = info.from.id === user.id ? info.to : info.from;
            return (
              <Row>
                <DateCell>{info.offer_date}</DateCell>
                <NameCell>{them.name}</NameCell>
                <CardListCell><ul>{me.cards.map(card => <li>{card.name}</li>)}</ul></CardListCell>
                <CardListCell><ul>{them.cards.map(card => <li>{card.name}</li>)}</ul></CardListCell>
                <StatusCell><StatusAction trade={info} currentUserId={currentUserId} /></StatusCell>
              </Row>
            )
          }
          )}
        </Table>
      )}
    </>
  )
}

export default Trades;