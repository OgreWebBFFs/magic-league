import React, { useState } from 'react';
import ToggleSwitch from '../../ToggleSwitch';

const MatchLogger = () => {
  const [shouldShowH2H, setShouldShowH2H] = useState(true);

  return (
    <form id="match-logger" action="/matches" acceptCharset="UTF-8" method="post">
      <h3>Log Match</h3>
      <ToggleSwitch name="match-type" value={shouldShowH2H} onChange={() => setShouldShowH2H(!shouldShowH2H)} />
      {shouldShowH2H ? 'H2H Form' : 'Multi Form'}
    </form>
  );
}

export default MatchLogger;
