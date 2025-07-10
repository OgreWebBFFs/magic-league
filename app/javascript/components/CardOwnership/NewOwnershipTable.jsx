import React from "react";
import { Table, Row, Cell } from "../Table";
import { TradeProposalButton } from "../TradeProposal";
import UserLink from "../UserLink";

const TotalQuantity = ({ children }) => <Cell className="card-profile__total-quantity">{children}</Cell>;

const Message = ({ children }) => <Cell className="card-profile__message">{children}</Cell>;

const NoOwnersMessage = () => <Cell isPriority>No one owns this card yet</Cell>;

const OwnershipTable = ({ grid: { rows }, selectedSet, onSetChange }) => (
    <Table className="card-profile__ownership-table">
        <Row className="card-profile__owneership-table-heading" isHeading>
            <Cell isPriority>Owned By</Cell>
            <TotalQuantity>Amount</TotalQuantity>
            <Message />
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
                    keeper = false,
                }) => (
                    <Row key={user.id}>
                        <div className="ownership-table__row">
                            <div className="ownership-table__user">
                                <UserLink user={user} />
                            </div>
                            <div className="ownership-table__quantity">Total: {totalQuantity}</div>
                            <div className="ownership-table__message">
                                {messageStatuses && (
                                    <TradeProposalButton
                                        card={{}}
                                        currentUserId="1"
                                        user={user}
                                        priorMessageTimestamp={messageStatuses[selectedSet]}
                                    />
                                )}
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
                        {/* <Cell isPriority style={{ display: "flex" }}>
                            <UserLink user={user} />
                        </Cell>
                        <TotalQuantity>{totalQuantity}</TotalQuantity>
                        <Message>
                            {messageStatuses && !keeper && (
                                <TradeProposalButton
                                    card={{}}
                                    currentUserId="1"
                                    user={user}
                                    priorMessageTimestamp={messageStatuses[selectedSet]}
                                />
                            )}
                            {keeper && (
                                <div
                                    style={{
                                        color: "var(--color-fill-negative)",
                                        marginLeft: "8px",
                                        width: "100%",
                                        display: "grid",
                                        placeItems: "center",
                                        fontSize: "1.25rem",
                                    }}
                                >
                                    <i className="fas fa-slash" style={{ position: "absolute " }} />
                                    <i className="fas fa-exchange-alt" />
                                </div>
                            )}
                        </Message>
                        <div style={{ width: "100%" }}>
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
                        </div> */}
                    </Row>
                )
            )
        )}
        {rows.length > 0 && (
            <Row>
                <Cell isPriority>
                    <b>
                        <i>Total</i>
                    </b>
                </Cell>
                <TotalQuantity>
                    <b>
                        <i>{rows.reduce((sum, o) => sum + o.total_quantity, 0)}</i>
                    </b>
                </TotalQuantity>
            </Row>
        )}
    </Table>
);

export default OwnershipTable;
