import React from 'react';
import { Table, Row, Cell } from '../Table';

const NoWishlistersMessage = () => <Cell isPriority>No one has put this card on their wishlist yet</Cell>;

const WishlistTable = ({
  totalWishlisters, wishlisterDetails
}) => (
    <Table>
      <Row className="card-profile__row--headings" isHeading>
        <Cell isPriority>Wishlisted By</Cell>
        <Cell>Currently Owns</Cell>
      </Row>
    {totalWishlisters <= 0 ? <NoWishlistersMessage /> : (
      wishlisterDetails.map(({ id, name, count }) => (
        <Row>
          <Cell isPriority><a href={`/users/${id}`}>{name}</a></Cell>
          <Cell className="card-profile__cell--amount">{count}</Cell>
        </Row>
      ))
    )}
    </Table>
);

export default WishlistTable;