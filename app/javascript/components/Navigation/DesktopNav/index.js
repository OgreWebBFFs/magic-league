import React from 'react';

const DesktopNav = ({links}) => {
    const renderDesktopNavLinks = (linksArr) => linksArr.map((link, i)=>{
        if(link.dropdownItems){
           return (
               <li key={`${link.displayName}-${i}`} className="nav__dropdown-wrapper">
                    <button className="nav__dropdown-toggle" 
                        aria-expanded="false"
                        aria-controls={`${link.displayName}-dropdown`}>{link.displayName} ▼</button>
                    <ul className='nav__dropdown'>{renderDesktopNavLinks(link.dropdownItems)}</ul>
                </li>
           )
        } else {
            return (
                <li key={`${link.displayName}-${i}`} className="nav__link-wrapper" key={`${link.displayName}-${i}`}>
                    <a data-turbolinks="false" className="nav__link" href={`/${link.href}`}>{link.displayName}</a> 
                </li>
            )
        }
        }
    )

    return (<>{renderDesktopNavLinks(links)}</>)

}
export default DesktopNav