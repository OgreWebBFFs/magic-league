import React, { useState } from 'react';
import Button from '../../../Button';
import Modal from '../../../Modal';

const FilterAction = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState("");

  const toggleActiveDrawer = (selectedDrawer) => setActiveDrawer(activeDrawer === selectedDrawer ? "" : selectedDrawer);

  return (
    <>
      <Button className="dashboard__filter-action" onClick={() => setShowModal(true)}>
        <i className="fas fa-filter" />
        Filters
      </Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div style={{ width: '60vw' }}>
            <div className="filter">
              <button
                type="button"
                className="filter__option-group-toggle"
                onClick={() => toggleActiveDrawer('Rarity')}>
                Rarity
                <i className={`fas fa-caret-${activeDrawer === 'Rarity' ? 'up' : 'down'}`} />
              </button>
              {activeDrawer === 'Rarity' && (
                <ul className="filter__option-group">
                  <li className="filter__option">
                    <input id="common" type="checkbox" />
                    <label htmlFor="common">Common</label>
                  </li>
                  <li className="filter__option">
                    <input id="uncommon" type="checkbox" />
                    <label htmlFor="uncommon">Uncommon</label>
                  </li>
                  <li className="filter__option">
                    <input id="rare" type="checkbox" />
                    <label htmlFor="rare">Rare</label>
                  </li>
                  <li className="filter__option">
                    <input id="mythic" type="checkbox" />
                    <label htmlFor="mythic">Mythic</label>
                  </li>
                </ul>
              )}
            </div>
            <Button>Apply</Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default FilterAction;
