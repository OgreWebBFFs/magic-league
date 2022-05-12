import React from 'react';
import Button from '../../Button';

const DesktopNav = ({links}) => {
    const renderDesktopNavLinks = (linksArr) => linksArr.map((link, i)=>{
        if(link.dropdownItems){
           return (
               <li key={`${link.displayName}-${i}`} className="nav__dropdown-wrapper">
                    <Button className="nav__dropdown-toggle">{link.displayName} ▼</Button>
                    <ul className='nav__dropdown'>{renderDesktopNavLinks(link.dropdownItems)}</ul>
                </li>
           )
        } else {
            return (
                <li key={`${link.displayName}-${i}`} className="nav__link-wrapper">
                    <a className="nav__link" href={`/${link.href}`}>{link.displayName}</a> 
                </li>
            )
        }
        }
    )

    return (<>{renderDesktopNavLinks(links)}</>)

}
export default DesktopNav