import React from 'react';
import Button from '../../../Button';

const EditAction = ({ canEdit, collectionId }) => (canEdit && (
<>
  <Button className="dashboard__cards-action" href={`/collections/${collectionId}/edit`}>Edit</Button>
  <Button className="dashboard__cards-action" href={`/collections/${collectionId}/bulk_edit`}>Bulk Edit</Button>
</>
));

export default EditAction;
