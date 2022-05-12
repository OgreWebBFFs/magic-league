import React, {useState} from 'react';
import { useUpdateEffect } from 'react-use';
import classNames from 'classnames';

import Button from '../Button';
import Collection from './Collection';
import Wishlist from './Wishlist';
import Trades from './Trades';

import { ActionBar, EditAction, ViewToggle } from './ActionBar';

import WishlistContext from '../../contexts/WishlistContext';
import TradablesContext from '../../contexts/TradablesContext';

const InterfaceTab = ({ children, activeTab, setActiveTab, title }) => (
  <Button className={classNames('dashboard__tab', 'button--inverse', {'active':activeTab === title})} onClick={() => setActiveTab(title)}>
    {title}
    {children}
  </Button>
);

const Tabs = {
  collection: {
    view: (props) => <Collection {...props} />,
    notification: () => false,
    actions: ['view-toggle', 'edit'],
  },
  wishlist: {
    view: (props) => <Wishlist {...props} />,
    notification: () => false,
    actions: ['view-toggle'],
  },
  trades: {
    view: (props) => <Trades {...props} />,
    notification: ({ trades, currentUserId }) => trades.some(({ data: { attributes }}) => (
      attributes.to.id === currentUserId && attributes.status === 'pending'
    )),
    actions: []
  }
};

const Dashboard = (props) => {
  const startingTab = history.state?.currentTab || window.location.hash.substring(1) || "collection";
  const [activeTab, setActiveTab] = useState(startingTab);
  const [tradables, setTradables] = useState(props.tradables);
  const [wishlist, setWishlist] = useState(props.wishlist);
  const [currentUserWishlist, setCurrentUserWishlist] = useState(props.currentUserWishlist);
  const [isListView, setIsListView] = useState(history.state?.currentView === undefined || history.state?.currentView);

  useUpdateEffect(() => {
    const url = `#${activeTab}`;
    history.replaceState({turbolinks: true, url, currentTab: activeTab, currentView: isListView}, '', url);
  }, [activeTab, isListView])
  
  return (
   <div className="dashboard__card-interface-wrapper">
    <div className="dashboard__tab-wrapper">
      {Object.keys(Tabs).map(tabName => (
          <InterfaceTab key={tabName} activeTab={activeTab} setActiveTab={setActiveTab} title={tabName}>
            {Tabs[tabName].notification(props) && (<i class="fas fa-exclamation-circle notification"></i>)}
          </InterfaceTab>
      ))}
    </div>
    <ActionBar actions={Tabs[activeTab].actions}>
      <ViewToggle key={"view-toggle"} isListView={isListView} setIsListView={setIsListView} />
      <EditAction key={"edit"} canEdit={props.edit} userId={props.user.id} />
    </ActionBar>
    <div className="dashboard__card-view">
      <TradablesContext.Provider value={{ tradables, setTradables }}>
        <WishlistContext.Provider 
          value={{ 
            wishlist,
            setWishlist,
            currentUserWishlist,
            setCurrentUserWishlist
          }}
        >
          {Tabs[activeTab].view({ ...props, isListView})}
        </WishlistContext.Provider>
      </TradablesContext.Provider>
    </div>
 </div>)
}
export default Dashboard;
