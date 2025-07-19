import React, { useCallback, useState } from "react";
import { useDebounce } from "react-use";
import xhrRequest from "../../helpers/xhr-request";
import useHashParams from "../../helpers/hooks/use-hash-params";

const MIN_QUERY_LENGTH = 3;
const MINIMUM_QUERY_MSG = `Input at least ${MIN_QUERY_LENGTH} characters to search`;
const NO_RESULTS_MSG = "There were no results found for this search";

const searchCards = async (query, scryfallQuery) =>
    (
        await xhrRequest({
            url: `/cards?name=${query}${scryfallQuery ? `&scryfall="${query}"+${scryfallQuery}` : ""}`,
            options: {
                method: "GET",
            },
        })
    ).data;

const SearchInput = ({ onReset, onResults, onLoading, onError, placeholder, scryfallQuery }) => {
    const [{ query: initialQuery }] = useHashParams();
    const [query, setQuery] = useState((initialQuery || [""])[0]);
    const [error, setError] = useState("");

    const handleErrorMessaging = useCallback(
        (results) => {
            onError();
            if (query.length > 0 && query.length < MIN_QUERY_LENGTH) {
                setError(MINIMUM_QUERY_MSG);
            } else if (query.length > 0 && results.length === 0) {
                setError(NO_RESULTS_MSG);
            } else {
                setError("");
            }
        },
        [setError, query]
    );

    const [, cancel] = useDebounce(
        async () => {
            onLoading();
            let results = [];
            if (query.length === 0) {
                onReset();
            }
            if (query.length >= MIN_QUERY_LENGTH) {
                results = await searchCards(query, scryfallQuery);
                onResults(results, query);
            }
            handleErrorMessaging(results);
        },
        300,
        [query, scryfallQuery]
    );

    return (
        <div style={{ width: "100%", flexGrow: "1" }}>
            <input
                id="card-search"
                type="text"
                placeholder={placeholder || MINIMUM_QUERY_MSG}
                onChange={(e) => {
                    cancel();
                    setQuery(e.target.value);
                }}
                value={query}
            />
            {error ? <div>{error}</div> : null}
        </div>
    );
};

export default SearchInput;
