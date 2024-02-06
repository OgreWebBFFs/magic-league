import React from "react";
import classNames from "classnames";

const Cell = ({ className, children, isPriority }) => (
    <div className={classNames("cell", { "cell--priority": isPriority }, className)}>
        <div className="cell__overflow-wrapper">{children}</div>
    </div>
);

export default Cell;
