import React, { useState } from 'react';
import ToggleSwitch from '../../ToggleSwitch';
import HeadToHeadLogger from './HeadToHeadLogger';

const MatchLogger = ({ unlockedUsers, currentUserId }) => {
  const [shouldShowH2H, setShouldShowH2H] = useState(true);

  return (
    <form id="match-logger" action="/matches" acceptCharset="UTF-8" method="post">
      <h3>Log Match</h3>
      <ToggleSwitch
        name="match-type"
        value={shouldShowH2H}
        onChange={() => setShouldShowH2H(!shouldShowH2H)}
        optionA="Season"
        optionB="Event"
      />
      {shouldShowH2H ? <HeadToHeadLogger unlockedUsers={unlockedUsers} currentUserId={currentUserId} /> : 'Multi Form'}
    </form>
  );
}

export default MatchLogger;
