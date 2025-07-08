import React, { useCallback, useState, useRef, useEffect } from "react";

export default ({ sets, onPick, close }) => {
    const [filteredSets, setFilteredSets] = useState(sets);
    const searchRef = useRef();

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

    useEffect(() => {
        searchRef.current?.focus();
    }, []);

    return (
        <div className="set-picker__menu" onBlur={close}>
            <div className="set-picker__menu-search">
                <input
                    ref={searchRef}
                    className="browser-default"
                    type="text"
                    placeholder="Search for sets"
                    onInput={filterSets}
                />
                <i className="fas fa-search set-picker__menu-search_icon" />
            </div>
            {filteredSets.map((set) => (
                <button type="button" className="set-picker__menu-option" onClick={() => onPick(set)}>
                    <i className={`${set.symbol} set-picker__menu-option_symbol`} />
                    <div className="set-picker__menu-option_name">
                        {set.name}
                        <span className="set-picker__menu-option_code">{set.code}</span>
                    </div>
                </button>
            ))}
        </div>
    );
};
