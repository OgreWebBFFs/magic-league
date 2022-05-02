import React from 'react';
import classNames from 'classnames';

const Cell = ({ className, children, isPriority}) => (
  <div 
    className={classNames('cell', {'cell--priority': isPriority}, className)}
  >
    {children}
  </div>
);

export default Cell;