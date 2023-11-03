import React, { useState } from "react";
import { CardImage } from "../../../CardGrid";
import Button from "../../../Button";

const PrizeNameImageToggle = ({ prize }) => {
  const [showImage, setShowImage] = useState(false);
  return (
  <div className="prize-name-img-display">
    {showImage ? (
      <div className="img-wrapper">
        <CardImage 
          imageUrl={prize.image}
          foiled={prize.foiled}
        />
      </div>
    ) : prize.name }
    <Button onClick={() => setShowImage(!showImage)} className="name-image-toggle">
      <i className={`fas fa-${showImage ? 'font' : 'camera'}`} />
    </Button>
  </div>
)};

export default PrizeNameImageToggle;