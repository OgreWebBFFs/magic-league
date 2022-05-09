import React from "react";
import classNames from "classnames";
import Button from "../../../Button";
import { Row, Table, Cell } from "../../../Table";
import postTradeReview from "./post-trade-review";

const ReceiveCell = ({ children }) => <Cell className="trade-review-modal__cell receive">{children}</Cell>
const GiveCell = ({ children }) => <Cell className="trade-review-modal__cell give">{children}</Cell>
const RarityCell = ({ rarity }) => <Cell className={classNames("trade-review-modal__cell-rarity", rarity)}>{rarity.substr(0,1).toUpperCase()}</Cell>
const TradeReview = ({ trade }) => {
  return (
    <>
      <h3>Reviewing Trade</h3>
      <p><span style={{fontWeight: "900"}}>{trade.from.name}</span> has proposed the following trade:</p>
      <div className={"trade-review-modal__contents"}>
        <Table className="trade-review-modal__table">
          <Row isHeading={true}>
            <ReceiveCell>You Receive</ReceiveCell>
          </Row>
          {trade.from.cards.map(card => (
            <Row key={`review_row_from#${card.id}`}>
              <Cell><i className="fas fa-arrow-left"></i></Cell>
              <ReceiveCell>{card.name}</ReceiveCell>
              <RarityCell rarity={card.rarity} />
            </Row>
          ))}
        </Table>
        <Table className="trade-review-modal__table">
          <Row isHeading={true}>
            <GiveCell>{`${trade.from.name} Receives`}</GiveCell>
          </Row>
          {trade.to.cards.map(card => (
            <Row key={`review_row_to#${card.id}`}>
              <RarityCell rarity={card.rarity} />
              <GiveCell>{card.name}</GiveCell>
              <Cell><i class="fas fa-arrow-right"></i></Cell>
            </Row>
          ))}
        </Table>
      </div>
      <div className="trade-review-modal__actions">
        <Button onClick={() => postTradeReview(trade, "approved")} className="trade-review-modal__action-button approve">Accept</Button>
        <Button onClick={() => postTradeReview(trade, "rejected")} className="trade-review-modal__action-button reject">Decline</Button>
      </div>
      <p className="trade-review-modal__warning"><span className="warning">**WARNING**</span>: Selecting accept will automatically updated your alloted trades and collection! Choose wisely...</p>
    </>
  )
}

export default TradeReview;