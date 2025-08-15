import React from "react";

const KeeperButton = () => (
    <div
        style={{
            color: "var(--color-fill-negative)",
            width: "100%",
            display: "grid",
            placeItems: "center",
            fontSize: "1.25rem",
        }}
    >
        <i className="fas fa-slash" style={{ position: "absolute " }} />
        <i className="fas fa-exchange-alt" />
    </div>
);

export default KeeperButton;
