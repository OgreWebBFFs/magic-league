import React, {useState} from 'react';
import Collection from './Collection';
import Wishlist from './Wishlist';
import WishlistContext from '../../contexts/WishlistContext';
import TradablesContext from '../../contexts/TradablesContext';

const InterfaceTab = ({ activeTab, setActiveTab, title }) => (
  <div className={`dashboard_card-interface_tab__btn ${activeTab === title ? 'active' : ''}`} onClick={() => setActiveTab(title)}>
    {title}
  </div>
);

const Tabs = {
  Collection: (props) => <Collection {...props} />,
  Wishlist: (props) => <Wishlist {...props} />,
};

const Dashboard = (props) => {
  const [activeTab, setActiveTab] = useState("Collection");
  const [tradables, setTradables] = useState(props.tradables);
  const [wishlist, setWishlist] = useState(props.wishlist);
  return (
   <div className="dashboard_card-interface__wrapper">
    <div className="dashboard_card-interface_tab__wrapper">
      {Object.keys(Tabs).map(tabName => (
        <InterfaceTab activeTab={activeTab} setActiveTab={setActiveTab} title={tabName}/>
      ))}
    </div>
    <div className="dashboard_card-interface dashboard_card-view">
      <TradablesContext.Provider value={{ tradables, setTradables }}>
        <WishlistContext.Provider value={{ wishlist, setWishlist }}>
          {Tabs[activeTab](props)}
        </WishlistContext.Provider>
      </TradablesContext.Provider>
    </div>
 </div>)
}
export default Dashboard;
