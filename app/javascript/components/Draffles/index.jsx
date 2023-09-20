import React from 'react';
import { Table, Row, Cell } from '../Table';
import Button from '../Button';

const Draffles = ({ draffles, isAdmin }) => (
  <>
    <h2>Draffles</h2>
    <Table>
      <Row isHeading>
        <Cell>Date</Cell>
        <Cell>Name</Cell>
        <Cell>Status</Cell>
      </Row>
      {draffles.map(({ table: draffle }) => (
        <Row key={draffle.id}>
          <Cell>{draffle.date}</Cell>
          <Cell>{draffle.name}</Cell>
          <Cell>{draffle.status}</Cell>
        </Row>
      ))}
    </Table>
    {isAdmin && (
    <form action="/draffles" method="post">
      <Button name="" value="" type="submit">Create New Draffle</Button>
    </form>
    )}
  </>

);
export default Draffles;
