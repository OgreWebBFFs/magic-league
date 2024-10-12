import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import Button from "../../Button";
import DatePicker from "./DatePicker";

const RankingsControls = ({ date, onPlayerSearch }) => {
    const [searchActive, setSearchActive] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (searchActive && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 300);
        } else {
            inputRef.current.value = "";
        }
    }, [searchActive]);

    return (
        <div className="rankings__controls-wrapper">
            <div className={classNames("rankings__controls-wrapper--slider", { slide: searchActive })}>
                <DatePicker date={date} />
                <div className="player-search">
                    <Button
                        className="button--primary"
                        onClick={() => {
                            if (searchActive) {
                                onPlayerSearch("");
                            }
                            setSearchActive(!searchActive);
                        }}
                    >
                        <i className={classNames("fas", { "fa-search": !searchActive, "fa-times": searchActive })} />
                    </Button>
                    <input ref={inputRef} type="text" onChange={(e) => onPlayerSearch(e.target.value.trim())} />
                </div>
            </div>
        </div>
    );
};

export default RankingsControls;
