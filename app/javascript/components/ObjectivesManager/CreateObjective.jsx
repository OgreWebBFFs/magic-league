import React from 'react';
import Button from '../Button';
import xhrRequest from '../../helpers/xhr-request';

const createObjective = async (e) => {
  e.preventDefault();
  await xhrRequest({
    url: '/admin/objectives',
    options: {
      body: JSON.stringify({ description: e.target[0].value }),
      method: 'POST',
    },
  });
  window.location.reload();
};

const CreateObjective = () => (
  <form onSubmit={createObjective} className="objectives-manager__create-objective">
    <input
      type="text"
      name="description"
      placeholder="Create new objective..."
      required="required"
      className="objectives-manager__create-objective--description-input"
    />
    <Button type="submit">
      <i className="fas fa-plus" />
    </Button>
  </form>
);

export default CreateObjective;
