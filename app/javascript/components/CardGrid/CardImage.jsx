import React, { useState } from 'react';
import classNames from 'classnames';

// const Foiled = ({ children }) => <div className="card-grid__card--image-foiled">{children}</div>;
// const NonFoiled = ({ children }) => children;

const CardImage = ({ name, imageUrl, foiled, backImageUrl }) => {
//   const Wrapper = foiled ? Foiled : NonFoiled;
  const [flipped, setFlipped] = useState(false);
  return (
    // <Wrapper>
    <div style={{ position: 'relative' }}>
        <div style={{
              position: 'relative',
              transition: 'transform 0.6s',
              transformStyle: 'preserve-3d',
              ...(flipped ? {transform: 'rotateY(180deg)'} : {}),
        }}>
            <img className="card-grid__card--image front" alt={name} title={name} src={imageUrl} />
            {backImageUrl && (
                <img className="card-grid__card--image back" alt={name} title={name} src={backImageUrl} />
            )} 
        </div>
        {backImageUrl && (
            <button type='button' onClick={(e) => {
                e.preventDefault();
                setFlipped(!flipped);
            }} className={classNames('card-grid__card--image-flipper', { flipped })} >
                <i style={{ fontSize: '2rem' }} className="fas fa-sync" />
            </button>
        )}
    </div>
    // </Wrapper>
  );
};

export default CardImage;
