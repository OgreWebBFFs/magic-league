import React, { useState } from 'react';
import Button from '../../../../Button';
import Modal from '../../../../Modal';
import filtersConfig from './filters-config';

const FiltersModal = ({ onClose, onApply, initialSelections }) => {
  const [activeDrawer, setActiveDrawer] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(initialSelections);

  const toggleActiveDrawer = (selectedDrawer) => setActiveDrawer(activeDrawer === selectedDrawer ? '' : selectedDrawer);
  const toggleSelectedOption = (optionId) => setSelectedOptions(
    selectedOptions.includes(optionId)
      ? selectedOptions.filter((id) => id !== optionId) : selectedOptions.concat(optionId),
  );

  return (
    <Modal onClose={onClose}>
      <div style={{ width: '60vw' }}>
        {filtersConfig.map(({name: facetName, options}) => (
          <div className="filter" key={`${facetName}-filter`}>
            <button
              type="button"
              className="filter__option-group-toggle"
              onClick={() => toggleActiveDrawer(facetName)}
            >
              {facetName.toUpperCase()}
              <i className={`fas fa-caret-${activeDrawer === facetName ? 'up' : 'down'}`} />
            </button>
            {activeDrawer === facetName && (
              <ul className="filter__option-group">
                {options.map(({ id, display }) => (
                  <li className="filter__option" key={`${id}-option`}>
                    <input
                      id={id}
                      type="checkbox"
                      checked={selectedOptions.includes(id)}
                      onChange={() => toggleSelectedOption(id)}
                    />
                    <label htmlFor={id}>{display}</label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <Button
          onClick={() => {
            onApply(selectedOptions);
            onClose();
          }}
        >
          Apply
        </Button>
        <Button
          onClick={() => setSelectedOptions([])}
        >
          Clear All
        </Button>
      </div>
    </Modal>
  );
};

export default FiltersModal;
