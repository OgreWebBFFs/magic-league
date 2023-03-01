import React, { useState } from 'react';
import useIsSeasonView from '../../../helpers/hooks/use-is-season-view';
import ViewToggleSwitch from '../../ViewToggleSwitch';
import Button from '../../Button';
import HeadToHeadLogger from './HeadToHeadLogger';
import MultiplayerMatchLogger from './MultiplayerLogger';

const MatchLogger = ({ unlockedUsers, currentUserId }) => {
  const [isSeasonView] = useIsSeasonView();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrorMsg, setValidationErrorMsg] = useState('');

  const formValidator = (e) => {
    setIsSubmitting(true);

    if (e.target[0].value === e.target[1].value) {
      setValidationErrorMsg('Cannot report a match between the same player');
      setIsSubmitting(false);
      e.preventDefault();
    }

    if (!/\d\d\d\d-\d\d-\d\d/.test(e.target[5].value) || !/\d\d:\d\d/.test(e.target[6].value)) {
      setValidationErrorMsg('Invalid date or time entry');
      setIsSubmitting(false);
      e.preventDefault();
    }
  };

  return (
    <form id="match-form" action="/matches" acceptCharset="UTF-8" method="post" onSubmit={formValidator}>
      <h3>Log Match</h3>
      <ViewToggleSwitch name="match-type" />
      {isSeasonView
        ? <HeadToHeadLogger unlockedUsers={unlockedUsers} currentUserId={currentUserId} />
        : <MultiplayerMatchLogger unlockedUsers={unlockedUsers} currentUserId={currentUserId} />}
      <Button type="submit" className="drawer_submit__button" disabled={isSubmitting}>{`Submit${isSubmitting ? 'ing...' : ''}`}</Button>
      {validationErrorMsg !== '' && (
        <div>
          {validationErrorMsg}
        </div>
      )}
    </form>
  );
};

export default MatchLogger;
