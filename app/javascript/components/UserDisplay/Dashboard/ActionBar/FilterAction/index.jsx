import React, { useState } from 'react';
import Button from '../../../../Button';
import FiltersModal from './FiltersModal';
import filtersConfig from './filter-configs';

const FilterAction = ({ onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const updateFilterSelections = (newSelections) => {
    const mods = filtersConfig.map(
      (filterConfig) => filterConfig.options.filter(
        (filterOption) => newSelections.includes(filterOption.id),
      ).map( 
        (filterOption) => filterOption.criteria,
      ),
    ).filter(
      (modArr) => modArr.length > 0,
    );
    setSelectedFilters(newSelections);
    onUpdate(mods);
  };

  return (
    <>
      <Button className="dashboard__filter-action" onClick={() => setShowModal(true)}>
        <i className="fas fa-filter" />
        Filters
      </Button>
      {showModal && (
        <FiltersModal
          onClose={() => setShowModal(false)}
          onApply={updateFilterSelections}
          initialSelections={selectedFilters}
        />
      )}
    </>
  );
};

export default FilterAction;
