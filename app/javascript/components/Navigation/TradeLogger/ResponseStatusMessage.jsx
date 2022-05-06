import React, { useEffect, useState } from 'react';

const SuccessMessage = () => <p>Success! Your trade proposal has been processed</p>;

const ErrorMessage = ({ issues }) => (
  <>
    <p>There was an issue with the following cards in your trade request:</p>
    <ul>
      {issues.map(issue => <li>
        <p style={{margin: 0}}>{issue.card}</p>
        <p style={{fontSize: '.5rem', color: "lightgrey"}}>{issue.player} has {issue.reason}</p>
        </li>)}
    </ul>
    <p>Please ensure all cards are available within that player's collection before proposing a trade.</p>
  </>
)

const ResponseStatusMessage = ({ status, invalid_trade_targets }) => {
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    setVisibility(status !== undefined)
    setTimeout(() => {
      setVisibility(false);
    }, 8000);
  }, [status]);

  return (<>
    {visibility && (
      status === 'success' ? <SuccessMessage /> : <ErrorMessage issues={invalid_trade_targets} />
    )}
  </>)
}

export default ResponseStatusMessage;