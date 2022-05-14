import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

const Alert = ({ userSignedIn, key, value }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => setShow(false), 5000);
  });

  return show
    && (
    <div id="alert" className={classNames('active', 'alert', `alert-${key}`, { 'logged-out': userSignedIn })}>
      {value}
      <button type="button" className="alert__close-button" onClick={() => setShow(false)}>
        <i className="fas fa-times" />
      </button>
    </div>
    );
};

export default Alert;
