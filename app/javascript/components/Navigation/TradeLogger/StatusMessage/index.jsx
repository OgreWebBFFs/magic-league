import React from 'react';
import Success from './Success';
import Error from './Error';
import Invalid from './Invalid';

const Message = {
  success: Success,
  error: Error,
  invalid: Invalid,
};

const ResponseStatusMessage = ({ status, invalidTradeTargets }) => (
  <div className="trade-logger__status">
    {Message[status]({ invalidTradeTargets })}
  </div>
);

export default ResponseStatusMessage;
