import React from "react";
import { Table, Row, Cell } from "../Table";
import { TradeProposalButton } from "../TradeProposal";
import UserLink from "../UserLink";

const NoOwnersMessage = () => <Cell isPriority>No one owns this card yet</Cell>;

const KeeperButton = () => (
    <div
        style={{
            color: "var(--color-fill-negative)",
            width: "100%",
            display: "grid",
            placeItems: "center",
            fontSize: "1.25rem",
        }}
    >
        <i className="fas fa-slash" style={{ position: "absolute " }} />
        <i className="fas fa-exchange-alt" />
    </div>
);

const OwnershipTable = ({ grid: { rows }, selectedSet, onSetChange, currentUserId }) => (
    <Table className="ownership-table">
        <Row isHeading>
            <div className="ownership-table__row">
                <div>Owned by</div>
                <div style={{ textAlign: "right" }}>Amount</div>
            </div>
        </Row>
        {rows.length === 0 ? (
            <NoOwnersMessage />
        ) : (
            rows.map(
                ({
                    total_quantity: totalQuantity,
                    user,
                    quantity_by_set: quantityBySet,
                    message_statuses: messageStatuses,
                }) => (
                    <Row key={user.id}>
                        <div className="ownership-table__row">
                            <div className="ownership-table__user">
                                <UserLink user={user} />
                            </div>
                            <div className="ownership-table__quantity">Total: {totalQuantity}</div>
                            <div className="ownership-table__message">
                                {messageStatuses &&
                                    (messageStatuses[selectedSet] === "keeper" ? (
                                        <KeeperButton />
                                    ) : (
                                        <TradeProposalButton
                                            card={{}}
                                            currentUserId={currentUserId}
                                            user={user}
                                            priorMessageTimestamp={messageStatuses[selectedSet]}
                                        />
                                    ))}
                            </div>
                            <div className="ownership-table__sets">
                                {Object.entries(quantityBySet).map(([set, quantity]) => (
                                    <button
                                        key={set}
                                        type="button"
                                        onClick={() => onSetChange(set)}
                                        className={`set-tag ${set === selectedSet ? "current" : ""}`}
                                    >
                                        <i className={`ss ss-${set}`} style={{ fontSize: "1.5rem" }} />{" "}
                                        <span style={{ fontSize: ".75rem" }}>{quantity}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Row>
                )
            )
        )}
        {rows.length > 0 && (
            <Row>
                <div className="ownership-table__row">
                    <div>
                        <b>
                            <i>Total</i>
                        </b>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <b>
                            <i>{rows.reduce((sum, r) => sum + r.total_quantity, 0)}</i>
                        </b>
                    </div>
                </div>
            </Row>
        )}
    </Table>
);

export default OwnershipTable;
