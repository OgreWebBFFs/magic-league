import React, { useState } from 'react';
import useIsSeasonView from '../../../helpers/hooks/use-is-season-view';
import ViewToggleSwitch from '../../ViewToggleSwitch';
import Button from '../../Button';
import HeadToHeadLogger from './HeadToHeadLogger';
import MultiplayerMatchLogger from './MultiplayerLogger';

const MatchLogger = ({ unlockedUsers, currentUserId }) => {
  const [isSeasonView] = useIsSeasonView();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form id="match-form" action="/matches" acceptCharset="UTF-8" method="post" onSubmit={() => setIsSubmitting(true)}>
      <h3>Log Match</h3>
      <ViewToggleSwitch name="match-type" />
      {isSeasonView
        ? <HeadToHeadLogger unlockedUsers={unlockedUsers} currentUserId={currentUserId} />
        : <MultiplayerMatchLogger unlockedUsers={unlockedUsers} currentUserId={currentUserId} />}
      <Button type="submit" className="drawer_submit__button" disabled={isSubmitting}>{`Submit${isSubmitting ? 'ing...' : ''}`}</Button>
    </form>
  );
};

export default MatchLogger;
