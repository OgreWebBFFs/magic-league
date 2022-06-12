import React from 'react';
import useIsSeasonView from '../../../helpers/hooks/use-is-season-view';
import ViewToggleSwitch from '../../ViewToggleSwitch';
import HeadToHeadLogger from './HeadToHeadLogger';
import MultiplayerMatchLogger from './MultiplayerLogger';

const MatchLogger = ({ unlockedUsers, currentUserId }) => {
  const [isSeasonView] = useIsSeasonView();

  return (
    <form id="match-form" action="/matches" acceptCharset="UTF-8" method="post">
      <h3>Log Match</h3>
      <ViewToggleSwitch name="match-type" />
      {isSeasonView
        ? <HeadToHeadLogger unlockedUsers={unlockedUsers} currentUserId={currentUserId} />
        : <MultiplayerMatchLogger unlockedUsers={unlockedUsers} currentUserId={currentUserId} />}
    </form>
  );
};

export default MatchLogger;
