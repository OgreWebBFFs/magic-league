import React from 'react';
import { Table, Row, Cell } from '../Table';
import TradeTrackerInput from './TradeTrackerInput';

const TradeTracker = ({ tradeTrackerData, userId, currentUserId }) => (
  <div className="dashboard-profile__trades">
    <Table>
      <Row isHeading>
        <Cell>Trades</Cell>
        <Cell>Received</Cell>
        <Cell>Allowed</Cell>
      </Row>
      {tradeTrackerData.map((trade) => (
        <Row>
          <Cell>{trade.rarity.charAt(0).toUpperCase() + trade.rarity.slice(1)}</Cell>
          <Cell>
            <TradeTrackerInput
              trade={trade}
              isOwner={userId === currentUserId}
              currentUserId={currentUserId}
            />
          </Cell>
          <Cell>
            {trade.num_allowed}
          </Cell>
        </Row>
      ))}
    </Table>

  </div>
);

export default TradeTracker;
