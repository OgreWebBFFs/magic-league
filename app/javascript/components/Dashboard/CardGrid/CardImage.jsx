import React from 'react';

const CardImage = ({name, id, mana_cost, type_line, image_url}) => (
  <a className="card-grid__card--link" href={`/cards/${id}`}>
    <div className="card-grid__card--placeholder">
      <p className="card-grid__card--attribute">{name}</p>
      <p className="card-grid__card--attribute">CMC: {mana_cost}</p>
      <p className="card-grid__card--attribute">{type_line}</p>
    </div>
    <img  className="card-grid__card--image" alt={name} title={name} src={image_url}/>
  </a>
);

export default CardImage;