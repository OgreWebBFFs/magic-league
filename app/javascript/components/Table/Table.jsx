import React from 'react';

const Table = ({ children, className }) => (
  <div className={`__table ${className}`}>
    {children}
  </div>
);

export default Table;