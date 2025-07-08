import React, { useCallback, useState } from "react";

export default ({ sets }) => {
    const [filteredSets, setFilteredSets] = useState(sets);

    const filterSets = useCallback(
        (e) => {
            const searchVal = e.target.value;
            const newFilteredSets = sets.filter(
                (set) =>
                    set.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                    set.code.toLowerCase().includes(searchVal.toLowerCase())
            );
            setFilteredSets(newFilteredSets);
        },
        [setFilteredSets, sets]
    );

    return (
        <div className="set-picker__menu">
            <div className="set-picker__menu-search">
                <input className="browser-default" type="text" placeholder="Search for sets" onInput={filterSets} />
                <i className="fas fa-search set-picker__menu-search_icon" />
            </div>
            {filteredSets.map(({ code, name, symbol }) => (
                <button type="button" className="set-picker__menu-option">
                    <i className={`${symbol} set-picker__menu-option_symbol`} />
                    <div className="set-picker__menu-option_name">
                        {name} <span className="set-picker__menu-option_code">{code}</span>
                    </div>
                </button>
            ))}
        </div>
    );
};
