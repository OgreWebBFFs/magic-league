import React, { useState, useEffect } from "react";
import PickerMenu from "./PickerMenu";
import { ALL_SET_CODES, SETS } from "../sets-data";

const ALL_SETS_OPTION = { code: "ALL", name: "All Valid Sets", symbol: "fas fa-infinity" };

export default ({ onPick }) => {
    const [selectedSet, setSelectedSet] = useState(ALL_SETS_OPTION);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setMenuOpen(false);
        if (selectedSet === ALL_SETS_OPTION) {
            onPick(SETS);
        } else {
            onPick([selectedSet]);
        }
    }, [selectedSet]);

    return (
        <>
            <button type="button" className="set-picker__select" onClick={() => setMenuOpen(!menuOpen)}>
                <div className="set-picker__select_display">
                    <i className={selectedSet.symbol} /> {selectedSet.code || selectedSet.name}
                </div>
                <div className="set-picker__select_divider" />
                <div>
                    <i className="fas fa-angle-down" />
                </div>
            </button>
            {menuOpen && (
                <PickerMenu
                    sets={[ALL_SETS_OPTION, ...SETS]}
                    onPick={setSelectedSet}
                    close={() => setMenuOpen(false)}
                />
            )}
        </>
    );
};
