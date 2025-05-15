import React from "react";
import Success from "./Success";
import Error from "./Error";
import Invalid from "./Invalid";

const Message = {
    success: Success,
    error: Error,
    invalid: Invalid,
};

const ResponseStatusMessage = ({ status, errors }) => (
    <div className="trade-logger__status">{Message[status]({ errors })}</div>
);

export default ResponseStatusMessage;
