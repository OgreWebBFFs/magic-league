import React from "react";
import { Table, Row } from "../Table";

const OwnershipTable = ({ children }) => (
    <Table className="ownership-table">
        <Row isHeading>
            <div className="ownership-table__row">
                <div>Owned by</div>
                <div style={{ textAlign: "right" }}>Amount</div>
            </div>
        </Row>
        {children}
    </Table>
);

export default OwnershipTable;
