import React from 'react';
import Button from '../../../../../Button';

const FilterDrawerToggle = ({
  onClick,
  isOpen,
  selectedOptions,
  targetFilter,
}) => {
  const selectionsForTargetFilter = selectedOptions.filter(
    (selectedOption) => targetFilter.options.find((option) => option.id === selectedOption),
  );
  const hasSelections = selectionsForTargetFilter.length > 0;
  return (
    <Button
      type="button"
      className="filter__option-group-toggle button--secondary"
      onClick={onClick}
    >
      {`${targetFilter.facetName.toUpperCase()}${hasSelections ? ` (${selectionsForTargetFilter.length})` : ''}`}
      <i className={`fas fa-caret-${isOpen ? 'up' : 'down'}`} />
      <div className="filter__option-group-toggle--actives">
        {selectionsForTargetFilter.join(', ')}
      </div>
    </Button>
  );
};

export default FilterDrawerToggle;
