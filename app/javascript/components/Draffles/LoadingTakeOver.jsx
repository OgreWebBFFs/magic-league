import React, { useEffect } from 'react';

const LoadingTakeOver = () => {
  
  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, []);

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      background: '#90909088',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '200',
    }}>
      <div className="lds-ring"><div /><div /><div /><div /></div>
    </div>
  )  
}

export default LoadingTakeOver;
