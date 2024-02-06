import React, { useState } from 'react';
import { useMeasure } from 'react-use';
import PrintPicker from './PrintPicker';
import PrintViewer from './PrintViewer';

const PrizeEditor = ({ prize, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [measureRef, { width, height }] = useMeasure();

  const updatePrize = (cardAttr) => {
    onUpdate({
      ...prize,
      ...cardAttr,
    });
  };

  return (
    <div className='edit-prizes__card-view'>
      {editing ? (
        <PrintPicker
          prize={prize}
          imgHeight={height}
          imgWidth={width}
          onClose={() => setEditing(false)}
          onSave={(cardAttr) => updatePrize(cardAttr)}
        />
      ) : (
        <PrintViewer
          prize={prize}
          imgRef={measureRef}
          onEdit={() => setEditing(true)}
          onDelete={() => onDelete(prize)}
        />
      )}
    </div>
  );
};

export default PrizeEditor;
