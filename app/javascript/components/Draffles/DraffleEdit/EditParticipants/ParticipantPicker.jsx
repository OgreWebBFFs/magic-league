import React from 'react';
import classNames from 'classnames';

const ParticipantPicker = ({ user, onClick, orderable }) => (
  <button
    type="button"
    onClick={onClick}
    className={classNames(['edit-participants__picker-choice', { orderable }])}
  >
    {user.name}
  </button>
);

export default ParticipantPicker;
