import React from 'react';


const CardList = ({ children }) => (
  <div id="collection-table" className="dashboard_card-interface__table collection__togglable-view">
    <div className="dashboard_card-view__row-headings">
      <div className="dashboard_card-view__cell">Card</div>
      <div className="dashboard_card-view__cell">Highlights</div> 
    </div>
    {children}
  </div>
);

export default CardList;
