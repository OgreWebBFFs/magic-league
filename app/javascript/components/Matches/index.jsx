import React from 'react';
import useIsMobile from '../../helpers/hooks/use-is-mobile';
import useIsSeasonView from '../../helpers/hooks/use-is-season-view';
import ViewToggleSwitch from '../ViewToggleSwitch';
import {
  Table, Row, Cell, MobileLabel,
} from '../Table';
import Button from '../Button';

const Matches = ({ matches, eventMatches, isAdmin = false }) => {
  const [isSeasonView] = useIsSeasonView();
  const isMobile = useIsMobile();
  return (
    <>
      <div className="matches__title">
        <h2>Matches</h2>
        <ViewToggleSwitch name="matches-type" />
      </div>
      <Table>
        { !isMobile && (
        <Row isHeading>
          <Cell className=">matches__cell matches__cell--date">Date</Cell>
          <Cell className=">matches__cell matches__cell--time">Time</Cell>
          <Cell className=">matches__cell matches__cell--player">Winner</Cell>
          <Cell className=">matches__cell matches__cell--player">Loser</Cell>
          <Cell className=">matches__cell matches__cell--id">ID</Cell>
          {isAdmin && <Cell className=">matches__cell matches__cell--admin-actions">Admin</Cell>}
        </Row>
        )}
        {(isSeasonView ? matches : eventMatches).map(({
          table: {
            places: [winner, ...losers], id, date, time,
          },
        }) => (
          <Row>
            <Cell className=">matches__cell matches__cell--date">{date}</Cell>
            <Cell className=">matches__cell matches__cell--time">{time}</Cell>
            <Cell className=">matches__cell matches__cell--player">
              <MobileLabel>Winner: </MobileLabel>
              {winner}
            </Cell>
            <Cell className=">matches__cell matches__cell--player">
              <MobileLabel>Loser: </MobileLabel>
              <ul style={{display: 'inline-block'}}>
                {losers.map((loser) => <li>{loser}</li>)}
              </ul>
            </Cell>
            <Cell className=">matches__cell matches__cell--id">
              <MobileLabel>Match ID: </MobileLabel>
              {id}
            </Cell>
            {isAdmin
                  && (
                  <Cell className=">matches__cell matches__cell--admin-actions">
                    <Button data-confirm="Are you sure?" rel="nofollow" data-method="delete" href={`/admin/matches/${id}`}><i className="fas fa-times" /></Button>
                  </Cell>
                  )}
          </Row>
        ))}
      </Table>
    </>
  );
};

export default Matches;
