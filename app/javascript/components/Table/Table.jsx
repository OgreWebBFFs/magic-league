import React from 'react';
import classNames from 'classnames';

const Table = ({ children, className }) => (
  <div className={classNames('table', className)}>
    {children}
  </div>
);

export default Table;
