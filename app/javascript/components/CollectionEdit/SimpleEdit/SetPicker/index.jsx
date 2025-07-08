import React, { useState } from "react";
import PickerMenu from "./PickerMenu";

const sets = [
    { code: "EOE", name: "Edge of Eternities", symbol: "ss ss-eoe" },
    { code: "FIN", name: "Final Fantasy", symbol: "ss ss-fin" },
    { code: "TDM", name: "Tarkir: Dragonstorm", symbol: "ss ss-tdm" },
    { code: "DFT", name: "Aetherdrift", symbol: "ss ss-dft" },
    { code: "FND", name: "Foundations", symbol: "ss ss-fnd" },
    { code: "DSK", name: "Duskmourn: House of Horror", symbol: "ss ss-dsk" },
    { code: "BLB", name: "Bloomburrow", symbol: "ss ss-blb" },
];

export default () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <>
            <button type="button" className="set-picker__select" onClick={() => setMenuOpen(!menuOpen)}>
                <div className="set-picker__select_display">
                    <i className="fas fa-infinity" /> Valid Sets
                </div>
                <div className="set-picker__select_divider" />
                <div>
                    <i className="fas fa-angle-down" />
                </div>
            </button>
            {menuOpen && <PickerMenu sets={sets} />}
        </>
    );
};
