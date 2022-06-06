import React from 'react';
import Dashboard from '../Dashboard';
import TradeTracker from '../TradeTracker';

const UserDispaly = ({
  collectionCards,
  collectionId,
  currentUserId,
  currentUserWishlist,
  edit,
  gravatar,
  tradables,
  trades,
  tradeTrackerData,
  user,
  wishlist,
}) => (
  <div id="dashboard" className="dashboard">
    <div className="dashboard__container">
      <h2 className="dashboard__title">{user.name}</h2>
      <div className="dashboard-profile">
        <div className="dashboard-profile__user-details">
          <img alt="profile" className="user-image" src={gravatar} />
          {edit && <a className="dashboard-profile__edit-button button" href={`/users/${user.id}/edit`}>Edit Account</a>}
        </div>
        <TradeTracker
          userId={user.id}
          currentUserId={currentUserId}
          tradeTrackerData={tradeTrackerData}
        />
      </div>
      <Dashboard
        currentUserId={currentUserId}
        user={user}
        edit={edit}
        currentUserWishlist={currentUserWishlist}
        collectionCards={collectionCards}
        collectionId={collectionId}
        tradables={tradables}
        wishlist={wishlist}
        trades={trades}
      />
    </div>
  </div>
);

export default UserDispaly;