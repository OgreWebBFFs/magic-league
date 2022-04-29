import React from 'react';
import classNames from 'classnames';

const Row = ({ children, isHeading }) => (
  <div className={classNames('__row', {'-headings': isHeading})}>
    {children}
  </div>
);

export default Row;