import React from "react";
import classNames from "classnames";
import Button from "../../../Button";
import { Row, Table, Cell } from "../../../Table";
import postTradeReview from "./post-trade-review";
import CardReviewTable from "./CardReviewTable";

const ReceiveCell = ({ children }) => <Cell className="trade-review-modal__cell card-cell">{children}</Cell>
const GiveCell = ({ children }) => <Cell className="trade-review-modal__cell card-cell">{children}</Cell>
const RarityCell = ({ rarity }) => <Cell className={classNames("trade-review-modal__cell-rarity", rarity)}>{rarity.substr(0,1).toUpperCase()}</Cell>
const TradeReview = ({ trade }) => {
  return (
    <>
      <h3>Reviewing Trade</h3>
      <p><span style={{fontWeight: "900"}}>{trade.from.name}</span> has proposed the following trade:</p>
      <div className={"trade-review-modal__contents"}>
        <CardReviewTable
          cards={trade.from.cards}
          header={"You Receive"}
          arrow={<i className="fas fa-arrow-left"></i>} />
        <CardReviewTable
          cards={trade.to.cards}
          header={`${trade.from.name} Receives`}
          arrow={<i className="fas fa-arrow-right"></i>} />
      </div>
      <div className="trade-review-modal__actions">
        <Button onClick={() => postTradeReview(trade, "approved")} className="trade-review-modal__action-button approve">Accept</Button>
        <Button onClick={() => postTradeReview(trade, "rejected")} className="trade-review-modal__action-button reject">Decline</Button>
      </div>
      <p className="trade-review-modal__warning"><span className="warning">**WARNING**</span>: Selecting Accept will automatically update your allotted trades and collection! Choose wisely...</p>
    </>
  )
}

export default TradeReview;