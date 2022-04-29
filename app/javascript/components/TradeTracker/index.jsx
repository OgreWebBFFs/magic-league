import React from 'react';
import { Table, Row, Cell } from '../Table';
import TradeTrackerInput from './TradeTrackerInput';

const OneThirdCell = ({ children }) => (
  <Cell size={"33.33%"}>{children}</Cell>
)

const TradeTracker = ({ trades_data, user_id, current_user_id}) => {
  return (<div class="dashboard_profile_trades">
    <Table>
      <Row isHeading={true}>
        <OneThirdCell>Trades</OneThirdCell>
        <OneThirdCell>Received</OneThirdCell>
        <OneThirdCell>Allowed</OneThirdCell>
      </Row>
      {trades_data.map(trade => (
        <Row>
          <OneThirdCell>{trade.rarity.charAt(0).toUpperCase() + trade.rarity.slice(1)}</OneThirdCell>
          <OneThirdCell>
            <TradeTrackerInput
              {...trade}
              isOwner={user_id === current_user_id}
              currentUserId={current_user_id}/>
          </OneThirdCell>
          <OneThirdCell>
            {trade.num_allowed}
          </OneThirdCell>
        </Row>
      ))}
    </Table>

  </div>);
}

export default TradeTracker;