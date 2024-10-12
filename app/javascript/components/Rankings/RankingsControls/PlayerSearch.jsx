import React, { useState, useRef } from "react";
import classNames from "classnames";
import Button from "../../Button";

const PlayerSearch = ({ onChange, onClick }) => {
    const [inputActive, setInputActive] = useState(false);
    const inputRef = useRef(null);

    return (
        <div style={{ marginLeft: "auto", display: "flex", gap: "0.25rem" }}>
            {/* <input ref={inputRef} type="text" onChange={(e) => onChange(e.target.value)} /> */}
            <Button
                className="button--primary"
                onClick={() => {
                    setInputActive(!inputActive);
                    onClick();
                    // if (inputRef.current) {
                    //     inputRef.current.focus();
                    // }
                }}
            >
                <i className={classNames("fas", { "fa-search": !inputActive, "fa-times": inputActive })} />
            </Button>
        </div>
    );
};

export default PlayerSearch;
