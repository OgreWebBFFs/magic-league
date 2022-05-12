import React from 'react';

const getActionIdFromKey = key => key.substring(2);

const ActionBar = ({ children, actions }) => {
  return (
    <div className="dashboard__action-bar">    
      {React.Children.toArray(children).filter(child => actions.includes(getActionIdFromKey(child.key)))}
    </div>
  );
}

export default ActionBar;