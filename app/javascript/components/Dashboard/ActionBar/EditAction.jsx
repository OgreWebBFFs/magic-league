import React from 'react';
import Button from '../../Button';

const EditAction = ({ canEdit, userId }) => (canEdit && (
      <>
        <Button className="dashboard__cards-action" href={`/collections/${userId}/edit`}>Edit</Button>
        <Button className="dashboard__cards-action" href={`/collections/${userId}/bulk_edit`}>Bulk Edit</Button>
      </>
));

export default EditAction