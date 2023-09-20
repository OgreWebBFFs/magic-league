import React from 'react';

const Foiled = ({ children }) => <div className="card-grid__card--image-foiled">{children}</div>;
const NonFoiled = ({ children }) => children;

const CardImage = ({ name, imageUrl, foiled }) => {
  const Wrapper = foiled ? Foiled : NonFoiled;
  return (
    <Wrapper>
      <img className="card-grid__card--image" alt={name} title={name} src={imageUrl} />
    </Wrapper>
  );
};

export default CardImage;
