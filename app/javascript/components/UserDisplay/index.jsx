import React, { useState } from 'react';
import Dashboard from './Dashboard';
import TradeTracker from './TradeTracker';
import ToggleSwitch from '../ToggleSwitch';
import Objectives from './Objectives';
import EventPerformanceTracer from './EventPerformanceTracker';

const UserDispaly = ({
  activeObjectives,
  collectionCards,
  collectionId,
  completedObjectives,
  currentUserId,
  currentUserWishlist,
  edit,
  eventRanking,
  gravatar,
  objectiveRerolls,
  tradables,
  trades,
  tradeTrackerData,
  user,
  wishlist,
}) => {
  const [seasonDisplay, setSeasonDisplay] = useState(true);

  return (
    <div id="dashboard" className="dashboard">
      <div className="dashboard__container">
        <div className="dashboard-header">
          <h2 className="dashboard-header__title">{user.name}</h2>
          <ToggleSwitch
            name="display-type"
            value={seasonDisplay}
            onChange={() => setSeasonDisplay(!seasonDisplay)}
            optionA="Season"
            optionB="Event"
          />
        </div>
        <div className="dashboard-profile">
          <div className="dashboard-profile__user-details">
            <img alt="profile" className="user-image" src={gravatar} />
            {edit && <a className="dashboard-profile__edit-button button" href={`/users/${user.id}/edit`}>Edit Account</a>}
          </div>
          { seasonDisplay ? (
            <TradeTracker
              userId={user.id}
              currentUserId={currentUserId}
              tradeTrackerData={tradeTrackerData}
            />
          ) : (
            <EventPerformanceTracer
              eventRanking={eventRanking}
            />
          )}
        </div>
        <div className="dashboard__card-interface-wrapper">
          { seasonDisplay ? (
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
          ) : (
            <Objectives
              activeObjectives={activeObjectives}
              completedObjectives={completedObjectives}
              objectiveRerolls={objectiveRerolls}
              currentUserId={currentUserId}
              user={user}
              edit={edit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDispaly;
