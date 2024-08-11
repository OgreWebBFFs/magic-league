import React from 'react';

const UserLink = ({ user: {name, id}}) => (
    <a href={`/users/${id}`}>{name}</a>
);

export default UserLink;