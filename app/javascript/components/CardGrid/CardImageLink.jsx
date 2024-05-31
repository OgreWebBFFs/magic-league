/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import CardImage from './CardImage';

const CardImageLink = ({
  card: {
    name,
    id,
    // mana_cost: manaCost,
    // type_line: typeLine,
    image_url: imgUrl,
    back_image_url: backImgUrl
  },
}) => (
  <a className="card-grid__card--link" href={`/cards/${id}`}>
    {/* <div className="card-grid__card--placeholder">
      <p className="card-grid__card--attribute">{name}</p>
      <p className="card-grid__card--attribute">
        CMC:
        {manaCost}
      </p>
      <p className="card-grid__card--attribute">{typeLine}</p>
    </div> */}
    <CardImage name={name} imageUrl={imgUrl} backImageUrl={backImgUrl} />
  </a>
);

export default CardImageLink;
