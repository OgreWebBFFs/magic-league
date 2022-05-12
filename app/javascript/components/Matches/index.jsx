import React from 'react';
import useIsMobile from '../../helpers/hooks/use-is-mobile';
import {Table, Row, Cell, MobileLabel} from '../Table';
import Button from '../Button';

const Matches = ({ matches, isAdmin=false }) => {
  const isMobile = useIsMobile();
  return (
      <>
          <h2>Matches</h2>
          <Table>
           { !isMobile && <Row isHeading={true}>
              <Cell className=">matches__cell matches__cell--date">Date</Cell>
              <Cell className=">matches__cell matches__cell--time">Time</Cell>
              <Cell className=">matches__cell matches__cell--player">Winner</Cell>
              <Cell className=">matches__cell matches__cell--player">Loser</Cell>
              <Cell className=">matches__cell matches__cell--id">ID</Cell>
              {isAdmin && <Cell className=">matches__cell matches__cell--admin-actions">Admin</Cell>}
            </Row>}
            {matches.map(({table: {winner, loser, id, date, time}}) => (
              <Row>
                <Cell className=">matches__cell matches__cell--date">{date}</Cell>
                <Cell className=">matches__cell matches__cell--time">{time}</Cell>
                <Cell className=">matches__cell matches__cell--player"><MobileLabel>Winner: </MobileLabel>{winner}</Cell>
                <Cell className=">matches__cell matches__cell--player"><MobileLabel>Loser: </MobileLabel>{loser}</Cell>
                <Cell className=">matches__cell matches__cell--id"><MobileLabel>Match ID: </MobileLabel>{id}</Cell>
                {isAdmin &&     
                  <Cell className=">matches__cell matches__cell--admin-actions"> 
                    <Button href={`/admin/matches/${id}/edit`}><i class="fas fa-cog"></i></Button>
                    <Button data-confirm="Are you sure?" rel="nofollow" data-method="delete"  href={`/admin/matches/${id}`}><i className="fas fa-times"></i></Button>
                  </Cell>
                }
              </Row>
            ))}
          </Table>
    </>
  )
}

export default Matches;