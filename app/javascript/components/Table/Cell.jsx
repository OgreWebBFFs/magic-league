import React from 'react';
import classNames from 'classnames';

const Cell = ({ children, isPriority }) => (
  <div className={classNames('__cell', {'-priority': isPriority})}>
    {children}
  </div>
);

export default Cell;