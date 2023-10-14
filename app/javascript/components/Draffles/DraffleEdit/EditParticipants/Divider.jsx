import React from 'react';

const Divider = () => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ width: '2px', flex: '1 1 50%', background: '#335f5d', margin: '.5rem 0' }} />
    <i className="fas fa-arrow-right" style={{ color: 'green' }} />
    <i className="fas fa-arrow-left" style={{ color: 'red' }} />
    <div style={{ width: '2px', flex: '1 1 50%', background: '#335f5d', margin: '.5rem 0' }} />
  </div>
);

export default Divider;
