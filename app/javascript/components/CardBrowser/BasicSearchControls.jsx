import React from 'react';
import SearchInput from '../SearchInput';
import useHashParams from '../../helpers/hooks/use-hash-params';
import { cacheCards } from './card-results-cache';

const BasicBrowseControls = ({ setCards }) => {
  const [_, updateHashParams] = useHashParams();

  return (
    <>
      <SearchInput
        onResults={(results, query) => {
          setCards(results);
          updateHashParams({ query: [query] });
          cacheCards(results, { query: [query] });
        }}
        onReset={() => {
          setCards([]);
          updateHashParams({});
        }}
      />
      <a href="/advanced_search">
        Go to Advanced Search &gt;
      </a>
    </>
  )
};

export default BasicBrowseControls;