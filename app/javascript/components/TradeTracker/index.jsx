import React from 'react';
import { Table, Row, Cell } from '../Table';
import TradeTrackerInput from './TradeTrackerInput';


const TradeTracker = ({ trades_data, user_id, current_user_id}) => {
  return (<div class="dashboard-profile__trades">
    <Table>
      <Row isHeading={true}>
        <Cell>Trades</Cell>
        <Cell>Received</Cell>
        <Cell>Allowed</Cell>
      </Row>
      {trades_data.map(trade => (
        <Row>
          <Cell>{trade.rarity.charAt(0).toUpperCase() + trade.rarity.slice(1)}</Cell>
          <Cell>
            <TradeTrackerInput
              {...trade}
              isOwner={user_id === current_user_id}
              currentUserId={current_user_id}/>
          </Cell>
          <Cell>
            {trade.num_allowed}
          </Cell>
        </Row>
      ))}
    </Table>

  </div>);
}

export default TradeTracker;