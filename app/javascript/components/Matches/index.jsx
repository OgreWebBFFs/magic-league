import React from 'react';
import {Table, Row, Cell} from '../Table';

const DateTimeCell = ({children}) => <Cell size={"150px"}>{children}</Cell>
const WinnerLoserCell = ({children}) => <Cell isPriority={true} size={'20%'}>{children}</Cell>
const IdCell = ({children}) => <Cell size={"50px"}>{children}</Cell>
const MobileLabel = ({children}) => <span className="label-mobile">{children}</span>
const Matches = ({ matches }) => {
  return (
      <>
          <h2>Matches</h2>
          <Table>
            <Row isHeading={true}>
              <DateTimeCell>Date</DateTimeCell>
              <DateTimeCell>Time</DateTimeCell>
              <WinnerLoserCell>Winner</WinnerLoserCell>
              <WinnerLoserCell>Loser</WinnerLoserCell>
              <IdCell>ID</IdCell>
            </Row>
            {matches.map(({table: {winner, loser, id, date, time}}) => (
              <Row>
                <DateTimeCell>{date}</DateTimeCell>
                <DateTimeCell>{time}</DateTimeCell>
                <WinnerLoserCell><MobileLabel>Winner: </MobileLabel>{winner}</WinnerLoserCell>
                <WinnerLoserCell><MobileLabel>Loser: </MobileLabel>{loser}</WinnerLoserCell>
                <IdCell><MobileLabel>Match ID: </MobileLabel>{id}</IdCell>
              </Row>
            ))}
          </Table>
    </>
  )
}

export default Matches;