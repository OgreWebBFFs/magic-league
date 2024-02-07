import { useState, useEffect } from "react";

const rootStyle = document.documentElement.style;

const setThemeCss = (theme) => {
    if (theme === 'white'){
      rootStyle.setProperty('--saturated-fill-lightness', '50%');
    } else if (theme === 'mustard') {
      rootStyle.setProperty('--saturated-fill-lightness', '25%');
    } else { 
        rootStyle.setProperty('--saturated-fill-lightness', '45%');
    }
    rootStyle.setProperty('--color-fill-theme-hue-sat', `var(--${theme}-hue-sat)`);
  }

  const setLightModeCss = (theme) => {
    rootStyle.setProperty('--neutral-lightness', `95%`);
    rootStyle.setProperty('--inverse-lightness', `5%`);
    rootStyle.setProperty('--site-background-lightness', `90%`);
    rootStyle.setProperty('--color-lightness-shift-basis', '-1');
    if(theme !==  "white") rootStyle.setProperty('--saturated-fill-lightness', `75%`);
  }
  const setDarkModeCss = (theme) => {
    rootStyle.setProperty('--neutral-lightness', `5%`);
    rootStyle.setProperty('--inverse-lightness', `95%`);
    rootStyle.setProperty('--site-background-lightness', `10%`);
    rootStyle.setProperty('--color-lightness-shift-basis', '1');
    if(theme !==  "white") rootStyle.setProperty('--saturated-fill-lightness', `25%`);
  }

const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState('mustard');
  const [currentMode, setCurrentMode] = useState('dark');

   useEffect(()=>{
    if (currentMode === "dark") {
        setDarkModeCss(currentTheme)
    } else {
        setLightModeCss(currentTheme)
    }
    setThemeCss(currentTheme)
   }, [currentTheme, currentMode])

  return {
    currentTheme, 
    setCurrentTheme,
    currentMode, 
    setCurrentMode
    };
};

export default useTheme;