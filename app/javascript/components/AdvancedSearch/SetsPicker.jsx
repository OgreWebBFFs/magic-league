import React from "react";

const SET_DETAILS = {
    spg: {
        text: "Special Guest",
        symbol: "ss ss-spg",
    },
    blb: {
        text: "Bloomburrow",
        symbol: "ss ss-blb",
    },
    blc: {
        text: "Imagine: Courageous Critters",
        symbol: "ss ss-blc",
    },
};

const SetsPicker = ({ hashParams, onUpdate, options }) => (
    <>
        <h2>Sets</h2>
        <fieldset className="checkbox-picker__options sets">
            {options.sets.map(
                (setAbbr) =>
                    setAbbr && (
                        <div key={setAbbr} className="checkbox-picker__option set">
                            <input
                                className="checkbox-picker__option--checkbox"
                                id={setAbbr}
                                name={setAbbr}
                                value={setAbbr}
                                type="checkbox"
                                checked={hashParams.sets?.includes(setAbbr)}
                                onChange={(e) =>
                                    onUpdate({
                                        sets: hashParams.sets?.includes(e.target.value)
                                            ? hashParams.sets.filter((s) => s !== e.target.value)
                                            : [...(hashParams.sets || []), e.target.value],
                                    })
                                }
                            />
                            <label className="checkbox-picker__option--label" htmlFor={setAbbr}>
                                <i className={SET_DETAILS[setAbbr]?.symbol || "ms ms-planeswalker"} />
                                {SET_DETAILS[setAbbr]?.text || setAbbr.toUpperCase()}
                                <span className="set-abbr">({setAbbr})</span>
                            </label>
                        </div>
                    )
            )}
        </fieldset>
    </>
);

export default SetsPicker;
