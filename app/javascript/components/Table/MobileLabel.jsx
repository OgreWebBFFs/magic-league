import React from 'react';
import classNames from 'classnames';
import useIsMobile from '../../helpers/hooks/use-is-mobile';

const MobileLabel = ({children, className}) => {
  const isMobile = useIsMobile();

  return isMobile ? <span className={classNames("cell-label", className)}>{children}</span> : null;
}

export default MobileLabel;