import React from 'react';
import Button from '../../../Button';

const EditAction = ({ collectionId }) => (
  <Button className="dashboard__cards-action" href={`/collections/${collectionId}/edit`}>Edit</Button>
);

export default EditAction;
