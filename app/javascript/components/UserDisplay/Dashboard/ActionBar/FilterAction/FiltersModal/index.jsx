import React, { useState } from 'react';
import Button from '../../../../../Button';
import Modal from '../../../../../Modal';
import filtersConfig from '../filter-configs';
import FilterDrawerToggle from './FilterDrawerToggle';

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
      <div style={{
        width: '80vw', maxWidth: '489px', display: 'flex', flexDirection: 'column',
      }}
      >
        {filtersConfig.map(({ name: facetName, options }) => (
          <div className="filter" key={`${facetName}-filter`}>
            <FilterDrawerToggle
              onClick={() => toggleActiveDrawer(facetName)}
              isOpen={activeDrawer === facetName}
              targetFilter={{ facetName, options }}
              selectedOptions={selectedOptions}
            />
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
        {/* <ul className="filter__option-group">
            <li className="filter__option">
                <input
                    id="wishlisted"
                    type="checkbox"
                    checked={selectedOptions.includes('wishlisted')}
                    onChange={() => toggleSelectedOption('wishlisted')}
                />
                <label htmlFor="wishlisted">Cards on my Wishlist</label>
            </li>
        </ul> */}
        <Button
          className="filter__apply-button"
          onClick={() => {
            onApply(selectedOptions);
            onClose();
          }}
        >
          Apply
          {selectedOptions.length > 0 ? ` (${selectedOptions.length})` : ''}
        </Button>
        <Button
          className="filter__clear-all-button button--ghost"
          onClick={() => {
            setSelectedOptions([]);
            onApply([]);
          }}
        >
          Clear All
        </Button>
      </div>
    </Modal>
  );
};

export default FiltersModal;
