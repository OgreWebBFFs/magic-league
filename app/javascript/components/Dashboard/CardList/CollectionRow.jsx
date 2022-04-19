import React from 'react';

const CollectionRowCell = ({ children }) => <div className='dashboard_card-view__cell'>{children}</div>

const CollectionRow = ({ children }) => (
  <div className="dashboard_card-view__row">
    {React.Children.map(children, child => <CollectionRowCell>{child}</CollectionRowCell>)}
  </div>
);

export default CollectionRow;
