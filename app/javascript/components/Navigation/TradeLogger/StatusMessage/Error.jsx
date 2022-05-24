import React from 'react';

const Error = ({ invalidTradeTargets }) => (
  <>
    <p className="trade-logger__status-title error">Problems with Trade Offer:</p>
    <ul>
      {invalidTradeTargets.map((issue) => (
        <li key={`${issue.card}-${issue.player}-${issue.reason}`} className="trade-logger__status-issue">
          <p className="trade-logger__status-issue-name">{issue.card}</p>
          <p className="trade-logger__status-issue-reason">
            {issue.player}
            {' '}
            has
            {' '}
            {issue.reason}
          </p>
        </li>
      ))}
    </ul>
  </>
);

export default Error;
