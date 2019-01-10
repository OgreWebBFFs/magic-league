var Constants = (function() {
  const min_query_length = 3;
  const card_search_placeholder = `Input at least ${min_query_length} characters to search`;
  const card_search_no_results = "There were no results found for this search";

  return {
    min_query_length: min_query_length,
    card_search_placeholder: card_search_placeholder,
    card_search_no_results: card_search_no_results,
  }
})();