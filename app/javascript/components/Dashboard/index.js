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

const InterfaceTab = ({ activeTab, setActiveTab, title }) => (
  <Button className={classNames('dashboard__tab', 'button--inverse', {'active':activeTab === title})} onClick={() => setActiveTab(title)}>
    {title}
  </Button>
);

const getCurrentTabFromUrlHash = () => (
  window.location.hash.substring(1) 
)

const Tabs = {
  collection: {
    view: (props) => <Collection {...props} />,
    actions: ['view-toggle', 'edit'],
  },
  wishlist: {
    view: (props) => <Wishlist {...props} />,
    actions: ['view-toggle'],
  },
  trades: {
    view: (props) => <Trades {...props} />,
    actions: []
  }
};

const Dashboard = (props) => {
  const [activeTab, setActiveTab] = useState(getCurrentTabFromUrlHash() || "collection");
  const [tradables, setTradables] = useState(props.tradables);
  const [wishlist, setWishlist] = useState(props.wishlist);
  const [currentUserWishlist, setCurrentUserWishlist] = useState(props.currentUserWishlist);
  const [isListView, setIsListView] = useState(true);

  useUpdateEffect(() => {
    const url = `${window.location.pathname}#${activeTab}`;
    history.replaceState({turbolinks: true, url}, '', url);
  }, [activeTab])
  
  return (
   <div className="dashboard__card-interface-wrapper">
    <div className="dashboard__tab-wrapper">
      {Object.keys(Tabs).map(tabName => (
        <InterfaceTab key={tabName} activeTab={activeTab} setActiveTab={setActiveTab} title={tabName}/>
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
