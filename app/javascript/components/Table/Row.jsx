import React from 'react';
import classNames from 'classnames';

const Row = ({ className, children, isHeading }) => (
  <div className={classNames('row', { 'row--headings': isHeading }, className)}>
    {children}
  </div>
);

export default Row;
