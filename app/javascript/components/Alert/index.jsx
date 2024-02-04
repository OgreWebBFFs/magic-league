import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Button from '../Button';

const Alert = ({ userSignedIn, key, value }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => setShow(false), 3000);
  });

  return show
    && (
    <div id="alert" className={classNames('active', 'alert', `alert-${key}`, { 'logged-out': !userSignedIn })}>
      <p>{value}</p>
      <Button type="button" className="alert__close-button button--small button--ghost" onClick={() => setShow(false)}>
        <i className="fas fa-times" />
      </Button>
    </div>
    );
};

export default Alert;
