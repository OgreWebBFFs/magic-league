/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useState, useEffect } from 'react';
import { useUpdateEffect } from 'react-use';
import classNames from 'classnames';

import Button from '../../Button';
import { ActionBar, EditAction, ViewToggle } from './ActionBar';

import WishlistContext from '../../../contexts/WishlistContext';
import TradablesContext from '../../../contexts/TradablesContext';

const InterfaceTab = ({
  children, activeTab, setActiveTab, title,
}) => (
  <Button className={classNames('dashboard__tab', 'button--inverse', { active: activeTab === title })} onClick={() => setActiveTab(title)}>
    {title}
    {children}
  </Button>
);

const Dashboard = ({
  tradables: initialTradables,
  wishlist: initialWishlist,
  currentUserWishlist: initialCurrentUserWishlist,
  edit,
  collectionId,
  tabs,
  ...props
}) => {
  const windowHistory = window.history.state || {};
  const startingTab = windowHistory.currentTab
    || window.location.hash.substring(1)
    || Object.keys(tabs)[0];
  const startingView = windowHistory.currentView === undefined || windowHistory.currentView;

  const [activeTab, setActiveTab] = useState(startingTab);
  const [isListView, setIsListView] = useState(startingView);

  const [tradables, setTradables] = useState(initialTradables);
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [currentUserWishlist, setCurrentUserWishlist] = useState(initialCurrentUserWishlist);

  const tradablesContextValues = useMemo(() => ({
    tradables, setTradables,
  }), [tradables]);

  const wishlistContextValues = useMemo(() => ({
    wishlist, setWishlist, currentUserWishlist, setCurrentUserWishlist,
  }), [wishlist, currentUserWishlist]);

  useUpdateEffect(() => {
    const url = `#${activeTab}`;
    window.history.replaceState({
      turbolinks: true, url, currentTab: activeTab, currentView: isListView,
    }, '', url);
  }, [activeTab, isListView]);

  useEffect(() => {
    if (!tabs[activeTab]) {
      setActiveTab(Object.keys(tabs)[0]);
    }
  }, [tabs]);

  return (
    <div className="dashboard__card-interface-wrapper">
      <div className="dashboard__tab-wrapper">
        {Object.keys(tabs).map((tabName) => (
          <InterfaceTab
            key={tabName}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            title={tabName}
          >
            {tabs[tabName].notification(props) && (<i className="fas fa-exclamation-circle notification" />)}
          </InterfaceTab>
        ))}
      </div>
      <ActionBar actions={(tabs[activeTab] || Object.values(tabs)[0]).actions}>
        <ViewToggle key="view-toggle" isListView={isListView} setIsListView={setIsListView} />
        <EditAction key="edit" canEdit={edit} collectionId={collectionId} />
      </ActionBar>
      <div className="dashboard__card-view">
        <TradablesContext.Provider value={tradablesContextValues}>
          <WishlistContext.Provider value={wishlistContextValues}>
            {(tabs[activeTab] || Object.values(tabs)[0]).view({ ...props, isListView })}
          </WishlistContext.Provider>
        </TradablesContext.Provider>
      </div>
    </div>
  );
};
export default Dashboard;
