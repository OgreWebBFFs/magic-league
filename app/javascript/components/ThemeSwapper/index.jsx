
import React from "react";
import Button from "../Button";
import useTheme from "../../helpers/hooks/use-theme";


  const clueThemes = ['white','mustard', 'scarlet', 'peacock', 'plum', 'green']

  const ThemeSwapper = () => {
    const {setCurrentMode, setCurrentTheme} = useTheme();
    return(  
    <div style={{display: 'flex', gap: 'var(--spacer-md)', marginBottom: 'var(--spacer-lg)', justifyContent: 'center'}}>
        {
            clueThemes.map(theme => <Button className='button--small' style={{backgroundColor: `hsl(var(--${theme}-hue-sat), var(--saturated-fill-lightness))`}} onClick={()=>{setCurrentTheme(theme)}}>{theme}</Button>) 
        }
        <Button  className='button--small' style={{backgroundColor: `black`, color: 'white'}} onClick={()=>{setCurrentMode('dark')}}>Dark</Button>
        <Button  className='button--small' style={{backgroundColor: `white`, color: 'black'}} onClick={()=>{setCurrentMode('light')}}>Light</Button>
      <Button className="button--small button--secondary"><i className="fas fa-exclamation-circle" style={{color: 'var(--color-fill-negative)'}} /></Button>
      <Button className="button--small button--secondary"><p style={{color: 'var(--color-fill-negative)'}}>negative text</p></Button>
      <Button className="button--small button--secondary"><i className="fas fa-exclamation-circle" style={{color: 'var(--color-fill-positive)'}} /></Button>
      <Button className="button--small button--secondary"><i className="fas fa-exclamation-circle" style={{color: 'var(--color-fill-alert)'}} /></Button>
    </div>)
    }

  export default ThemeSwapper