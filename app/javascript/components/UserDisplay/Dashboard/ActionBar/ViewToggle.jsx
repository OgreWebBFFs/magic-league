import React from 'react';
import Button from '../../../Button';

const ViewToggle = ({ setIsListView }) => (
  <div className="dashboard__card-view-toggles">
    <Button id="collection-table-toggle" className='dashboard__card-view-toggle' onClick={() => setIsListView(true)}>
      <i className="fas fa-list" />
    </Button>
    <Button id="collection-grid-toggle" className='dashboard__card-view-toggle'  onClick={() => setIsListView(false)}>
      <i className="fas fa-th-large" />
    </Button>
  </div>
);

export default ViewToggle;
