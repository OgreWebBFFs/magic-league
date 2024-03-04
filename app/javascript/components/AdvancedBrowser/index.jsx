import React, { useState } from 'react';
import Button from '../Button';
import useHashParams, { stringifyHash } from '../../helpers/hooks/use-hash-params';
import CardNameInput from './CardNameInput';

const Filters = [
  CardNameInput
];

const AdvancedCardBrowser = () => {
  const [hashParams] = useHashParams();
  const [appliedFilters, setAppliedFilters] = useState(hashParams);

  return (
    <>
      <h1>Advanced Browser</h1>
      <div style={{height: "1000px"}}>
        {Filters.map(Filter => (
          <Filter
            hashParams={appliedFilters}
            onUpdate={(newParams) => setAppliedFilters({ ...appliedFilters, ...newParams })}
          />
        ))}
      </div>
      <div
        style={{
          position: "sticky",
          bottom: 0,
          padding: "0.5rem",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px -25px 20px -20px rgba(0,0,0,0.45)"
        }}
      >
        <Button
          href={`/browse#${stringifyHash(appliedFilters)}&advanced=true`}
        >
          Search with these options
        </Button>
      </div>
    </>
  );
}

export default AdvancedCardBrowser;
