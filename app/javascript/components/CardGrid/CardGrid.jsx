import React from "react";

const CardGrid = ({ children }) => (
    <div id="collection-grid" className="card-grid collection__togglable-view">
        {React.Children.map(children, (child) =>
            child ? (
                <div className="card-grid__card__wrapper">
                    <div className="card-grid__card">{child}</div>
                </div>
            ) : null
        )}
    </div>
);

export default CardGrid;
