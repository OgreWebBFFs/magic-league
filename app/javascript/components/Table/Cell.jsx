import React from 'react';
import classNames from 'classnames';

const applySize = size => (size ? {
  flex: `0 0 ${size}`,
} : {});

const Cell = ({ children, isPriority, size }) => (
  <div 
    className={classNames('__cell', {'-priority': isPriority})}
    style={applySize(size)}
  >
    {children}
  </div>
);

export default Cell;