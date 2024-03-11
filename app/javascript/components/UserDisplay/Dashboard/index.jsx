/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import classNames from 'classnames';

import Button from '../../Button';
import {
  ActionBar,
  EditAction,
  FilterAction,
  ViewToggle,
} from './ActionBar';
import Collection from './Collection';
import Wishlist from './Wishlist';
import Trades from './Trades';

import WishlistContext from '../../../contexts/WishlistContext';
import TradablesContext from '../../../contexts/TradablesContext';
import useHashParams from '../../../helpers/hooks/use-hash-params';

const InterfaceTab = ({
  children, activeTab, setActiveTab, title,
}) => (
  <Button className={classNames('dashboard__tab button--secondary', { active: activeTab === title })} onClick={() => setActiveTab(title)}>
    {title}
    {children}
  </Button>
);

const Tabs = {
  collection: {
    view: (props) => <Collection {...props} />,
    notification: () => false,
    actions: ['view-toggle', 'edit', 'filter'],
  },
  wishlist: {
    view: (props) => <Wishlist {...props} />,
    notification: () => false,
    actions: ['view-toggle'],
  },
  trades: {
    view: (props) => <Trades {...props} />,
    notification: ({ trades, currentUserId }) => trades.some(({ data: { attributes } }) => (
      attributes.to.id === currentUserId && attributes.status === 'pending'
    )),
    actions: [],
  },
};

const Dashboard = ({
  tradables: initialTradables,
  wishlist: initialWishlist,
  currentUserWishlist: initialCurrentUserWishlist,
  edit,
  collectionId,
  tabs,
  objectiveRerolls,
  ...props
}) => {
  const [{
    tab: [ initialTab ] = [ 'collection'],
    view: [ initialView ] = [ 'list' ],
    ...hashParams
  }, updateHashParams] = useHashParams();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [isListView, setIsListView] = useState(initialView === 'list');

  const [tradables, setTradables] = useState(initialTradables);
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [currentUserWishlist, setCurrentUserWishlist] = useState(initialCurrentUserWishlist);

  const [viewModifiers, setViewModifiers] = useState([]);

  const tradablesContextValues = useMemo(() => ({
    tradables, setTradables,
  }), [tradables]);

  const wishlistContextValues = useMemo(() => ({
    wishlist, setWishlist, currentUserWishlist, setCurrentUserWishlist,
  }), [wishlist, currentUserWishlist]);

  useUpdateEffect(() => {
    updateHashParams({
      ...hashParams,
      tab: [activeTab],
      view: [isListView ? 'list' : 'grid'],
    });
  }, [activeTab, isListView]);

  return (
    <div data-preserve-scroll="true">
      <div className="dashboard__tab-wrapper">
        {Object.keys(Tabs).map((tabName) => (
          <InterfaceTab
            key={tabName}
            activeTab={activeTab}
            setActiveTab={(t) => {
              setActiveTab(t);
              setViewModifiers([]);
            }}
            title={tabName}
          >
            {Tabs[tabName].notification(props) && (<i className="fas fa-exclamation-circle notification" />)}
          </InterfaceTab>
        ))}
      </div>
      <ActionBar actions={Tabs[activeTab].actions}>
        <ViewToggle key="view-toggle" isListView={isListView} setIsListView={setIsListView} />
        <FilterAction key="filter" onUpdate={setViewModifiers} />
        { edit && <EditAction key="edit" collectionId={collectionId} /> }
      </ActionBar>
      <div className="dashboard__card-view">
        <TradablesContext.Provider value={tradablesContextValues}>
          <WishlistContext.Provider value={wishlistContextValues}>
            {Tabs[activeTab].view({ ...props, isListView, viewModifiers })}
          </WishlistContext.Provider>
        </TradablesContext.Provider>
      </div>
    </div>
  );
};
export default Dashboard;
