import React from "react";

const Error = ({ errors }) => (
    <>
        <p className="trade-logger__status-title error">Problems with Trade Offer:</p>
        <ul>
            {errors.map((issue) => (
                <li key={`${issue.card}-${issue.player}-${issue.reason}`} className="trade-logger__status-issue">
                    {issue}
                </li>
            ))}
        </ul>
    </>
);

export default Error;
