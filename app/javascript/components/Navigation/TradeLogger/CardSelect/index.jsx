import React, { useState } from "react";
import { useDebounce } from "react-use";
import Select from "react-select";
import fetchCardOptions from "./fetch-card-options";

const MINIMUM_CHAR_MSG = "Enter 3 Characters to Search";
const LOADING_MSG = "Loading...";
const NO_OPTIONS_MSG = "No Results";

const LabelWithSet = ({ option }) => (
    <>
        {option.label}
        <i style={{ fontSize: "1.75rem", marginLeft: ".5rem" }} className={`ss ss-${option.card.attributes.set}`} />
    </>
);

const CardSelect = ({ onUpdate, userId }) => {
    const [cardOptions, setCardOptions] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [loadingMsg, setLoadingMsg] = useState(MINIMUM_CHAR_MSG);

    const handleInputChange = (value) => {
        setLoadingMsg(value.length < 3 ? MINIMUM_CHAR_MSG : LOADING_MSG);
        setCardOptions([]);
        setInputValue(value);
    };

    const handleSelectChange = (options) => {
        onUpdate(options);
    };

    useDebounce(
        async () => {
            if (inputValue.length > 2) {
                setCardOptions(await fetchCardOptions(inputValue, userId));
                setLoadingMsg(NO_OPTIONS_MSG);
            }
        },
        800,
        [inputValue]
    );

    return (
        <Select
            isMulti
            options={cardOptions}
            onChange={handleSelectChange}
            onInputChange={handleInputChange}
            className="trade-logger__card-select"
            form="trade-form"
            noOptionsMessage={() => loadingMsg}
            // eslint-disable-next-line react/no-unstable-nested-components
            formatOptionLabel={(data) => (data.showSet ? <LabelWithSet option={data} /> : data.label)}
        />
    );
};

export default CardSelect;
