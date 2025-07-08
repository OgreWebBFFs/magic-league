import React, { useCallback, useState } from "react";
import { useDebounce } from "react-use";
import xhrRequest from "../../helpers/xhr-request";
import useHashParams from "../../helpers/hooks/use-hash-params";

const MIN_QUERY_LENGTH = 3;
const MINIMUM_QUERY_MSG = `Input at least ${MIN_QUERY_LENGTH} characters to search`;
const NO_RESULTS_MSG = "There were no results found for this search";
const REQUIRED_SET_CODE_MSG = "This query requires a 3 character set code";

const searchCards = async (query) =>
    (
        await xhrRequest({
            url: `/cards?query=${query}`,
            options: {
                method: "GET",
            },
        })
    ).data;

const scrfyallSearchCards = async (query, setCode) =>
    (
        await xhrRequest({
            url: `/scryfall?q=s:${setCode}+${encodeURIComponent(query)}`,
            options: {
                method: "GET",
            },
        })
    ).data;

const SearchInput = ({ onReset, onResults, setCode }) => {
    const [{ query: initialQuery }] = useHashParams();
    const [query, setQuery] = useState((initialQuery || [""])[0]);
    const [error, setError] = useState("");

    const handleErrorMessaging = useCallback(
        (results) => {
            if (setCode !== undefined && setCode.length < 3) {
                setError(REQUIRED_SET_CODE_MSG);
            } else if (query.length > 0 && query.length < MIN_QUERY_LENGTH) {
                setError(MINIMUM_QUERY_MSG);
            } else if (query.length > 0 && results.length === 0) {
                setError(NO_RESULTS_MSG);
            } else {
                setError("");
            }
        },
        [setError, query, setCode]
    );

    useDebounce(
        async () => {
            let results = [];
            if (query.length === 0) {
                onReset();
            }
            if (query.length >= MIN_QUERY_LENGTH && (setCode === undefined || setCode.length === 3)) {
                results = setCode ? await scrfyallSearchCards(query, setCode) : await searchCards(query);
                onResults(results, query);
            }
            handleErrorMessaging(results);
        },
        300,
        [query]
    );

    return (
        <div style={{ width: "100%", flexGrow: "1" }}>
            <input
                id="card-search"
                type="text"
                placeholder={MINIMUM_QUERY_MSG}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
            />
            {error ? <div>{error}</div> : null}
        </div>
    );
};

export default SearchInput;
