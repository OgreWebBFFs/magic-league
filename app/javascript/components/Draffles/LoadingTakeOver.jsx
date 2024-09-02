import React, { useEffect } from 'react';
import LoadingIcon from '../Icons/LoadingIcon';

const LoadingTakeOver = () => {
  
  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, []);

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '200',
    }}>
      <LoadingIcon />
    </div>
  )  
}

export default LoadingTakeOver;
