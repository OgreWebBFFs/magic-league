import React from 'react';
import useIsSeasonView from '../../helpers/hooks/use-is-season-view';
import Dashboard from './Dashboard';
import TradeTracker from './TradeTracker';
import ViewToggleSwitch from '../ViewToggleSwitch';
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
  const [isSeasonView] = useIsSeasonView();

  return (
    <div id="dashboard" className="dashboard">
      <div className="dashboard__container">
        <div className="dashboard-header">
          <h1 className="dashboard-header__title">
            {user.name}
            {user.pronouns
              && (
                <span className="dashboard-header__pronouns">
                  {`(${user.pronouns})`}
                </span>
              )}
          </h1>
          {user.discord_username && (
            <div className="dashboard-header__discord">
              <i className="fab fa-discord" />
              <span className="dashboard-header__discord--username">
                {`@${user.discord_username}`}
              </span>
            </div>
          )}
          <ViewToggleSwitch name="display-type" />
        </div>
        <div className="dashboard-profile">
          <div className="dashboard-profile__user-details">
            <img alt="profile" className="user-image" src={gravatar} />
            {edit && <a className="dashboard-profile__edit-button button" href={`/users/${user.id}/edit`}>Edit Account</a>}
          </div>
          { isSeasonView ? (
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
          { isSeasonView ? (
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
