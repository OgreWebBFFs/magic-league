import React, { useEffect, useState } from 'react';

const SuccessMessage = () => <p>Success! Your trade proposal has been processed</p>;

const ErrorMessage = ({ cards }) => (
  <>
    <p>There was an issue with the following cards in your trade request:</p>
    <ul>
      {cards.map(card => <li>{card}</li>)}
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
      status === 'success' ? <SuccessMessage /> : <ErrorMessage cards={invalid_trade_targets} />
    )}
  </>)
}

export default ResponseStatusMessage;