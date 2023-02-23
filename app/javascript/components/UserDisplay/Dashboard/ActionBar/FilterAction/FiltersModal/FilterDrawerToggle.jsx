import React from 'react';

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
    <button
      type="button"
      className="filter__option-group-toggle"
      onClick={onClick}
    >
      {`${targetFilter.facetName.toUpperCase()}${hasSelections ? ` (${selectionsForTargetFilter.length})` : ''}`}
      <i className={`fas fa-caret-${isOpen ? 'up' : 'down'}`} />
      <div className="filter__option-group-toggle--actives">
        {selectionsForTargetFilter.join(', ')}
      </div>
    </button>
  );
};

export default FilterDrawerToggle;
