import React from 'react';
import classNames from 'classnames';

const applySize = size => (size ? {
  flexBasis: `${size}`,
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