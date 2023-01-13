import React, { useState } from 'react';
import Button from '../../../Button';
import Modal from '../../../Modal';

const FilterAction = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button className="dashboard__filter-action" onClick={() => setShowModal(true)}>
        <i className="fas fa-filter" />
        Filters
      </Button>
      {showModal && <Modal onClose={() => setShowModal(false)}>FILTERS OPEN</Modal>}
    </>
  );
};

export default FilterAction;
