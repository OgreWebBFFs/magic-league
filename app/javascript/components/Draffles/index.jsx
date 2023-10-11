import React from 'react';
import { Table, Row, Cell } from '../Table';
import Button from '../Button';

const Draffles = ({ draffles, isAdmin }) => (
  <>
    <h2>Draffles</h2>
    {draffles.length > 0 ? (

      <Table className="draffle-table">
        <Row isHeading>
          <Cell className="date-cell">Date</Cell>
          <Cell className="name-cell">Name</Cell>
          <Cell className="status-cell">Status</Cell>
          <Cell className="action-cell" />
        </Row>
        {draffles.map(({ table: draffle }) => (
          <Row key={draffle.id}>
            <Cell className="date-cell">{draffle.date}</Cell>
            <Cell className="name-cell">{draffle.name}</Cell>
            <Cell className="status-cell">{draffle.status}</Cell>
            <Cell className="action-cell">
              <a href={`/draffles/${draffle.id}`}>
                <i className="fas fa-eye" />
                View
              </a>
            </Cell>
          </Row>
        ))}
      </Table>
    ) : <p>No Draffles Yet...</p>}
    {isAdmin && (
    <form action="/draffles" method="post">
      <Button name="" value="" type="submit">Create New Draffle</Button>
    </form>
    )}
  </>

);
export default Draffles;
