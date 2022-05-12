import React from 'react';
import classNames from 'classnames';
import Button from '../../Button';

const ViewToggle = ({ isListView, setIsListView }) => (
  <div className="dashboard__card-view-toggles">
    <Button id="collection-table-toggle" className={classNames('dashboard__card-view-toggle', {"button--inactive": !isListView})} onClick={() => setIsListView(true)}>
      <i className="fas fa-list"></i>
    </Button>
    <Button id="collection-grid-toggle" className={classNames('dashboard__card-view-toggle', {"button--inactive": isListView})} onClick={() => setIsListView(false)}>
      <i className="fas fa-th-large"></i>
    </Button>
  </div>
);

export default ViewToggle;