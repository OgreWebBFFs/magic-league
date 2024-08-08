import { useState } from "react";

// const rootStyle = document.documentElement.style;

/* const setLightModeCss = (theme) => {
    rootStyle.setProperty("--neutral-lightness", `95%`);
    rootStyle.setProperty("--inverse-lightness", `5%`);
    rootStyle.setProperty("--site-background-lightness", `90`);
    rootStyle.setProperty("--color-lightness-shift-basis", "-1");
    if (theme !== "white") rootStyle.setProperty("--saturated-fill-lightness", `75%`);
};
const setDarkModeCss = (theme) => {
    rootStyle.setProperty("--neutral-lightness", `5%`);
    rootStyle.setProperty("--inverse-lightness", `95%`);
    rootStyle.setProperty("--site-background-lightness", `10`);
    rootStyle.setProperty("--color-lightness-shift-basis", "1");
    if (theme !== "white") rootStyle.setProperty("--saturated-fill-lightness", `25%`);
}; */

const useTheme = () => {
    const [currentTheme, setCurrentTheme] = useState("standard");
    const [currentMode, setCurrentMode] = useState("dark");

    return {
        currentTheme,
        setCurrentTheme,
        currentMode,
        setCurrentMode,
    };
};

export default useTheme;
