import React, { useState, useId } from 'react';
import { useDebounce } from 'react-use';
import xhrRequest from '../../helpers/xhr-request';

const AllowedRerollsUpdater = ({ rerollCount }) => {
  const [count, setCount] = useState(rerollCount);
  const inputId = useId();

  useDebounce(() => xhrRequest({
    url: '/rerolls/update_all',
    options: {
      method: 'PATCH',
      body: JSON.stringify({ allowed: count }),
    },
  }), 800, [count]);

  return (
    <div className="objectives-manager__reroll-updater">
      <h3 className="objectives-manager__reroll-updater--title">Manage Rerolls:</h3>
      <div>
        <input className="updater" id={inputId} type="number" value={count} onChange={(e) => setCount(e.target.value)} />
        <label htmlFor={inputId}>Allowed Rerolls</label>
      </div>
    </div>
  );
};

export default AllowedRerollsUpdater;
