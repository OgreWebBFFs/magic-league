import React from "react";
import Dashboard from "./Dashboard";
import TradeTracker from "./TradeTracker";

const UserDisplay = ({
    collection,
    collectionId,
    currentUserId,
    currentUserWishlist,
    edit,
    gravatar,
    trades,
    tradeTrackerData,
    user,
    wishlist,
    messageStatuses,
}) => {
    return (
        <div id="dashboard" className="dashboard">
            <div className="dashboard__container">
                <div className="dashboard-header">
                    <h1 className="dashboard-header__title">
                        {user.name}
                        {user.pronouns && <span className="dashboard-header__pronouns">{`(${user.pronouns})`}</span>}
                    </h1>
                    {user.discord_username && (
                        <div className="dashboard-header__discord">
                            <i className="fab fa-discord" />
                            <span className="dashboard-header__discord--username">{`@${user.discord_username}`}</span>
                        </div>
                    )}
                </div>
                <div className="dashboard-profile">
                    <div className="dashboard-profile__user-details">
                        <img alt="profile" className="user-image" src={gravatar} />
                        {edit && (
                            <a className="dashboard-profile__edit-button button" href={`/users/${user.id}/edit`}>
                                Edit Account
                            </a>
                        )}
                    </div>
                    <TradeTracker userId={user.id} currentUserId={currentUserId} tradeTrackerData={tradeTrackerData} />
                </div>
                <div className="dashboard__card-interface-wrapper">
                    <Dashboard
                        currentUserId={currentUserId}
                        user={user}
                        edit={edit}
                        currentUserWishlist={currentUserWishlist}
                        collection={collection}
                        collectionId={collectionId}
                        wishlist={wishlist}
                        trades={trades}
                        messageStatuses={messageStatuses}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserDisplay;
