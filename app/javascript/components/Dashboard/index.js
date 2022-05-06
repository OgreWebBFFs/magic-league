import React, {useState} from 'react';
import { useUpdateEffect } from 'react-use';
import classNames from 'classnames';

import Button from '../Button';
import Collection from './Collection';
import Wishlist from './Wishlist';
import Trades from './Trades';

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

const Dashboard = (props) => {
  const [activeTab, setActiveTab] = useState(getCurrentTabFromUrlHash() || "collection");
  const [tradables, setTradables] = useState(props.tradables);
  const [wishlist, setWishlist] = useState(props.wishlist);
  const [currentUserWishlist, setCurrentUserWishlist] = useState(props.currentUserWishlist);
  const [isListView, setIsListView] = useState(true);

  const Tabs = {
    collection: (props) => <Collection {...props} isListView={isListView}/>,
    wishlist: (props) => <Wishlist {...props}  isListView={isListView}/>,
    trades: (props) => <Trades {...props} isListView={isListView} />,
  };

  useUpdateEffect(() => {
    history.replaceState(undefined, undefined ,`#${activeTab}`);
  }, [activeTab])
  
  return (
   <div className="dashboard__card-interface-wrapper">
    <div className="dashboard__tab-wrapper">
      {Object.keys(Tabs).map(tabName => (
        <InterfaceTab key={tabName} activeTab={activeTab} setActiveTab={setActiveTab} title={tabName}/>
      ))}
    </div>
    <div className="dashboard__action-bar">    
        <div className="dashboard__card-view-toggles">
          <Button id="collection-table-toggle" className={classNames('dashboard__card-view-toggle', {"button--inactive": !isListView})} onClick={() => setIsListView(true)}>
            <i className="fas fa-list"></i>
          </Button>
          <Button id="collection-grid-toggle" className={classNames('dashboard__card-view-toggle', {"button--inactive": isListView})} onClick={() => setIsListView(false)}>
            <i className="fas fa-th-large"></i>
          </Button>
        </div>
        {props.edit && (
          <>
            <Button className="dashboard__cards-action" href={`/collections/${props.user.id}/edit`}>Edit</Button>
            <Button className="dashboard__cards-action" href={`/collections/${props.user.id}/bulk_edit`}>Bulk Edit</Button>
          </>
        )}
      </div>
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
          {Tabs[activeTab](props)}
        </WishlistContext.Provider>
      </TradablesContext.Provider>
    </div>
 </div>)
}
export default Dashboard;
