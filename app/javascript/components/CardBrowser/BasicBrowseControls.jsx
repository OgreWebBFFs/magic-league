import React from 'react';
import SearchInput from '../SearchInput';
import useHashParams from '../../helpers/hooks/use-hash-params';

const BasicBrowseControls = ({ setCards }) => {
  const [_, updateHashParams] = useHashParams();

  return (
    <>
      <SearchInput
        onResults={(results, query) => {
          setCards(results);
          updateHashParams({ query: [query] });
        }}
        onReset={() => {
          setCards([]);
          updateHashParams({});
        }}
      />
      <a href="/advanced_browse">
        Go to Advanced Browser &gt;
      </a>
    </>
  )
};

export default BasicBrowseControls;