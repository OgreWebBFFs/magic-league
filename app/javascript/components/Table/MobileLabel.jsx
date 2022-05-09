import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useWindowSize } from 'react-use';

const MobileLabel = ({children, className}) => {
  const [isMobile, setIsMobile] = useState(true);
  
  const {width} = useWindowSize();
  
  useEffect(()=>{
    setIsMobile(width<=850)
  }, [width])

  return isMobile ? <span className={classNames("cell-label", className)}>{children}</span> : null;
}

export default MobileLabel;