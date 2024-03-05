import React from 'react';
import Toggle from '../Toggle';

const OwnedFilter = ({ hashParams: { owned }, onUpdate }) => (
  <>
    <h2>Owned</h2>
    <div className="owned-filter__toggle-wrapper">
      <Toggle
        name='owned-toggle'
        checked={owned?.[0] === 'true'}
        onClick={() => onUpdate(owned?.[0] === 'true' ? { 
          owned: [],
        } : {
          owned: ['true'],
        })}
        options={['Owned', 'All']}
      />
    </div>
    <div className="rules-text__reminder">
      Toggling &quot;Owned&quot; cards will only search through cards that are currently within players&apos; collections. Otherwise,
      toggling &quot;All&quot; will search through all cards that are league elligible whether they are currently owned or not.
    </div>
  </>
)

export default OwnedFilter