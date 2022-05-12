import React, { useEffect, useState } from "react";
import Success from "./Success";
import Error from "./Error";
import Invalid from "./Invalid";

const Message = {
  "success": Success,
  "error": Error,
  "invalid": Invalid,
}

const ResponseStatusMessage = ({ status, invalid_trade_targets, onDisappear }) => {

  // useEffect(() => {
  //   setTimeout(() => {
  //     onDisappear();
  //   }, 12000);
  // });

  return (<div className="trade-logger__status">
      {Message[status](invalid_trade_targets)}
    </div>);
    
}

export default ResponseStatusMessage;