import React from 'react';
import { CardImage } from '../../../CardGrid';
import Button from '../../../Button';

const PrintViewer = ({ prize, imgRef, onEdit, onDelete }) => (
  <>
    <div ref={imgRef}>
      <CardImage
        key={prize.id}
        name={prize.name}
        imageUrl={prize.image}
        foiled={prize.foiled}
      />
    </div>
    <Button onClick={() => onEdit(true)}>
      <i className="fas fa-edit" />
      EDIT
    </Button>
    <Button onClick={() => onDelete(prize)}>
      <i className="fas fa-trash" />
      DELETE
    </Button>
  </>
);

export default PrintViewer;

