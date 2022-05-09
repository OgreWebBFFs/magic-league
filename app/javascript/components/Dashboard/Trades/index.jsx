import React from 'react';
import { Table, Row, Cell, MobileLabel } from '../../Table';
import StatusAction from './StatusAction';

const EmptyState = () => (
  <div class="empty-card-view">
    <p class="empty-card-view__message">
      Doesn't Look like you've made any trades. Better start wheelin' and dealin'
    </p>
</div>
)

const DateStatusCell = ({children}) => <Cell className={"trades-table-cell__date-status"}>{children}</Cell>
const CardListCell = ({children}) => <Cell className={"trades-table-cell__card-list"} isPriority={true}>{children}</Cell>
const NameCell = ({children}) => <Cell className={"trades-table-cell__name"} isPriority={true}>{children}</Cell>

const Trades = ({ trades, user, currentUserId }) => {
  const isEmpty = trades.length === 0;
  return (
    <>
      {isEmpty && <EmptyState />}
      {!isEmpty && (
        <Table className="trades-table">
          <Row isHeading={true}>
            <DateStatusCell>Date</DateStatusCell>
            <NameCell>With</NameCell>
            <CardListCell>Giving</CardListCell>
            <CardListCell>Receiving</CardListCell>
            <DateStatusCell>Status</DateStatusCell>
          </Row>
          {trades.map(trade => {
            const info = trade.data.attributes;
            const me = info.from.id === user.id ? info.from : info.to;
            const them = info.from.id === user.id ? info.to : info.from;
            return (
              <Row>
                <DateStatusCell>{info.offer_date}</DateStatusCell>
                <NameCell><MobileLabel>With: </MobileLabel>{them.name}</NameCell>
                <CardListCell>
                  <MobileLabel>Giving: </MobileLabel>
                  <ul>
                    {me.cards.map(card => <li>{card.name}</li>)}
                  </ul>
                </CardListCell>
                <CardListCell>
                  <MobileLabel>Receiving: </MobileLabel>
                  <ul>
                    {them.cards.map(card => <li>{card.name}</li>)}
                  </ul>
                </CardListCell>
                <DateStatusCell>
                  <MobileLabel>Status: </MobileLabel>
                  <StatusAction trade={info} currentUserId={currentUserId} />
                </DateStatusCell>
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