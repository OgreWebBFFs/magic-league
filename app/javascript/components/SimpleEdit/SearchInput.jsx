import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import xhrRequest from '../../helpers/xhr-request';

const MIN_QUERY_LENGTH = 3
const CARD_SEARCH_PLACEHOLDER = `Input at least ${MIN_QUERY_LENGTH} characters to search`;

const searchCards = async (query) => {
  const res = await xhrRequest({
    url: `/cards?query=${query}`,
    options: {
      method: 'GET'
    }
  });
  return res.ok() ? await res.json() : console.log(res);
}

const SearchInput = (props) => {
  const handleChange = async ({ target }) => {
    console.log(await searchCards(target.value));
  }
  return (
    <DebounceInput
      id="card-search"
      type="text"
      placeholder={CARD_SEARCH_PLACEHOLDER} 
      onChange={handleChange}
      minLength={MIN_QUERY_LENGTH}
      debounceTimeout={300}
    />
  )
};

export default SearchInput;