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

const AdvancedCardSearch = ({ options }) => {
  const [hashParams] = useHashParams();
  const [appliedFilters, setAppliedFilters] = useState(hashParams);

  return (
    <>
      <h1>Advanced Search</h1>
      <a href="/search">
        Go to Basic Search &gt;
      </a>
      <div>
        {Filters.map(Filter => (
          <div className="advanced-search__filter-wrapper" key={Filter.toString()}>
            <Filter
              hashParams={appliedFilters}
              onUpdate={(newParams) => setAppliedFilters({ ...appliedFilters, ...newParams })}
              options={options}
            />
          </div>
        ))}
       
      </div>
      <div className="advanced-search__action-bar">
        <Button className="advanced-search__action-button button--secondary" href="/advanced_browse">
          Reset
        </Button>
        <Button
          className="advanced-search__action-button"
          href={`/search#${stringifyHash(appliedFilters)}&advanced=true`}
        >
          Search
        </Button>
      </div>
    </>
  );
}

export default AdvancedCardSearch;
