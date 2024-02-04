
import React from "react";
import Button from "../Button";
const setTheme = (theme) => {
    document.documentElement.style.setProperty('--color-fill-theme-hue-sat', `var(--${theme}-hue-sat)`)
  }
  
  const setLightMode = () => {
    document.documentElement.style.setProperty('--neutral-lightness', `95%`);
    document.documentElement.style.setProperty('--inverse-lightness', `5%`)
    document.documentElement.style.setProperty('--saturated-fill-lightness', `75%`)
    document.documentElement.style.setProperty('--site-background-lightness', `90%`);
    document.documentElement.style.setProperty('--color-lightness-shift-basis', '-1');
  }
  const setDarkMode = () => {
    document.documentElement.style.setProperty('--neutral-lightness', `5%`);
    document.documentElement.style.setProperty('--inverse-lightness', `95%`);
    document.documentElement.style.setProperty('--saturated-fill-lightness', `25%`);
    document.documentElement.style.setProperty('--site-background-lightness', `10%`);
    document.documentElement.style.setProperty('--color-lightness-shift-basis', '1');
  }
  const clueThemes = ['mustard', 'scarlet', 'peacock', 'plum', 'green']

  const ThemeSwapper = () => (     
    <div style={{display: 'flex', gap: 'var(--spacer-md)', marginBottom: 'var(--spacer-lg)', justifyContent: 'center'}}>
        {
            clueThemes.map(theme => <Button className='button--small' style={{backgroundColor: `hsl(var(--${theme}-hue-sat), var(--saturated-fill-lightness))`}} onClick={()=>{setTheme(theme)}}> {theme}</Button>) 
        }
        <Button  className='button--small' style={{backgroundColor: `black`, color: 'white'}} onClick={()=>{setDarkMode()}}>Dark</Button>
        <Button  className='button--small' style={{backgroundColor: `white`, color: 'black'}} onClick={()=>{setLightMode()}}>Light</Button>
      <Button className="button--small button--secondary"><i className="fas fa-exclamation-circle" style={{color: 'var(--color-fill-negative)'}} /></Button>
      <Button className="button--small button--secondary"><p style={{color: 'var(--color-fill-negative)'}}>negative text</p></Button>
      <Button className="button--small button--secondary"><i className="fas fa-exclamation-circle" style={{color: 'var(--color-fill-positive)'}} /></Button>
      <Button className="button--small button--secondary"><i className="fas fa-exclamation-circle" style={{color: 'var(--color-fill-alert)'}} /></Button>
    </div>
    )

  export default ThemeSwapper