import React from "react";

const CyclingBackground = ({ bgPath, eventBgPath }) => {
    return <div className="cycling-background" style={{ backgroundImage: `url('${bgPath}')` }} />;
};

export default CyclingBackground;
