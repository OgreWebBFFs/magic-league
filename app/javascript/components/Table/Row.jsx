import React from 'react';
import classNames from 'classnames';

const Row = ({ children, isHeading }) => (
  <div className={classNames('row', {'row--headings': isHeading})}>
    {children}
  </div>
);

export default Row;