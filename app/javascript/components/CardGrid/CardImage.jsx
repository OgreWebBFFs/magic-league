import React from 'react';

const CardImage = ({name, imageUrl}) => (
  <img  className="card-grid__card--image" alt={name} title={name} src={imageUrl}/>
);

export default CardImage;