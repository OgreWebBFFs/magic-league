import React from 'react';
import { Table, Row, Cell } from '../../Table';

const CardList = ({ children }) => (
  <Table className="collection__togglable-view">
    <Row isHeading>
      <Cell isPriority>Card</Cell>
      <Cell>Highlights</Cell>
    </Row>
    {children}
  </Table>
);

export default CardList;
