import React from 'react';
import classNames from 'classnames';

const Row = ({
  className,
  children,
  isHeading,
  isTitle,
}) => (
  <div className={classNames('row', { 'row--headings': isHeading, 'row--title': isTitle }, className)}>
    {children}
  </div>
);

export default Row;
