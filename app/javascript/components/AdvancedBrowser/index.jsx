import React, { useState } from 'react';
import Button from '../Button';
import useHashParams, { stringifyHash } from '../../helpers/hooks/use-hash-params';
import CardNameInput from './CardNameInput';
import RulesTextInput from './RulesTextInput';
import { CardTypePicker, SubTypePicker} from './TypePickers';
import ColorsPicker from './ColorsPicker';
import RarityPicker from './RarityPicker';
import SetsPicker from './SetsPicker';
import OwnedFilter from './OnwedFilter';

const Filters = [
  CardNameInput,
  RulesTextInput,
  CardTypePicker,
  SubTypePicker,
  ColorsPicker,
  RarityPicker,
  SetsPicker,
  OwnedFilter,
];

const AdvancedCardBrowser = ({ options }) => {
  const [hashParams] = useHashParams();
  const [appliedFilters, setAppliedFilters] = useState(hashParams);

  return (
    <>
      <h1>Advanced Browser</h1>
      <a href="/browse">
        Go to Basic Browser &gt;
      </a>
      <div>
        {Filters.map(Filter => (
          <div style={{ padding: "1rem", borderBottom: "solid 2px #ddd"}} key={Filter.toString()}>
            <Filter
              hashParams={appliedFilters}
              onUpdate={(newParams) => setAppliedFilters({ ...appliedFilters, ...newParams })}
              options={options}
            />
          </div>
        ))}
        <Button className="advanced-browse__clear-button button--negative" href="/advanced_browse">
          Clear All Selections
        </Button>
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
