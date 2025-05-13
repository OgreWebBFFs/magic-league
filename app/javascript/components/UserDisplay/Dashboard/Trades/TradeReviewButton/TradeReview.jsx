import React, { useState } from "react";
import Button from "../../../../Button";
import postTradeReview from "./post-trade-review";
import { Table, Row, Cell } from "../../../../Table";
// import CardReviewTable from "./CardReviewTable";

const TradeReview = ({ trade, currentUserId }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (
        <>
            <h3>Reviewing Trade</h3>
            <p>
                <span style={{ fontWeight: "900" }}>
                    Trade with {trade.other_users.map((user) => user.name).join(" and ")}
                </span>
                :
            </p>
            <div className="trade-review-modal__contents">
                <Table>
                    <Row isHeading>
                        <Cell>You</Cell>
                    </Row>
                    <Row>
                        <Cell>
                            <ul>
                                {trade.current_user.give_cards.map((card) => (
                                    <li style={{ color: "red" }}>{`- ${card.name} (${card.rarity})`}</li>
                                ))}
                                {trade.current_user.receive_cards.map((card) => (
                                    <li style={{ color: "green" }}>{`+ ${card.name} (${card.rarity})`}</li>
                                ))}
                            </ul>
                        </Cell>
                    </Row>
                </Table>
                {trade.other_users.map((user) => (
                    <Table>
                        <Row isHeading>
                            <Cell>{user.name}</Cell>
                        </Row>
                        <Row>
                            <Cell>
                                <ul>
                                    {user.give_cards.map((card) => (
                                        <li style={{ color: "red" }}>{`- ${card.name} (${card.rarity})`}</li>
                                    ))}
                                    {user.receive_cards.map((card) => (
                                        <li style={{ color: "green" }}>{`+ ${card.name} (${card.rarity})`}</li>
                                    ))}
                                </ul>
                            </Cell>
                        </Row>
                    </Table>
                ))}
            </div>
            <div className="modal__actions">
                <Button
                    onClick={() => {
                        setIsSubmitting(true);
                        postTradeReview(trade, "rejected");
                    }}
                    className="modal__action-button button--negative"
                    disabled={isSubmitting}
                >
                    Decline
                </Button>
                <Button
                    onClick={() => {
                        setIsSubmitting(true);
                        postTradeReview(trade, "approved", currentUserId);
                    }}
                    className="modal__action-button button--positive"
                    disabled={isSubmitting}
                >
                    Accept
                </Button>
            </div>
            <p className="modal__notice">
                <span className="warning">**WARNING**</span>: Selecting Accept will automatically update your allotted
                trades and collection! Choose wisely...
            </p>
        </>
    );
};

export default TradeReview;
